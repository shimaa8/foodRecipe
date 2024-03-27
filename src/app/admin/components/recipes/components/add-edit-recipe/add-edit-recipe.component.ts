import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/admin/models/category';
import { CategoryService } from 'src/app/admin/services/Category.service';
import { HelperService } from 'src/app/admin/services/helper.service';
import { RecipesService } from 'src/app/admin/services/recipes.service';

interface IRecipe {
  name: string,
  description: string,
  price: number,
  tagId: number,
  recipeImage: string,
  categoriesIds: number[],
  category?: number[],
  tag?: number[],
}

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {
  tags: any[] = [];
  tagId: number = 0;
  categorieId: number = 0;
  categories: ICategory[] = [];
  imgSrc: any;
  recipeId: number = 0;
  recipeForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    recipeImage: new FormControl(null),
    categoriesIds: new FormControl(null),
  });
  ids: number[] = [];
  recipeData: IRecipe | any;
  constructor(private router: Router, private _ActivatedRoute: ActivatedRoute,
    private _CategoryService: CategoryService, private _HelperService: HelperService, private _RecipesService: RecipesService, private dialog: MatDialog, private _ToastrService: ToastrService) {
    this.recipeId = _ActivatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getAllTags();
    this.getAllCategories();

    if (this.recipeId > 0) {
      this.getRecipeById(this.recipeId);
    }
  }
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
  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];

    console.log(this.imgSrc);

    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);

    data.value.id = this.recipeId
    let MyData = new FormData();
    MyData.append('name', data.value.name);
    MyData.append('description', data.value.description);
    MyData.append('price', data.value.price);
    MyData.append('tagId', data.value.tagId);
    MyData.append('categoriesIds', data.value.categoriesIds);
    MyData.append('recipeImage', this.imgSrc);

    if (this.recipeId) {
      MyData.append('id', data.value.id);


      this.editRecipe(MyData)



    } else {
      this.addRecipe(MyData)

    }
  }


  editRecipe(data: any) {

    this._RecipesService.onEditRecipe(this.recipeId, data).subscribe({

      next: (res) => {
        console.log(res);

      }, error: () => {

      }, complete: () => {
        this._ToastrService.success('Edit Successfuly');
        this.router.navigate(['/dashboard/admin/recipes']);

      }

    })
  }
  addRecipe(data: any) {
    this._RecipesService.onAddRecipe(data).subscribe({

      next: (res) => {
        console.log(res);

      }, error: () => {

      }, complete: () => {
        this._ToastrService.success('Add Successfuly');
        this.router.navigate(['/dashboard/admin/recipes']);

      }

    })
  }

  getRecipeById(id: number) {
    this._RecipesService.getRecipeById(id).subscribe({
      next: (res: IRecipe) => {
        console.log(res);
        this.recipeData = res
      }, error: () => {

      },
      complete: () => {
        let arr: any[] = [...this.recipeData.category]

        this.ids = arr.map(x => x.id);
        console.log(this.ids);

        this.recipeForm.patchValue({
          name: this.recipeData.name,
          description: this.recipeData.description,
          price: this.recipeData.price,
          tagId: this.recipeData.tag.id,
          recipeImage: this.recipeData.recipeImage,
          categoriesIds: this.recipeData.category.map((x:any)=>x.id)
        })
      }
    })
  }


}
