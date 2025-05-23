import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import {NavbarModule} from "../navbar/navbar.module";
import {MatCardModule} from "@angular/material/card";
import { ProductAddFormComponent } from './product-add-form/product-add-form.component';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ModalProductComponent } from './modal-product/modal-product.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddFormComponent,
    ModalProductComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatBottomSheetModule,
    FlexModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    NgOptimizedImage
  ]
})
export class ProductModule { }
