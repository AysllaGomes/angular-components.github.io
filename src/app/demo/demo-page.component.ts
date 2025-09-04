import { Component } from '@angular/core';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { TableDemoComponent } from './sections/table/table-demo.component';
import { ToastDemoComponent } from './sections/toast/toast-demo.component';
import { StepperDemoComponent } from './sections/stepper/stepper-demo.component';
import { PaginationDemoComponent } from './sections/pagination/pagination-demo.component';
import { ToastContainerComponent } from '../shared/components/toast/toast-container.component';

@Component({
  selector: 'app-demo-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, StepperDemoComponent, TableDemoComponent, PaginationDemoComponent, ToastContainerComponent, ToastDemoComponent],
  templateUrl: './demo-page.component.html',
  styleUrl: './demo-page.component.sass'
})
export class DemoPageComponent {}
