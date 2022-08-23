import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelFullDto } from '../dto/model';
import { ModelService } from '../model.service';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { WHProduct } from '../domain/warehouse';
import { Category } from '../domain/category';
import { Ski } from '../domain/product';
import { BootsDto, SkiDto } from '../dto/product';

@Component({
  selector: 'app-warehouse-model',
  templateUrl: './warehouse-model.component.html',
  styleUrls: ['./warehouse-model.component.css']
})
export class WarehouseModelComponent implements OnInit {

  model?: ModelFullDto;

  whProducts: WHProduct[] = [];
  displayedColumns = ['label', 'qtyAvailable', 'qtyReserved'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private modelService: ModelService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.modelService.getModel(id).subscribe(
      model => {
        this.model = model;
        model.products.forEach(
          product => {
            let whProduct;
            if (model.category == Category.SKI) {
              whProduct = new WHProduct(product.id, `Ростовка: ${(product as SkiDto).height}`, product.qtyAvailable, product.qtyReserved);
            } else {
              whProduct = new WHProduct(product.id, `Размер: ${(product as BootsDto).size}`, product.qtyAvailable, product.qtyReserved);
            }
            this.whProducts.push(whProduct);
          }
        );
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  get isManager() {
    return this.authService.isManager;
  }

}
