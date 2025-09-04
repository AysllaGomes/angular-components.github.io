import { Component, computed, inject, signal } from '@angular/core';

import { TPipe } from '../../../shared/i18n/t.pipe';

import { I18nService } from '../../../shared/services/i18n.service';

import { StepItem } from '../../../shared/model/interface/step-item.interface';

import { StepperComponent } from '../../../shared/components/stepper/stepper.component';

@Component({
  selector: 'app-stepper-demo',
  standalone: true,
  imports: [StepperComponent, TPipe],
  templateUrl: './stepper-demo.component.html',
  styleUrl: './stepper-demo.component.sass'
})
export class StepperDemoComponent {
  private i18n = inject(I18nService);

  // básico
  steps = computed<StepItem[]>(() => [
    { label: this.i18n.t('stepper.step.delivery'),       caption: this.i18n.t('stepper.step.delivery.caption') },
    { label: this.i18n.t('stepper.step.product'),        caption: this.i18n.t('stepper.step.product.caption') },
    { label: this.i18n.t('stepper.step.customization'),  caption: this.i18n.t('stepper.step.customization.caption') },
    { label: this.i18n.t('stepper.step.addons'),         caption: this.i18n.t('stepper.step.addons.caption') },
    { label: this.i18n.t('stepper.step.summary'),        caption: this.i18n.t('stepper.step.summary.caption') },
  ]);

  current = signal(0);
  goTo = (i: number) => this.current.set(i);
  next = () => this.current.update(v => Math.min(v + 1, this.steps.length - 1));
  prev = () => this.current.update(v => Math.max(v - 1, 0));

  // com etapa desabilitada
  stepsDisabled: StepItem[] = [
    { label: 'Etapa 1' }, { label: 'Etapa 2' }, { label: 'Etapa 3', state: 'disabled' }, { label: 'Etapa 4' }
  ];
  current2 = signal(1);
}
