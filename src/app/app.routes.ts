import { Routes } from '@angular/router';
import { TableDemoComponent } from "./components/table-demo/table-demo.component";

export const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: "table-demo"},
  {path: 'table-demo', component: TableDemoComponent}
];
