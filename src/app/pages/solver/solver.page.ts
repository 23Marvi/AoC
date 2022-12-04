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
    answerOne: string;
    answerTwo: string;

    constructor(
        private http: HttpClient
    ) {}

    async ngOnInit() {
        this.http.get("assets/input.txt", { responseType: "text" }).subscribe(input => { 
            const result = solver.s2022_1(input);     
        });
    }
}
