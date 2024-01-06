import { computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export function toSignalWithError<T>(obs$: Observable<T>): {
  value: Signal<T | undefined>;
  error: Signal<any>;
} {
  const source = toSignal(
    obs$.pipe(
      map((value: T) => ({ value, error: undefined })),
      catchError((error) => of({ value: undefined, error })),
    ),
  );

  const value = computed(() => source()?.value);
  const error = computed(() => source()?.error);

  return { value, error };
}
