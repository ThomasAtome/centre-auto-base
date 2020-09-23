import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-sign-base-view',
  templateUrl: './sign-base-view.component.html',
  styleUrls: ['./sign-base-view.component.css']
})
export class SignBaseViewComponent implements OnInit {

  title: string;
  type: string;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.getPath();
  }

  /**
   * Quickly retrieve the path for add the correct form
   */
  getPath() {
    const path = this.location.prepareExternalUrl(this.location.path()).slice(1);
    if (path === '/signup') {
      this.type = 'signup';
      this.title = 'INSCRIPTION';
    } else if (path === '/signin') {
      this.type = 'signin';
      this.title = 'CONNEXION';
    }
  }

}
