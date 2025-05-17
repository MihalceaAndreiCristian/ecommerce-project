import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { removeFromSessionStorage} from "../util/utils";
import {AUTHORIZATION} from "../util/constants";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName: string='testData';
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back(); // Navighează la pagina anterioară
  }

  isAdmin(){
    return true;
  }

  onLogout(): void {
    removeFromSessionStorage(AUTHORIZATION);
    window.location.reload();

  }

  search(event: any): void {

  }
}
