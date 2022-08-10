import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelFullDto } from '../dto/model';
import { ModelService } from '../model.service';
import { Location } from '@angular/common';
import { BootsDto, ProductDto, SkiDto } from '../dto/product';
import { Category } from '../domain/category';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../cart.service';
import { SelectProductComponent } from '../select-product/select-product.component';
import { Boots, Product, Ski } from '../domain/product';


class SelectProductValue {
  idProduct: number;
  value: string;

  constructor(idProduct: number, value: string) {
    this.idProduct = idProduct;
    this.value = value;
  }

}


export interface SelectProductData {
  title: string;
  values: SelectProductValue[];
}

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  model?: ModelFullDto;

  get Category(): typeof Category {
    return Category;
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private modelService: ModelService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.modelService.getModel(id).subscribe(model => this.model = model);
  }

  goBack(): void {
    this.location.back();
  }

  getHeightList(): string {
    if (this.model && this.model?.category == Category.SKI) {
      let result = this.model?.products.map(product => (product as SkiDto).height).sort().join(', ');
      return result;
    }
    return '';
  }

  getSizeList(): string {
    if (this.model && this.model?.category == Category.BOOTS) {
      let result = this.model?.products.map(product => (product as BootsDto).size).sort().join(', ');
      return result;
    }
    return '';
  }

  addToCart() {
    let title: string = '';
    let values: SelectProductValue[] = [];
    if (this.model) {
      if (this.model.category == Category.SKI) {
        title = 'ростовку';
        values = this.model.products.map(product => new SelectProductValue(product.id, (product as SkiDto).height.toString()))
          .sort((a, b) => a.value.localeCompare(b.value));
      } else {
        title = 'размер';
        values = this.model.products.map(product => new SelectProductValue(product.id, (product as BootsDto).size.toString()))
          .sort((a, b) => a.value.localeCompare(b.value));
      }
    }
    if (values.length > 0) {
      let dialogData: SelectProductData = { title: title, values: values };
      const dialogRef: MatDialogRef<SelectProductComponent> = this.dialog.open(SelectProductComponent, { data: dialogData });
      dialogRef.afterClosed().subscribe(
        result => {
          if (result && this.model) {
            let productId: number = Number(dialogRef.componentInstance.selectedValue);
            let productDto: ProductDto | undefined = this.model?.products.find(product => product.id == productId);
            if (productDto) {
              let product: Product;
              let productStr: string;
              if (this.model?.category == Category.SKI) {
                let ski = (productDto as SkiDto);
                product = new Ski(productId, this.model.id, ski.height);
                productStr = `Ростовка: ${ski.height}`;
              } else {
                let boots = (productDto as BootsDto);
                product = new Boots(productId, this.model?.id, boots.size);
                productStr = `Размер: ${boots.size}`;
              }
              let message: string;
              if (this.cartService.addToCart(product)) {
                message = `Модель ${this.model?.model} (${productStr}) добавлена в корзину`;
              } else {
                message = `Модель ${this.model?.model} (${productStr}) уже есть в корзине`;
              }
              this.snackBar.open(message, '', {
                duration: 2000,
                verticalPosition: 'top'
              });
            }
          }
        }
      );
    }
    // let index: string = 'cartItem_' + id; 
    // let message: string;
    // if (!localStorage.getItem(index)) {
    //   localStorage.setItem(index, "1");
    //   message = `Модель ${this.model?.model} добавлена в корзину`;
    // } else {
    //   message = `Модель ${this.model?.model} уже есть в корзине`;
    // }
    // this.snackBar.open(message, '', {
    //   duration: 2000,
    //   verticalPosition: 'top'
    // });
  }

}






