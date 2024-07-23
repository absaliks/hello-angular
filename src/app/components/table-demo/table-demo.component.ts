import { Component } from '@angular/core';
import { Column } from "../data-table/column.model";
import { DataTableComponent } from "../data-table/data-table.component";

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    DataTableComponent
  ],
  template: `
    <app-data-table [data]="data" [columns]="columns" />
  `
})
export class TableDemoComponent {

  readonly columns: Column[] = [
    {field: 'id', type: 'number'},
    {field: 'name', title: 'Name'},
    {field: 'price', title: 'Price', type: 'number'},
    {field: 'isInStock', title: 'In Stock', type: 'bool'},
    {field: 'isOnDisplay', title: 'On Display', type: 'bool'},
    {
      field: 'createdOn',
      title: 'Created On',
      type: 'date',
      filters: [
        {label: 'is in future', predicate: value => new Date(value as string).getFullYear() > 2024}
      ]
    },
  ];

  readonly data: TestItem[] = [
    {
      id: 1,
      name: 'Book "Goodbye, World!"',
      price: 56.45,
      isInStock: true,
      isOnDisplay: false,
      createdOn: "1987-05-04"
    }, {
      id: 38,
      name: 'Mug "Start field"',
      price: 15.99,
      isInStock: true,
      isOnDisplay: true,
      createdOn: "2023-12-12"
    }, {
      id: 123,
      name: 'Notepad "Newer Scrolls 7"',
      price: 8.49,
      isInStock: false,
      isOnDisplay: false,
      createdOn: "2024-02-13"
    }, {
      id: 221,
      name: 'Pen "Med Y"',
      price: 4.20,
      isInStock: true,
      isOnDisplay: false,
      createdOn: "2024-06-01"
    }, {
      id: 278,
      name: `Toy truck "Luka's Cola"`,
      price: 33.99,
      isInStock: true,
      isOnDisplay: true,
      createdOn: "2024-06-08"
    }, {
      id: 426,
      name: 'BFG-X-02752',
      price: 738_450_599.00,
      isInStock: false,
      isOnDisplay: true,
      createdOn: "2035-12-27"
    },
  ];
}

interface TestItem {
  id: number;
  name: string;
  price: number;
  isInStock: boolean;
  isOnDisplay: boolean;
  createdOn: string;
}
