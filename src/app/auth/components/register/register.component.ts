import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { VerifyAccountComponent } from '../verify-account/verify-account.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  imgSrc: any;

  hide: boolean = true;
  isLoading: boolean = false;
  constructor(private _Router: Router, public dialog: MatDialog, private _AuthService: AuthService, private toastr: ToastrService) {

  }
  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
  });

  onSubmit(data: FormGroup) {
    this.isLoading = true;


    let myData = new FormData();


    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('country', data.value.country);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.imgSrc);


    // console.log(data.value);
    this._AuthService.onRegister(myData).subscribe({
      next: (res) => {
        console.log(res);

      }, error: (err) => {
        this.isLoading = false;
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'Error');


      }, complete: () => {
        this.isLoading = false;

        this.toastr.success('Register Successfuly', 'Success');
        this.openDialog()

      }
    })

  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];

    console.log(this.imgSrc);

    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }



  openDialog() {
    const dialogRef = this.dialog.open(VerifyAccountComponent, {
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.onVerifyAccount(result)
      }

    });
  }

  onVerifyAccount(data: any) {
    this._AuthService.onVerify(data).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => {

      }, complete: () => {
        this.toastr.success('Account Activetied Successfuly', 'Success');
        this._Router.navigate(['/auth/login'])
      }
    })
  }
}
