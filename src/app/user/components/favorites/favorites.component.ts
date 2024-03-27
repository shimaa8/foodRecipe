import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  tableData: any;
  tableRecipe: any[] = [];
  imagePath: string = 'https://upskilling-egypt.com/';

  constructor(private _UserService: UserService, private _ToastrService: ToastrService) { }

  ngOnInit() {
    this.getMyFavs()
  }

  getMyFavs() {
    this._UserService.getFavs().subscribe({
      next: (res) => {
        console.log(res);
        this.tableRecipe = res.data
      }
    })
  }
  removeItem(id: number) {
    this._UserService.onRemoveFromFav(id).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => {

      }, complete: () => {
        this._ToastrService.success('Deleted  Successfuly');
        this.getMyFavs()

      }
    })
  }

}
