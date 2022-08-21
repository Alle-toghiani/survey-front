import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {Subscription} from "rxjs";

import {RoutesEnum} from "@enums";
import {AuthHttpService} from "../../services/auth-http.service";
import {SignupReqModel} from "../../models/signup-req.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoadingSubmitBtn= false;
  subscriptions = new Subscription();

  signupForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required, SignupComponent.matchValues('password')]),
  })

  constructor(
    private authService: AuthHttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  submitForm(): void {
    this.isLoadingSubmitBtn = true;
    const signupData: SignupReqModel = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    }
    this.subscriptions.add(
      this.authService.signup(signupData).subscribe(
        {
          next: signupRes => {
            this.isLoadingSubmitBtn = false;
            if (signupRes.success){
              this.router.navigate(['/'+RoutesEnum.AUTH, RoutesEnum.LOGIN])
            }
          },
          error: err => {
            this.isLoadingSubmitBtn = false;
          }
        }
      )
    )
  }


  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }
}
