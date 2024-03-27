import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isClosed: boolean = false;

  handleFlag(flag: boolean) {
    // Do something with the flag value received from the child component
    this.isClosed = flag;
    console.log('Flag received:', flag);
  }
}
