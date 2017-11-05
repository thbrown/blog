import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'share-buttons',
  templateUrl: './shareButtons.component.html',
  styleUrls: ['./shareButtons.component.scss'],
})
export class ShareButtonsComponent implements OnInit {

  static readonly BASE_URL: string = "https://perpetualwips.com";
  url: string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    // router.url is populated async.
    // See https://github.com/angular/angular/issues/12649
    setTimeout(() => {
      this.url = ShareButtonsComponent.BASE_URL + this.router.url;
    });
  }  
}
