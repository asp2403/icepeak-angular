import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ModelBasicDto } from '../dto/model';
import { VendorDto } from '../dto/vendor';
import { PublicService } from '../public.service';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  total = 0;

  pageNumber = 0;

  params: HttpParams = new HttpParams().set('sort', 'category');

  models: ModelBasicDto[] = [];

  displayedColumns = ['category', 'vendor', 'model', 'price'];

  vendors: VendorDto[] = [];
  selectedVendor: string | null = null;

  selectedModel: string | null = null;

  private isFiltered = false;

  constructor(
    private vendorService: VendorService,
    private publicService: PublicService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vendorService.getVendors().subscribe(vendors => this.vendors = vendors);
    this.search();
  }

  onRowClick(row: ModelBasicDto) {
    this.router.navigate(['/work-area/warehouse/model/' + row.id])
  }

  private search(): void {
    this.publicService.searchModelsBasic(this.params).subscribe(result => {
      this.models = result.content;
      this.total = result.totalElements;
      this.pageNumber = result.number;
    });
  }

  onPageEvent(event: PageEvent) {
    this.params = this.params.set('page', event.pageIndex);
    this.search();
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

  private resetPaginator(): void {
    this.paginator.firstPage();
  }

}
