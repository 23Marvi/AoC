import { IJWTDecoded } from "src/app/interfaces/jwtDecoded.interface";
import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SetAccessTokenAction } from "./actions/set-access-token.action";
import { UserState } from "./user.state";
import { LogOutAction } from "./actions/logout.action";

@Injectable({
    providedIn: "root"
})
export class UserStateFacade {

    @Select(UserState.accessToken)
        accessToken$: Observable<string>;

    @Select(UserState.jwtDecoded)
        jwtDecoded$: Observable<IJWTDecoded>;

    constructor(private store: Store) { }

    setAccessToken(accessToken: string): Observable<void> {
        return this.store.dispatch(new SetAccessTokenAction(accessToken))
    }

    logout(): Observable<void> {
        return this.store.dispatch(new LogOutAction())
    }
}
