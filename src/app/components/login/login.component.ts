import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public isLoginError = false;
  public loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              public storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [''],
      password: ['', Validators.required]
    })
  }
  login(){
    this.authService.login()
      .subscribe(res=> {
        const user = res.find((user: User) => user.login === this.loginForm.value.login)
        if(user && user.login === this.loginForm.value.login && user.password === this.loginForm.value.password){
          // this.store.dispatch( addUser({user: res[0]}));
          this.loginForm.reset();
          this.storageService.setUser(user)
          this.router.navigate(["dashboard"])
        }else{
          this.isLoginError = true
        }
      },()=>{
        this.isLoginError = true
      })
  }
}
