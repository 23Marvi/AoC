import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IToastMessage } from "../../interfaces/toastMessage.interface";
import { SetLanguage } from "./actions/set-language.action";
import { SetOverlayLoaderStatus } from "./actions/set-overlay-loader-status";
import { SendToastAction } from "./actions/toastMessage";

export interface IAppState {
    language: string;
    message: IToastMessage;
    showOverlayLoader: boolean;
}

@State<IAppState>({
    name: "app",
    defaults: {
        language: "en-GB",
        message: null,
        showOverlayLoader: false,
    }
})
@Injectable()
export class AppState {

    @Selector()
    static language(state: IAppState): string {
    	return state.language;
    }

    @Selector()
    static message(state: IAppState): IToastMessage {
    	return state.message;
    }

    @Selector()
    static showOverlayLoader(state: IAppState): boolean {
        return state.showOverlayLoader;
    }

    @Action(SetLanguage)
    setLanguage(ctx: StateContext<IAppState>, payload: SetLanguage): void {
    	ctx.patchState({
    		language: payload.language
    	});
    }

    @Action(SendToastAction)
    sendToastMessage(ctx: StateContext<IAppState>, payload: SendToastAction): void {
    	ctx.patchState({
    		message: payload.message
    	});
    }

    @Action(SetOverlayLoaderStatus)
    setOverlayInstructionStatus(ctx: StateContext<IAppState>, payload: SetOverlayLoaderStatus): IAppState {
        return ctx.patchState({
            showOverlayLoader: payload.status
        });
    }
}
