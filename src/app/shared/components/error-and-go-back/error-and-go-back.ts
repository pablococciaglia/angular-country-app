import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'error-and-go-back',
  imports: [],
  templateUrl: './error-and-go-back.html',
})
export class ErrorAndGoBack {
  location = inject(Location);
  goBack() {
    this.location.back();
  }
}
