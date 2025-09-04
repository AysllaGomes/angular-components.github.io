import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { StepState } from '../../model/type/step-state.type';

import { StepItem } from '../../model/interface/step-item.interface';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'tablist',
    'aria-label': 'Etapas do fluxo'
  }
})
export class StepperComponent {
  @Input({ required: true }) steps: StepItem[] = [];

  /** Índice base-0 da etapa ativa */
  @Input() current = 0;

  /** Permite clicar em etapas (limite: até a última concluída + 1) */
  @Input() clickable = true;

  /** Exibir números dentro dos círculos */
  @Input() showIndex = true;

  /** Mostrar legendas (caption) abaixo do label */
  @Input() showCaption = true;

  /** Emite quando o usuário clica em uma etapa válida */
  @Output() stepChange = new EventEmitter<number>();

  /** cálculo de estado visual */
  getState(i: number): StepState {
    if (this.steps[i]?.state === 'disabled') return 'disabled';
    if (i < this.current) return 'done';
    if (i === this.current) return 'active';
    return 'pending';
  }

  /** Qual a maior etapa alcançável para navegação por clique */
  private get maxReachableIndex(): number {
    // permite voltar para anteriores e avançar para a próxima imediata
    return Math.max(this.current + 1, 0);
  }

  canClick(i: number): boolean {
    if (!this.clickable) return false;
    const state = this.getState(i);
    if (state === 'disabled') return false;
    // você pode sempre voltar para as anteriores; avançar no máx até a próxima
    return i <= this.maxReachableIndex;
  }

  onStepClick(i: number): void {
    if (!this.canClick(i) || i === this.current) return;
    this.stepChange.emit(i);
  }

  trackByIndex = (_: number, __: unknown) => _;
}
