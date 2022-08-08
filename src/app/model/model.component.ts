import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelFullDto } from '../dto/model';
import { ModelService } from '../model.service';
import { Location } from '@angular/common';
import { BootsDto, SkiDto } from '../dto/product';
import { Category } from '../domain/category';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.modelService.getModel(id).subscribe(model => this.model = model);
  }

  goBack(): void {
    this.location.back();
  }

  getHeightList(): string {
    if(this.model && this.model?.category == Category.SKI) {
      let result = this.model?.products.map(product => (product as SkiDto).height).sort().join(', ');
      return result;
    }
    return '';
  }

  getSizeList(): string {
    if(this.model && this.model?.category == Category.BOOTS) {
      let result = this.model?.products.map(product => (product as BootsDto).size).sort().join(', ');
      return result;
    }
    return '';
  }

  addToCart(id: number) {
    let index: string = 'cartItem_' + id; 
    let message: string;
    if (!localStorage.getItem(index)) {
      localStorage.setItem(index, "1");
      message = `Модель ${this.model?.model} добавлена в корзину`;
    } else {
      message = `Модель ${this.model?.model} уже есть в корзине`;
    }
    this.snackBar.open(message, '', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}


