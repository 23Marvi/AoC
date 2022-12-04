import { GlobalProvider } from "src/app/utils/globalProvider";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { filter } from "rxjs";
import { BaseComponent } from "./components/base-component/base-component";
import { AppStateFacade } from "./state/app/app.facade";
import { ToastrService } from "ngx-toastr";
import { takeUntil } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent extends BaseComponent implements OnInit {

    constructor(
        private appStateFacade: AppStateFacade,
        private translateService: TranslateService,
        private toastr: ToastrService,
        private globalProvider: GlobalProvider
    ) {
        super();
    }

    async ngOnInit(): Promise<void> {
        this.appStateFacade.language$.subscribe((language) => {
            this.translateService.reloadLang(language);
            this.translateService.use(language);
        });

        this.appStateFacade.message$.pipe(takeUntil(this.destroy$), filter(x => !!x)).subscribe(async (message) => {
            const text = await this.globalProvider.toastMessageToString(message);
            if (message.type === "SUCCESS") {
                this.toastr.success(text);
            } else if (message.type === "WARNING") {
                this.toastr.warning(text);
            } else if (message.type === "ERROR") {
                this.toastr.error(text);
            } else {
                this.toastr.info(text);
            }
        });
    }
}
