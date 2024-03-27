import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
  RecipesComponent,
  AddEditRecipeComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    NgxDropzoneModule
  ]
})
export class RecipeModule { }
