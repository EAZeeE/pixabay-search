import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-greeting-dialog',
  template: `
    <h1 mat-dialog-title>Welcome MLA</h1>
    <div mat-dialog-content>
      <p>Thanks again for this wonderful opportunity, I hope you enjoy this demo!</p>

      <div class="mb-4">

        <ol role="list">
          <span>Features: </span>
          <li>- Automatic debounced searching</li>
          <li>- Optional proxy for Firefox support</li>
          <li>- Pagination</li>
          <li>- Transitions</li>
        </ol>

      </div>


      <p>Please let me know if you have any questions.</p>

      <p>Best regards, <br> Edwin</p>

    </div>


    <div mat-dialog-actions>
      <button class="float-end" mat-button mat-dialog-close>Okay</button>
    </div>
  `,
  styles: [
  ]
})
export class GreetingDialogComponent {

  constructor(public dialogRef: MatDialogRef<GreetingDialogComponent>) { }

}
