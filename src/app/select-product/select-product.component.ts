import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectProductData } from '../model/model.component';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.css']
})
export class SelectProductComponent implements OnInit {

  selectedValue: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SelectProductData
  ) {}

  ngOnInit(): void {
    this.selectedValue = this.data.values[0].idProduct.toString();
  }

}
