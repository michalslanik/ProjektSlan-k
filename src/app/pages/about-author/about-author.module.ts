// about-author.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AboutAuthorPageRoutingModule } from './about-author-routing.module';
import { AboutAuthorPage } from './about-author.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutAuthorPageRoutingModule
  ],
  declarations: [AboutAuthorPage]
})
export class AboutAuthorPageModule {}
