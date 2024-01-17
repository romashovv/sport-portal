import { Component, Input, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild(DatatableComponent) table!: DatatableComponent;

  @Input() rows: Array<any> | null | undefined;
  @Input() columns:  TableColumn[] = [];

  protected readonly ColumnMode = ColumnMode;
}
