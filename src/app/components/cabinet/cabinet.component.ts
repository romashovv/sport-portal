import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent {
  @Input() user: User | undefined;
}
