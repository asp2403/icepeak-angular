import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelFullDto } from '../dto/model';
import { ModelService } from '../model.service';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-warehouse-model',
  templateUrl: './warehouse-model.component.html',
  styleUrls: ['./warehouse-model.component.css']
})
export class WarehouseModelComponent implements OnInit {

  model?: ModelFullDto;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private modelService: ModelService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.modelService.getModel(id).subscribe(model => this.model = model);
  }

  goBack(): void {
    this.location.back();
  }

  get isManager() {
    return this.authService.isManager;
  }

}
