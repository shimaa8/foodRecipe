import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
interface Menu {
  text: string;
  link: string;
  icon: string;
  isActive: boolean
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private _AuthService: AuthService) { }

  isClosed: boolean = false;
  @Output() flagEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  sendFlag() {
    // const flag = true; // Replace with your flag variable
    this.isClosed = !this.isClosed
    this.flagEmitter.emit(this.isClosed);
  }
  isAdmin(): boolean {
    return this._AuthService.role == 'SuperAdmin' ? true : false;
  }
  isUser(): boolean {
    return this._AuthService.role == 'SystemUser' ? true : false;
  }
  Menu: Menu[] = [
    {
      text: 'home',
      link: '/dashboard/home',
      icon: 'fa-solid fa-house',
      isActive: this.isAdmin() || this.isUser()
    },
    {
      text: 'users',
      link: '/dashboard/admin/users',
      icon: 'fa-solid fa-house',
      isActive: this.isAdmin()
    },
    {
      text: 'Recipes',
      link: '/dashboard/admin/recipes',
      icon: 'fa-solid fa-house',
      isActive: this.isAdmin()
    }
    ,
    {
      text: 'Categories',
      link: '/dashboard/admin/category',
      icon: 'fa-solid fa-house',
      isActive: this.isAdmin()
    }
    ,
    {
      text: 'User Recipes',
      link: '/dashboard/user/recipes',
      icon: 'fa-solid fa-house',
      isActive: this.isUser()
    },
    {
      text: 'Favorites',
      link: '/dashboard/user/favorites',
      icon: 'fa-solid fa-house',
      isActive: this.isUser()
    }
  ]


}
