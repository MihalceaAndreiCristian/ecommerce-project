import {ChangeDetectorRef, Component, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Photo, Product} from "../../models/product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {ModalService} from "./modal.service";
import {addPhotosToArray} from "../../util/utils";

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public productInjected: Product,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ModalProductComponent>,
              private productService: ProductService,
              private modalService: ModalService) {
    this.updateModalProductForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: [''],
      mainPhoto: [{}],
      photos: [[]]
    });
    this.modalService.modalClose$.subscribe(() => this.closeAndReset(false));

  }


  product: Product = {};
  updateModalProductForm: FormGroup = new FormGroup({});
  imagesAdded:Photo[]= [];

  ngOnInit(): void {
    this.product = this.productInjected;
    this.updateModalProductForm.patchValue({
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      id: this.product.id,
      mainPhoto: this.product.mainPhoto,
      photos: this.product.photos,
    });
  }

  displayPhotos(): Photo[] {
    if (this.imagesAdded.length > 0) {
      return this.product.photos as Photo[];
    }
    return [...this.imagesAdded, ...this.product.photos as Photo[]];
  }

  updateProduct() {
    if (this.updateModalProductForm.valid && this.product !== this.updateModalProductForm.value) {
      const updatedFields: Partial<Product> = {id: this.product.id};

      Object.keys(this.updateModalProductForm.controls).forEach(key => {
        const initialValue = this.productInjected[key as keyof Product];
        const updatedValue = this.updateModalProductForm.get(key)?.value;

        if (initialValue !== updatedValue) {
          updatedFields[key as keyof Product] = updatedValue;
        }
      });

      this.productService.updateProduct(updatedFields).subscribe(response => {
        if (response.status === 200) {
          let productUpdated: Product = response.body as Product;
          this.updateModalProductForm.patchValue(productUpdated);
          this.closeAndReset(true);
        }
      });
    }
  }


  closeAndReset(needReload:boolean) {
    this.updateModalProductForm.reset();
    this.dialogRef.close();
    if (needReload) {
      window.document.location.reload();
    }
  }

  onFileSelected(event: Event) {
    addPhotosToArray(event, this.imagesAdded);

  }


}
