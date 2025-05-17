import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule, FormBuilder, FormGroup, FormControlStatus,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Photo, Product} from "../../models/product";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormGroup | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-product-add-form',
  templateUrl: './product-add-form.component.html',
  styleUrls: ['./product-add-form.component.css']
})
export class ProductAddFormComponent implements OnInit {
  productFormControl: FormGroup = new FormGroup({});
  imagesToSave: Photo[] = [];

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.productFormControl = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required, Validators.min(0)],

    });
  }

  sanitizeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9.]/g, ''); // Elimină caracterele invalide
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          let imageBase64 = reader.result as string; // Salvăm în Base64
          let findExtension = file.name.split('.')[1];
          let photo: Photo = {
            photoName: file.name,
            content: imageBase64,
            extension: findExtension,
            isMainPhoto: files.length === 1,
          };
          this.imagesToSave.push(photo);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.productFormControl.invalid) {
      return;
    }
    this.imagesToSave = this.imagesToSave.map(photo => {
      return {...photo, content: photo.content?.split(';base64,')[1]}
    } )
    let product: Product = {
      name: this.productFormControl.value.name,
      description: this.productFormControl.value.description,
      price: this.productFormControl.value.price,
      mainPhoto: this.imagesToSave.find(photo => photo.isMainPhoto),
      photos: this.imagesToSave

    };
    console.log(product);
    this.productService.addProduct(product).subscribe(response =>{

      if (response.status === 200) {
        alert("Product added successfully.");
        this.router.navigate(['/products']);
      }
    })
  }

  removePhotoFromList(index:number){
    this.imagesToSave.splice(index,1);
  }

  setMainPhoto(photo: Photo) {
    this.imagesToSave.forEach(photo => photo.isMainPhoto = false);

    photo.isMainPhoto = true;
  }

  matcher = new MyErrorStateMatcher();
}
