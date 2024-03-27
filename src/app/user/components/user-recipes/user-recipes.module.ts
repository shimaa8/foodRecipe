import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRecipesComponent } from './user-recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeDetailesComponent } from './recipe-detailes/recipe-detailes.component';

const routes: Routes = [
  { path: '', component: UserRecipesComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [UserRecipesComponent, RecipeDetailesComponent]
})
export class UserRecipesModule { }
