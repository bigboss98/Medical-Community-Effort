import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StructurePageRoutingModule } from './structure-routing.module';

import { StructurePage } from './structure.page';
import { HttpClientModule } from '@angular/common/http';
import { NewStructureComponent } from './newStructure.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    StructurePageRoutingModule
  ],
  declarations: [StructurePage, NewStructureComponent]
})
export class StructurePageModule {}
