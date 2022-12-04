import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { UserStateFacade } from "./user.facade";
import { UserState } from "./user.state";

@NgModule({
    imports: [
        NgxsModule.forFeature([UserState])
    ],
    providers: [
        UserStateFacade,
    ]
})
export class UserStateModule {

}
