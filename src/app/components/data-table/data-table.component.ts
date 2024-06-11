import { AfterViewInit, Component, computed, effect, input, ViewChild } from '@angular/core';
import { Column } from "./column.model";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { CdkMenuModule } from "@angular/cdk/menu";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { toFieldFilters, FieldFilter, matches } from "./filter.util";

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    CdkMenuModule,
    MatIcon,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements AfterViewInit {

  readonly trackField = (index: number, column: Column) => column.field;
  readonly isTrue = (value: any) => typeof value === 'boolean' && value;
  readonly getFilter = (col: Column) => this.filterForm().get(col.field).value;
  readonly setFilter = (col: Column, value: unknown) => this.filterForm().patchValue({[col.field]: value});
  readonly getTitle = (col: Column) => typeof col.title === "string" ? col.title : col.field;

  columns = input.required<Column[], Column[]>({
    transform: (cols: Column[]) => {
      return cols.map(c => {
        c.type = c.type == null ? 'string' : c.type;
        return c;
      })
    }
  })

  data = input<any[]>([]);

  displayedColumns = computed(() => {
    return this.columns()
        .filter(col => !col.isHidden)
        .map(col => col.field);
  });

  filterForm = computed(() => {
    const controls = this.columns().reduce((prev, curr) => {
      prev[curr.field] = new FormControl();
      return prev;
    }, {});
    return new FormGroup(controls);
  });

  @ViewChild(MatSort) sort: MatSort | undefined;

  dataSource = new MatTableDataSource([]);

  constructor() {
    effect(() => this.dataSource.data = this.data());
    effect(() => this.filterForm().valueChanges
        .subscribe(value => this.dataSource.filter = toFieldFilters(value) as any)
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.filterPredicate = this.filterPredicate;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  private filterPredicate(record: any, filter: any) {
    return !filter || filter.every((f: FieldFilter) => matches(record[f.field], f.filter));
  }
}
