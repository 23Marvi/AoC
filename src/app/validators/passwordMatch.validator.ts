import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatch: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const password = group.get("password").value;
    const passwordRepeat = group.get("passwordRepeat").value
    return password === passwordRepeat ? null : { notSame: true }
}