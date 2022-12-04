import { LogOutAction } from "./actions/logout.action";
import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { SetAccessTokenAction } from "./actions/set-access-token.action";
import jwt_decode from "jwt-decode";
import { IJWTDecoded } from "src/app/interfaces/jwtDecoded.interface";

export interface IUserState {
    accessToken: string;
    jwtDecoded: IJWTDecoded;
}

@State<IUserState>({
    name: "user",
    defaults: {
        accessToken: null,
        jwtDecoded: null,
    }
})
@Injectable()
export class UserState {
    @Selector()
    static accessToken(state: IUserState): string {
        return state.accessToken;
    }

    @Selector()
    static jwtDecoded(state: IUserState): IJWTDecoded {
        return state.jwtDecoded;
    }

    @Action(SetAccessTokenAction)
    setAccessToken(ctx: StateContext<IUserState>, payload: SetAccessTokenAction): IUserState {
        const accessToken = payload.accessToken;
        const jwtDecoded: IJWTDecoded = jwt_decode(accessToken);
        return ctx.patchState({
            accessToken,
            jwtDecoded,
        });
    }

    @Action(LogOutAction)
    logout(ctx: StateContext<IUserState>, payload: LogOutAction): IUserState {
        return ctx.patchState({
            accessToken: null,
            jwtDecoded: null,
        });
    }
}
