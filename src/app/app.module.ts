import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './index/index.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { StartPageComponent } from './start-page/start-page.component';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator'; 
import { RuPaginator } from './ru-paginator';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input';
import { ModelComponent } from './model/model.component'; 
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatDialogModule} from '@angular/material/dialog';
import { SelectProductComponent } from './select-product/select-product.component'; 
import {MatTableModule} from '@angular/material/table';
import { QuantitySpinnerComponent } from './quantity-spinner/quantity-spinner.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { CheckGridComponent } from './check-grid/check-grid.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProviders } from './http-interceptors';
import { ManagementOrdersComponent } from './management-orders/management-orders.component';
import { WorkAreaOrderComponent } from './work-area-order/work-area-order.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavComponent,
    StartPageComponent,
    ModelComponent,
    SelectProductComponent,
    QuantitySpinnerComponent,
    ConfirmDialogComponent,
    ShoppingCartComponent,
    OrderFormComponent,
    CheckGridComponent,
    OrderCompleteComponent,
    LoginComponent,
    ManagementOrdersComponent,
    WorkAreaOrderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,

  ],
  providers: [{provide: MatPaginatorIntl, useValue: RuPaginator()}, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
