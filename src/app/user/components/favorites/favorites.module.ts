import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: FavoritesComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FavoritesComponent]
})
export class FavoritesModule { }
