import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from './delete/delete.component';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule
  ],
  exports: [
    MatDialogModule,
    SidebarComponent,
    NavbarComponent,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    FormsModule,
    DeleteComponent,
    MatSelectModule, ReactiveFormsModule
  ]
})
export class SharedModule { }
