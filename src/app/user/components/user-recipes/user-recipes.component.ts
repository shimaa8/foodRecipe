import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/admin/models/category';
import { CategoryService } from 'src/app/admin/services/Category.service';
import { HelperService } from 'src/app/admin/services/helper.service';
import { RecipesService } from 'src/app/admin/services/recipes.service';
import { RecipeDetailesComponent } from './recipe-detailes/recipe-detailes.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit {

  searchKey: string = '';
  tableData: any[] = [];
  tags: any[] = [];
  tagId: number = 0;
  categorieId: number = 0;
  categories: ICategory[] = [];
  tableResponse: any;
  imagePath: string = 'https://upskilling-egypt.com/';
  dummyImage: string = '../../../../assets/images/Recipes-Title.png'
  // length = 50;
  pageSize = 5;
  pageNumber = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | any;
  constructor(private _UserService: UserService, private _CategoryService: CategoryService, private _HelperService: HelperService, private _RecipesService: RecipesService, private dialog: MatDialog, private _ToastrService: ToastrService) {

  }
  ngOnInit(): void {
    this.getAllTags();
    this.getAllCategories();
    this.getRecipes();
  }

  test(x: string) {
    console.log(x);

  }
  getRecipes() {
    let paramsApi = {}
    if (this.tagId > 0) {
      paramsApi = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        name: this.searchKey,
        tagId: this.tagId

      }
    } else if (this.categorieId > 0) {
      paramsApi = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        name: this.searchKey,
        categoryId: this.categorieId

      }
    } else {
      paramsApi = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        name: this.searchKey,

      }
    }
    this._RecipesService.getAllRecipes(paramsApi).subscribe({
      next: (res) => {

        this.tableResponse = res;
        this.tableData = res.data;
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = this.tableResponse.pageNumber;
    this.getRecipes()

  }

  // openAddCategoryDialog() {

  //   const dialogRef = this.dialog.open(AddEditCategoryComponent, {

  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //     if (result) {
  //       this.addCategory(result)
  //     }
  //     ;
  //   });

  // }
  // openEditCategoryDialog(categoryData: any) {
  //   console.log(categoryData);


  //   const dialogRef = this.dialog.open(AddEditCategoryComponent, {
  //     data: categoryData
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //     if (result) {
  //       this.editCategory(result)
  //     }
  //     ;
  //   });

  // }

  // openDeleteCategoryDialog(categoryData: any) {
  //   console.log(categoryData);


  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     data: categoryData
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //     if (result) {
  //       this.deleteCategory(result)
  //     }
  //     ;
  //   });

  // }
  // addCategory(categoryName: string) {
  //   this._RecipesService.onAddCategory(categoryName).subscribe({
  //     next: (res) => {
  //       console.log(res);

  //     }, error: () => {

  //     }, complete: () => {
  //       this._ToastrService.success('Added Successfuly')
  //       this.getRecipes();
  //     }
  //   })
  // }
  // editCategory(categoryItem: any) {
  //   this._RecipesService.onEditCategory(categoryItem).subscribe({
  //     next: (res) => {
  //       console.log(res);

  //     }, error: () => {

  //     }, complete: () => {
  //       this._ToastrService.success('edit Successfuly')

  //       this.getRecipes();
  //     }
  //   })
  // }
  // deleteCategory(categoryId: any) {
  //   this._RecipesService.ondeleteCategory(categoryId).subscribe({
  //     next: (res) => {
  //       console.log(res);

  //     }, error: () => {

  //     }, complete: () => {
  //       this._ToastrService.info('Deleted Successfuly')

  //       this.getRecipes();
  //     }
  //   })
  // }


  getAllCategories() {
    this._CategoryService.getAllCategories(1000, 1, '').subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data;
      }
    })
  }
  getAllTags() {
    this._HelperService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.tags = res;
      }
    })
  }
  openRecipeDetailes(item: any) {
    const dialogRef = this.dialog.open(RecipeDetailesComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.addToFav(result)
        
      }
      ;
    });
  }

  addToFav(id: number) {
    this._UserService.onAddToFav(id).subscribe({
      next: (res) => {
        console.log(res);

      }, error: (err: any) => {
        console.log(err);

      }, complete: () => {
        this._ToastrService.success('Added To Fav Successfuly')

      }
    })
  }
}
