import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TDashboard } from '../models/dashboard.model';
import { Signal } from '@angular/core';

export function uniqueIdValidator(getList: Signal<TDashboard[]>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isNotUnique = getList().map((dashboard) => dashboard.id).includes(control.value);
    return isNotUnique ? { notUnique: true } : null;
  };
}
