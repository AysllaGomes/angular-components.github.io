import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {
  public year = new Date().getFullYear();
}
