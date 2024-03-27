import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminGuard } from '../Guards/admin.guard';
import { UserGuard } from '../Guards/user.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
      { path: 'user', canActivate: [UserGuard], loadChildren: () => import('../user/user.module').then(m => m.UserModule) },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
