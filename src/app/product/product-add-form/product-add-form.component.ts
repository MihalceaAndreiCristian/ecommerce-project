import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Photo, Product} from "../../models/product";
import {addPhotosToArray, formatPrice, validateNumberInput} from "../../util/utils";

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
      price: [0.0, [Validators.required, Validators.min(0)]]


    });
  }

  onFileSelected(event: Event) {
    addPhotosToArray(event,this.imagesToSave)
  }

  onSubmit() {
    if (this.productFormControl.valid) {
      this.imagesToSave = this.imagesToSave.map(photo => {
        return {...photo, content: photo.content?.split(';base64,')[1]};
      });

      const mainPhoto = this.imagesToSave.find(photo => photo.isMainPhoto);
      const otherPhotos = this.imagesToSave.filter(photo => !photo.isMainPhoto);

      this.imagesToSave = mainPhoto ? [mainPhoto, ...otherPhotos] : this.imagesToSave;

      let product: Product = {
        name: this.productFormControl.value.name,
        description: this.productFormControl.value.description,
        price: this.productFormControl.value.price,
        mainPhoto: mainPhoto,
        photos: this.imagesToSave
      };


      this.productService.addProduct(product).subscribe(response => {
        if (response.status === 200) {
          alert("Product added successfully.");
          this.router.navigate(['/products']);
        }
      });
    }
  }

  removePhotoFromList(index:number){
    this.imagesToSave.splice(index,1);
  }

  setMainPhoto(photo: Photo) {
    this.imagesToSave.forEach(photo => photo.isMainPhoto = false);
    photo.isMainPhoto = true;
  }

  matcher = new MyErrorStateMatcher();
  protected readonly validateNumberInput = validateNumberInput;
  protected readonly formatPrice = formatPrice;
}
