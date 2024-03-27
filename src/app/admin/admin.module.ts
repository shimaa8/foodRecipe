import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';


@NgModule({
  declarations: [
    AdminComponent,
    CategoriesComponent,
    AddEditCategoryComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
