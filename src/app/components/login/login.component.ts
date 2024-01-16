import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public isLoginError: boolean = false;
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
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password)
      .subscribe(res=> {
        if(res[0].login === this.loginForm.value.login && res[0].password === this.loginForm.value.password){
          this.loginForm.reset();
          this.storageService.setUser(res[0])
          this.router.navigate(["dashboard"])
        }else{
          this.isLoginError = true
        }
      },err=>{
        this.isLoginError = true
      })
  }
}
