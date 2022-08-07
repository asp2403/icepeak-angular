import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ModelService } from '../model.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ModelShortDto } from '../dto/model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { VendorDto } from '../dto/vendor';
import { VendorService } from '../vendor.service';
import { AgeDto } from '../dto/age';
import { GenderDto } from '../dto/gender';
import { GenderService } from '../gender.service';
import { AgeService } from '../age.service';


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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _mode!: Mode;

  private category!: string;

  private params = new HttpParams().set('page', 0).set('size', 3);

  title!: string;

  models: ModelShortDto[] = [];

  totalModels = 0;

  pageNumber = 0;

  vendors: VendorDto[] = [];

  ages: AgeDto[] = [];

  genders: GenderDto[] = [];

  sortItems = [
    {key: 'price,asc', value: 'Цена, по возрастанию'},
    {key: 'price,desc', value: 'Цена, по убыванию'}
  ];

  constructor(private route: ActivatedRoute, 
    private modelService: ModelService, 
    private vendorService: VendorService,
    private genderService: GenderService,
    private ageService: AgeService) { }

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

  get Mode(): typeof Mode {
    return Mode;
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
    this.genderService.getGenders().subscribe(genders => this.genders = genders);
    this.ageService.getAges().subscribe(ages => this.ages = ages);

  }

  private search(): void {
    this.modelService.search(this.params).subscribe(result => {
      this.models = result.content;
      this.totalModels = result.totalElements;
      this.pageNumber = result.number;
    });
  }

  private resetPaginator(): void {
    this.paginator.firstPage();
  }

  filter(paramName: string, paramValue: string) {
    if (paramValue) {
      this.params = this.params.set(paramName, paramValue);
    } else {
      this.params = this.params.delete(paramName);
    }
    this.resetPaginator();
    this.search();
  }

  onPageEvent(event: PageEvent): void {
    this.params = this.params.set('page', event.pageIndex);
    this.search();
  }

}
