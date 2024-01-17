import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  get user() {
    return this.storageService.getUser()
  }

  get isLogin() {
    return this.storageService.isLogin
  }
  constructor(
    public storageService: StorageService,
  ) {
  }
}
