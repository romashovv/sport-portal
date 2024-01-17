import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: LocalStorageService) {}

  public get isLogin(): boolean { return this.storage.retrieve('user')}

  public setUser(user: User) {
    this.storage.store('user', user)
  }

  public deleteUser() {
    this.storage.clear('user')
  }

  public getUser(): User {
    return this.storage.retrieve('user')
  }
}
