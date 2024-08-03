import { AfterViewInit, Component, computed, effect, input, ViewChild } from '@angular/core';
import { coerceColumn, Column } from "./column.model";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { CdkMenuModule } from "@angular/cdk/menu";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { toDatasourceFilter, isTrue, datasourceFilterPredicate } from "./filter.util";

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

  protected readonly getFilter = (col: Column) => this.filterForm().get(col.field).value;
  protected readonly setFilter = (col: Column, value: unknown) => this.filterForm().patchValue({[col.field]: value});
  protected readonly getTitle = (col: Column) => typeof col.title === "string" ? col.title : col.field;
  protected readonly isTrue = isTrue;

  columns = input.required<Column[], Column[]>({
    transform: (cols: Column[]) => cols.map(c => coerceColumn(c))
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
        .subscribe(value => this.dataSource.filter = toDatasourceFilter(value) as any)
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.filterPredicate = datasourceFilterPredicate;
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
}
