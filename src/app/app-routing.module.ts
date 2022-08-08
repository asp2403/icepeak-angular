import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ModelComponent } from './model/model.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  { path: 'start-page', component: StartPageComponent },
  { path: 'ski', component: IndexComponent },
  { path: 'boots', component: IndexComponent },
  { path: 'model/:id', component: ModelComponent },
  { path: '', redirectTo: '/start-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
