import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
}
