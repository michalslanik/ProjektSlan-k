// about-author-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutAuthorPage } from './about-author.page';

const routes: Routes = [
  {
    path: '',
    component: AboutAuthorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutAuthorPageRoutingModule {}
