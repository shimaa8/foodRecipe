import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/Category.service';
import { ICategory } from '../../models/category';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  searchKey: string = '';
  tableData: ICategory[] = [];
  tableResponse: any;
  // length = 50;
  pageSize = 5;
  pageNumber = 1;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | any;
  constructor(private _CategoryService: CategoryService, private dialog: MatDialog, private _ToastrService: ToastrService) {

  }
  ngOnInit(): void {
    this.getCategories()
  }

  test() {
    console.log('hello');

  }
  getCategories() {
    this._CategoryService.getAllCategories(this.pageSize, this.pageNumber, this.searchKey).subscribe({
      next: (res) => {

        this.tableResponse = res;
        this.tableData = res.data;
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = this.tableResponse.pageNumber;
    this.getCategories()

  }

  openAddCategoryDialog() {

    const dialogRef = this.dialog.open(AddEditCategoryComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.addCategory(result)
      }
      ;
    });

  }
  openEditCategoryDialog(categoryData: any) {
    console.log(categoryData);


    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: categoryData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.editCategory(result)
      }
      ;
    });

  }

  openDeleteCategoryDialog(categoryData: any) {
    console.log(categoryData);


    const dialogRef = this.dialog.open(DeleteComponent, {
      data: categoryData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.deleteCategory(result)
      }
      ;
    });

  }
  addCategory(categoryName: string) {
    this._CategoryService.onAddCategory(categoryName).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => {

      }, complete: () => {
        this._ToastrService.success('Added Successfuly')
        this.getCategories();
      }
    })
  }
  editCategory(categoryItem: any) {
    this._CategoryService.onEditCategory(categoryItem).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => {

      }, complete: () => {
        this._ToastrService.success('edit Successfuly')

        this.getCategories();
      }
    })
  }
  deleteCategory(categoryId: any) {
    this._CategoryService.ondeleteCategory(categoryId).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => {

      }, complete: () => {
        this._ToastrService.info('Deleted Successfuly')

        this.getCategories();
      }
    })
  }
}
