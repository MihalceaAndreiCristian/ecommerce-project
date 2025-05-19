import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../../models/product";
import {MatDialog} from "@angular/material/dialog";
import {ModalProductComponent} from "../modal-product/modal-product.component";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] | null = [];

  constructor(private productService: ProductService, private dialog: MatDialog) {}


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.body;
    });
  }

  openModal(productId: number | undefined): void {
    if (productId === undefined) {
      return;
    }
    this.productService.getProductById(productId)
      .subscribe(product => {
        this.dialog.open(ModalProductComponent, {
          id: 'viewProduct',
          data: product.body,
        });
      });
  }

}
