import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./product/product-list/product-list.component";
import {LoginComponent} from "./login/login.component";
import {ProductAddFormComponent} from "./product/product-add-form/product-add-form.component";
import {authGuard} from "./auth.guard";

const routes: Routes = [
  {path:'',redirectTo:'/products',pathMatch:'full'},
  {path:'products',component: ProductListComponent},
  {path:'login',component: LoginComponent},
  {path:'product/add',component: ProductAddFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
