import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { IToastMessage } from "../../interfaces/toastMessage.interface";
import { SetLanguage } from "./actions/set-language.action";
import { SetOverlayLoaderStatus } from "./actions/set-overlay-loader-status";
import { SendToastAction } from "./actions/toastMessage";
import { AppState } from "./app.state";

@Injectable()
export class AppStateFacade {

    @Select(AppState.language)
        language$: Observable<string>;

    @Select(AppState.message)
        message$: Observable<IToastMessage>;

    @Select(AppState.showOverlayLoader)
        showOverlayLoader$: Observable<boolean>;

    constructor(
        private store: Store
    ) { }

    sendToastAction(message: IToastMessage): Observable<void> {
        return this.store.dispatch(new SendToastAction(message))
    }

    setLanguage(language: string): Observable<void> {
        return this.store.dispatch(new SetLanguage(language));
    }

    setShowOverlayLoader(status: boolean): Observable<void> {
        return this.store.dispatch(new SetOverlayLoaderStatus(status));
    }
}
