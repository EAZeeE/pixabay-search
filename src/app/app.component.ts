import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {GreetingDialogComponent} from "./greeting-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pixabay-search-ui';

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.openDialog('500ms', '500ms')
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(GreetingDialogComponent, {
      width: '5fr',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
