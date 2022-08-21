import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthHttpService} from "../../services/auth-http.service";
import {Router} from "@angular/router";
import {RoutesEnum} from "@enums";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoadingSubmitBtn= false;
  subscriptions = new Subscription();

  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    remember: new FormControl(true)
  })

  constructor(
    private authService: AuthHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  submitForm(): void {
    this.isLoadingSubmitBtn = true;
    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.subscriptions.add(
      this.authService.signIn(loginData).subscribe(
        {
          next: loginRes => {
            this.isLoadingSubmitBtn = false;
            if(loginRes.success){
              this.router.navigate([RoutesEnum.DASHBOARD]);
            }
          },
          error: err => {
            this.isLoadingSubmitBtn = false;
          }
        }
      )
    )
  }

}
