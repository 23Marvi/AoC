import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { UserStateFacade } from "src/app/state/user/user.facade";
import { GlobalProvider } from "../utils/globalProvider";

@Injectable()
export class ValidJWT implements CanActivate {
    constructor(
        private userStateFacade: UserStateFacade,
        private router: Router,
        private globalProvider: GlobalProvider
    ) { }

    async canActivate() {
        const token = await firstValueFrom(this.userStateFacade.jwtDecoded$);

        if (!token) {
            this.router.navigate(["login"]);
            return false;
        } else {
            const expireDate = new Date(token.exp * 1000);
            if (this.globalProvider.isExpired(expireDate)) {
                return false;
            }
            return true;
        }
    }
}
