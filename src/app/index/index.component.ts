import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ModelService } from '../model.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { MatSnackBar } from '@angular/material/snack-bar';


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
  selectedVendor: string | null = null;

  ages: AgeDto[] = [];
  selectedAge: string | null = null;

  genders: GenderDto[] = [];
  selectedGender: string | null = null;

  sortItems = [
    { key: 'price,asc', value: 'Цена, по возрастанию' },
    { key: 'price,desc', value: 'Цена, по убыванию' }
  ];
  selectedSortItem: string | null = null;

  selectedModel: string | null = null;

  selectedPriceForm: string | null = null;
  selectedPriceTo: string | null = null;

  selectedHeightFrom: string | null = null;
  selectedHeightTo: string | null = null;

  selectedSizeFrom: string | null = null;
  selectedSizeTo: string | null = null;

  isFiltered = false;

  constructor(private route: ActivatedRoute,
    private modelService: ModelService,
    private vendorService: VendorService,
    private genderService: GenderService,
    private ageService: AgeService,
    private router: Router
    ) { }

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
    let storedParams = sessionStorage.getItem('searchParams');
    if (storedParams) {
      sessionStorage.removeItem('searchParams');
      this.params = new HttpParams({ fromString: storedParams });
      let category = this.params.get('category');
      if (category != this.category) {
        this.params = this.params.set('category', this.category);
        this.isFiltered = false;
      } else {
        this.selectedGender = this.params.get('gender');
        this.selectedAge = this.params.get('age');
        this.selectedSortItem = this.params.get('sort');
        this.selectedVendor = this.params.get('vendor');
        this.selectedModel = this.params.get('model');
        this.selectedPriceForm = this.params.get('priceFrom');
        this.selectedPriceTo = this.params.get('priceTo');
        this.selectedHeightFrom = this.params.get('heightFrom');
        this.selectedHeightTo = this.params.get('heightTo');
        this.selectedSizeFrom = this.params.get('sizeFrom');
        this.selectedSizeTo = this.params.get('sizeTo');
        this.isFiltered = this.params.keys().length > 3;
      }
    } else {
      this.params = this.params.set('category', this.category);
      this.isFiltered = false;
    }
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
    this.isFiltered = true;
  }

  onPageEvent(event: PageEvent) {
    this.params = this.params.set('page', event.pageIndex);
    this.search();
  }

  goToModel(id: number) {
    sessionStorage.setItem('searchParams', this.params.toString());
    this.router.navigate(['/model', id]);
  }

  resetFilters() {

    this.selectedGender = '';
    this.selectedAge = '';
    this.selectedSortItem = '';
    this.selectedVendor = '';
    this.selectedModel = '';
    this.selectedPriceForm = '';
    this.selectedPriceTo = '';
    this.selectedHeightFrom = '';
    this.selectedHeightTo = '';
    this.selectedSizeFrom = '';
    this.selectedSizeTo = '';
    this.params = new HttpParams()
      .set('category', this.category)
      .set('page', 0)
      .set('size', 3);
    this.resetPaginator();
    this.search();
    this.isFiltered = false;
  }

}
