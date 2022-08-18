import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDto } from '../dto/order';
import { WorkAreaService } from '../work-area.service';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { ASSIGN, BpmData, COMPLETE_PROCESSING, DELIVER, RETURN_TO_PROCESSING } from '../dto/bpm';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-work-area-order',
  templateUrl: './work-area-order.component.html',
  styleUrls: ['./work-area-order.component.css']
})
export class WorkAreaOrderComponent implements OnInit {

  order?: OrderDto;

  bpmActions?: BpmData;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private workAreaService: WorkAreaService,
    private appService: AppService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workAreaService.getOrder(id).subscribe(
      order => {
        this.order = order;
        if (order?.state) {
          this.workAreaService.getActions(order.state).subscribe(
            actions => this.bpmActions = actions
          );
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  getOrderStateLabel(state: number | undefined): string {
    return this.appService.getStateLabel(state);
  }

  getOrderStateClass(state: number | undefined): string {
    return this.appService.getStateClass(state);
  }

  convertDate(value: string | undefined): string {
    if (value) {
      let date = new Date(value);
      return date.toLocaleString();
    } else {
      return '';
    }
  }

  assign() {
    if (this.order?.idOrder) {
      this.workAreaService.assignOrder(this.order.idOrder, this.authService.userDetails.id)
        .subscribe(order => {
          this.order = order;
          if (order.state) {
            this.workAreaService.getActions(order.state).subscribe(actions => this.bpmActions = actions);
          }
        });
    }
  }

  completeProcessing() {
    if (this.order?.idOrder) {
      this.workAreaService.orderCompleteProcessing(this.order.idOrder)
        .subscribe(order => {
          this.order = order;
          if (order.state) {
            this.workAreaService.getActions(order.state).subscribe(actions => this.bpmActions = actions);
          }
        })
    }
  }

  get assignNextHidden() {
    let isHidden = this.bpmActions?.nextAction != ASSIGN || this.authService.userDetails.id == this.order?.manager?.id;
    return isHidden;
  }

  get assignPrevHidden() {
    let isHidden = this.bpmActions?.prevAction != ASSIGN || this.authService.userDetails.id == this.order?.manager?.id;
    return isHidden;
  }

  get completeProcessingNextHidden() {
    return this.bpmActions?.nextAction != COMPLETE_PROCESSING;
  }

  get completeProcessingPrevHidden() {
    return this.bpmActions?.prevAction != COMPLETE_PROCESSING;
  }

  get deliverNextHidden() {
    return this.bpmActions?.nextAction != DELIVER;
  }

  get returnToProcessingPrevHidden() {
    return this.bpmActions?.prevAction != RETURN_TO_PROCESSING;
  }

  deliver() {

  }

  returnToProcessing() {
    
  }

  getManagerName(order: OrderDto) {
    return this.appService.getManagerName(order);
  }


}
