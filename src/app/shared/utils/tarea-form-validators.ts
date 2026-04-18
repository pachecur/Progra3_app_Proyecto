import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Exige que `hora_fin` sea estrictamente posterior a `hora_inicio` (formato `HH:mm`). */
export function horaFinPosteriorAInicio(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const ini = group.get('hora_inicio')?.value as string | null | undefined;
    const fin = group.get('hora_fin')?.value as string | null | undefined;
    if (!ini?.trim() || !fin?.trim()) {
      return null;
    }
    if (ini >= fin) {
      return { horaFinInvalida: true };
    }
    return null;
  };
}
