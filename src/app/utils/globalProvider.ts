import { Injectable } from "@angular/core";
import { IToastMessage } from "../interfaces/toastMessage.interface";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class GlobalProvider {
    constructor(
        private translateService: TranslateService
    ) {}

    isExpired(date: Date): boolean {
        return Date.now() > date.getTime();
    }

    getBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    async toastMessageToString(message: IToastMessage): Promise<string> {
        return await this.translateService.instant(`TOAST.${message.type}.${message.text}`, { value: message.value, value2: message.value2 });
    }
}
