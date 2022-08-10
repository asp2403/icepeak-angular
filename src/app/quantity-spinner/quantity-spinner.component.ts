import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


export interface OnQuantityChangeEvent {
  index: number;
  quantity: number;
}

@Component({
  selector: 'app-quantity-spinner',
  templateUrl: './quantity-spinner.component.html',
  styleUrls: ['./quantity-spinner.component.css']
})

export class QuantitySpinnerComponent implements OnInit {

  minVal = 1;
  maxVal = 100;

  @Input() quantity: number = 1;
  @Input() index: number = 0;

  @Output() quantityChangeEvent = new EventEmitter<OnQuantityChangeEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  changeQuantity(delta: number): void {
    let oldVal = this.quantity;
    let newVal = this.quantity + delta;
    if (newVal > this.maxVal) {
      newVal = this.maxVal;
    } 
    if (newVal < this.minVal) {
      newVal = this.minVal;
    }
    if (oldVal !== newVal) {
      this.quantity = newVal;
      this.quantityChangeEvent.emit({
        index: this.index,
        quantity: this.quantity
      });
    }

    
  }

}
