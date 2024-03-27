import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide: boolean = true;
  isLoading: boolean = false;
  constructor(private _Router: Router, private _AuthService: AuthService, private toastr: ToastrService) {

  }
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  });

  onSubmit(data: FormGroup) {
    this.isLoading = true;
    console.log(data.value);
    this._AuthService.onLogin(data.value).subscribe({
      next: (res) => {
        console.log(res);

        localStorage.setItem('userToken', res.token)
        this._AuthService.getProfile();

      }, error: (err) => {
        this.isLoading = false;
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'Error');


      }, complete: () => {
        this.isLoading = false;

        this.toastr.success('LoggedIn Successfuly', 'Success');
        this._Router.navigate(['/dashboard'])
      }
    })

  }

}
