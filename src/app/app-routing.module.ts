import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImageSearchComponent} from "./image-search/image-search.component";

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/search'
  },
  {
    path: 'search', title: 'Search', component: ImageSearchComponent
  },
  {
    path: '**', redirectTo: '/search'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
