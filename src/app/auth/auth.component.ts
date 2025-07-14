import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserDTO } from './shared/dtos/UserDTO';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    inputEmail: new FormControl('', Validators.required),
    inputPassword: new FormControl('', Validators.required),
  });

  user?: UserDTO;
  message?: string;
  notSuccess = false;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }


  ngOnInit(): void {
  }

  onSubmit() {
    this.user = new UserDTO();

    this.user.email = this.authForm.get('inputEmail').value;
    this.user.password = this.authForm.get('inputPassword').value;

    this._authService.authentication(this.user)
      .subscribe(res => {
        this._router.navigate(['/layout/home']);
        sessionStorage.setItem("user", res.name);
        this.notSuccess = false;
      }, error => {
        this.message = 'Email ou senha inválidos!'
        this.notSuccess = true;
        this.authForm.reset();
        console.log(error);
      });
  }

  get registerFormControl() {
    return this.authForm.controls;
  }

}
