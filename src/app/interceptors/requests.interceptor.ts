/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UserState } from "../state/user/user.state";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(
        private store: Store,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.addAuthenticationToken(request);
        return next.handle(request);
    }

    private addAuthenticationToken(request: HttpRequest<any>) {
        const authorization = request.headers.get("Authorization");

        if (!authorization) {
            const token = this.store.selectSnapshot(UserState.accessToken);

            if (!token) {
                return request;
            }
            return request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        } else {
            return request;
        }
    }
}
