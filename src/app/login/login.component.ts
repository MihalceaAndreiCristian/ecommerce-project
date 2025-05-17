import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Login} from "../models/login";
import {AUTHORIZATION} from "../util/constants";
import {MyErrorStateMatcher} from "../product/product-add-form/product-add-form.component";
import {setAuthToken} from "../util/utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  setTokenInSessionStorage(token: string) {
    setAuthToken(token)
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginModel: Login = this.loginForm.value;
      this.loginService.doLogin(loginModel)
        .subscribe(res => {
          if (res.status === 200) {
            const token = res.headers.get('Authorization');
            if (token) {
              this.setTokenInSessionStorage(token);
              this.router.navigate(['/products']);
            }
          }
        });

    }

  }
}
