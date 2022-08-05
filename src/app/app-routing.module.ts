import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'start-page', component: StartPageComponent },
  { path: '', redirectTo: '/start-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
