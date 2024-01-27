import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuestionsService, SchemasListItem } from '@services/questions.service';

@Component({
  selector: 'app-forms-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <p>Zoznam formulárov:</p>

    @if (formsList.length > 0) {
      <ul>
        @for (form of formsList; track $index) {
          <li>
            <a [routerLink]="['/form', form.id]" [routerLinkActive]="['active-link']">
              {{ form.title }}
            </a>
          </li>
        }
      </ul>
    } @else {
      Zoznam je prázdny.
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsPageComponent implements OnInit, OnDestroy {
  questionsService: QuestionsService = inject(QuestionsService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  formsList: SchemasListItem[] = [];
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.questionsService
      .loadAllFormSchemas()
      .subscribe((list: SchemasListItem[]) => {
        this.formsList = [...list];
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this?.subscription?.unsubscribe();
  }
}
