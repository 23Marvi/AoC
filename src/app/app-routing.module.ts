import { BlankPage } from "./pages/blank/blank.page";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SolverPage } from "./pages/solver/solver.page";

const routes: Routes = [
    {
        path: "blank",
        component: BlankPage,
    },
    {
        path: "solver",
        component: SolverPage,
    },
    {
        path: "**",
        redirectTo: "dashboard",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
