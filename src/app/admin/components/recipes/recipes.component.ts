import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ICategory } from '../../models/category';
import { CategoryService } from '../../services/Category.service';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { RecipesService } from '../../services/recipes.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
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
  constructor(private _CategoryService: CategoryService, private _HelperService: HelperService, private _RecipesService: RecipesService, private dialog: MatDialog, private _ToastrService: ToastrService) {

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
}
