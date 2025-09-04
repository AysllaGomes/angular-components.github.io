import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TPipe } from '../../../shared/i18n/t.pipe';

import { I18nService } from '../../../shared/services/i18n.service';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-demo-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    NgIf,
    TPipe,
  ],
  styleUrl: './header.component.sass'
})
export class HeaderComponent {
  theme = inject(ThemeService);
  i18n  = inject(I18nService);

  toggleTheme() { this.theme.toggle(); }
  toggleLang()  { this.i18n.toggle(); }
}
