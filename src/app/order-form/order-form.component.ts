import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderDto, OrderItemDto } from '../dto/order';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { OrderCreateErrorCode } from '../dto/order-create-error-code';
import { AuthService } from '../auth.service';

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
    email: new FormControl('', [Validators.required, Validators.pattern('\\S+@\\S+\\.\\S{2,}')])
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

  errorMessage: string = '';

  constructor(
    private location: Location,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAnon) {
      let userDetails = this.authService.userDetails;
      this.form.patchValue({
        name: userDetails.name,
        surname: userDetails.surname,
        email: userDetails.email,
        phone: userDetails.phone
      });
    }
  }

  get isAnon() {
    return this.authService.isAnon;
  }

  goBack(): void {
    // this.location.back();
    this.router.navigate(['/start-page'])
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
    if (!this.authService.isAnon) {
      order.idCustomer = this.authService.userDetails.id;
    }
    this.orderService.createOrder(order).subscribe({
      next: order => {
        this.cartService.clear();
        this.router.navigate(['/order-complete'], {state: {data: order}});
      },
      error: error => {
        console.error(error);
        if (error.status == 404) {
          this.errorMessage = 'Произошла ошибка при выполнении запроса: ';
          let msg: string = '';
          let label: string = '';
          if (error.error.errorCode) {
            switch(error.error.errorCode) {
              case OrderCreateErrorCode.PRODUCT_NOT_AVAILABLE: 
                label = this.cartService.getProductLabelById(error.error.id)
                msg = `Товара (${label}) нет на складе в нужном количестве`;
                break;
              case OrderCreateErrorCode.PRODUCT_NOT_FOUND:
                label = this.cartService.getProductLabelById(error.error.id)
                msg = `Товар (${label}) не найден на складе`;
                break;
              case OrderCreateErrorCode.ORDER_IS_EMPTY:
                msg = 'Заказ пуст!';
                break;
              case OrderCreateErrorCode.CUSTOMER_NOT_FOUND:
                msg = 'Покупатель не найден!';
                break;
              default:
                msg = 'Неизвестная ошибка';
            }
          } else {
            msg = 'Объект не найден';
          }
          this.errorMessage += msg;
        }
      }
    });
  }

}
