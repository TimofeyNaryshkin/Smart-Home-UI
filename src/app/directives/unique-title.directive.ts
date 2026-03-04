import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Signal } from '@angular/core';
import { Tab } from '../models/tab.model';

export function uniqueTitleValidator(
  tabsSignal: Signal<Tab[]>,
  originalTitle?: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isNotUnique = tabsSignal()
      .map((tab) => tab.title)
      .includes(control.value);
    if (control.value === originalTitle) return null;
    return isNotUnique ? { notUnique: true } : null;
  };
}
