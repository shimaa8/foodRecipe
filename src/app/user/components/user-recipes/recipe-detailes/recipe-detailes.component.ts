import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-detailes',
  templateUrl: './recipe-detailes.component.html',
  styleUrls: ['./recipe-detailes.component.css']
})
export class RecipeDetailesComponent implements OnInit {
  imagePath: string = 'https://upskilling-egypt.com/';
  dummyImage: string = '../../../../assets/images/Recipes-Title.png'
  constructor(
    public dialogRef: MatDialogRef<RecipeDetailesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {


  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
