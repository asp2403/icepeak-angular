import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderDto, OrderItemDto } from '../dto/order';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern('\\d{3}\\s?\\d{3}\\s?\\d{2}\\s?\\d{2}')]),
    email: new FormControl('', [Validators.required, Validators.pattern('\\S+@\\S+\\.\\S+')])
  });

  get nameControl() {
    return this.form.controls['name'];
  }

  get surnameControl() {
    return this.form.controls['surname'];
  }

  get phoneControl() {
    return this.form.controls['phone'];
  }

  get emailControl() {
    return this.form.controls['email'];
  }

  constructor(
    private location: Location,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    let orderItems: OrderItemDto[] = [];
    this.cartService.currentDatasource.forEach((dsItem) => {
      let itemDto: OrderItemDto = {
        idProduct: dsItem.idProduct,
        qty: dsItem.qty
      }
      orderItems.push(itemDto);
    });
    let order: OrderDto = {
      contactName: this.nameControl.value,
      contactSurname: this.surnameControl.value,
      contactPhone: this.phoneControl.value,
      contactEmail: this.emailControl.value,
      items: orderItems
    }
    this.orderService.createOrder(order).subscribe(order => {
      this.cartService.clear();
      this.router.navigate(['/order-complete'], {state: {data: order}});
    });
  }

}
