import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ModelComponent } from './model/model.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  { path: 'start-page', component: StartPageComponent },
  { path: 'ski', component: IndexComponent },
  { path: 'boots', component: IndexComponent },
  { path: 'model/:id', component: ModelComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'order', component: OrderFormComponent },
  { path: 'order-complete', component: OrderCompleteComponent },
  { path: '', redirectTo: '/start-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
