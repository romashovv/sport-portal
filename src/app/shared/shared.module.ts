import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatInputModule,
  ],
  exports: [
    TableComponent
  ]
})
export class SharedModule { }
