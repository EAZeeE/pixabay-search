import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class UserAvatarComponent implements OnInit {

  @Input() src: string = '';
  @Input() user: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
