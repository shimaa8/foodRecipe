import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/register/register.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxDropzoneModule
    , SharedModule]
})
export class AuthModule { }
