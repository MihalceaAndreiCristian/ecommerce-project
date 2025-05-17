import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {NavbarComponent} from "./navbar.component";
import {CommonModule} from "@angular/common";
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class NavbarModule { }

