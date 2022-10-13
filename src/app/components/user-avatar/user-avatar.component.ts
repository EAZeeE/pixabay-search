import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  animations: [
    trigger('user', [
      transition(':enter', [
        style({
          transform: 'translateX(-500px)',
          opacity: 0
        }),
        animate('400ms cubic-bezier(.63,.79,.37,1.26)')
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class UserAvatarComponent implements OnInit {

  @Input() src: string = ''
  @Input() user: string = ''

  shown = false;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.shown = true
  }

  hide() {
    this.shown = false
  }
}
