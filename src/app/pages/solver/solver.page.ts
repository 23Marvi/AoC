import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Solver } from "src/app/classes/solver";

const solver = new Solver();

@Component({
    selector: "app-solver",
    templateUrl: "./solver.page.html",
    styleUrls: ["./solver.page.scss"]
})
export class SolverPage implements OnInit {
    result;

    constructor(
        private http: HttpClient
    ) {}

    async ngOnInit() {
        this.http.get("assets/input.txt", { responseType: "text" }).subscribe(input => { 
            this.result = solver.s2021_4(input);     
        });
    }
}
