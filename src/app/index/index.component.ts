import { Component, OnInit, SkipSelf } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ModelService } from '../model.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ModelShortDto } from '../dto/model';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { VendorDto } from '../dto/vendor';
import { VendorService } from '../vendor.service';


enum Mode {
  Ski,
  Boots
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  private _mode!: Mode;

  private category!: string;

  private params = new HttpParams().set('page', 0).set('size', 3);

  title!: string;

  models: ModelShortDto[] = [];

  totalModels = 0;

  pageNumber = 0;

  vendors: VendorDto[] = [];

  constructor(private route: ActivatedRoute, 
    private modelService: ModelService, 
    private vendorService: VendorService) { }

  get mode() {
    return this._mode;
  }

  set mode(value: Mode) {
    this._mode = value;
    if (value === Mode.Ski) {
      this.title = "Горные лыжи";
      this.category = '1';
    } else {
      this.title = "Горнолыжные ботинки";
      this.category = '2';
    }
  }

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path === 'ski') {
      this.mode = Mode.Ski;
    } else {
      this.mode = Mode.Boots;
    }
    this.params = this.params.set('category', this.category);
    this.search();

    this.vendorService.getVendors().subscribe(vendors => this.vendors = vendors);

  }

  private search(): void {
    this.modelService.search(this.params).subscribe(result => {
      this.models = result.content;
      this.totalModels = result.totalElements;
      this.pageNumber = result.number;
    });
  }

  onPageEvent(event: PageEvent): void {
    this.params = this.params.set('page', event.pageIndex);
    this.search();
  }

  filterByVendor(value: number): void {
    if (value) {
      this.params = this.params.set('vendor', value);
    } else {
      this.params = this.params.delete('vendor');
    }
    this.params = this.params.delete('page');
    this.search();

  }

  modelNameChange(event: any) {
    console.log(event);
  }
}
