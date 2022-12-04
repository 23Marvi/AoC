import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-solver",
    templateUrl: "./solver.page.html",
    styleUrls: ["./solver.page.scss"]
})
export class SolverPage implements OnInit {
    input = null; 
    solved = [];
    answerOne: string;
    answerTwo: string;

    constructor(
        private http: HttpClient
    ) {}

    async ngOnInit() {
        this.http.get("assets/input.txt", { responseType: "text" }).subscribe(input => { this.solve2022_4(input); });
    }

    solve2022_1(input: string) {
        const caloriesPerElf: number[] = [];
        const elves = input.split("\n\r")

        for (const elf of elves) {
            const values = Array.from(elf.split("\n"), Number)
            const totalElfValue = values.reduce((x, a) => x + a, 0)
            caloriesPerElf.push(totalElfValue)
        }

        let topThree = 0;
        const highest = Math.max(...caloriesPerElf);
        
        for (let i = 0; i < 3; i++) {
            const high = Math.max(...caloriesPerElf);
            const index = caloriesPerElf.indexOf(high)
            caloriesPerElf.splice(index, 1);
            topThree += high;
        }

        this.answerOne = `Highest: ${highest}`
        this.answerTwo = `Top three combined: ${topThree}`
    }

    solve2022_2(input: string) {
        input = input.replaceAll("\r", "").replaceAll("\n", "").replaceAll(" ", "");

        const oppponentMoves = ["A", "B", "C"]
        const myMoves = ["X", "Y", "Z"]
        const win = 6;
        const draw = 3;
        const rock = 0;
        const scissors = 2;
        
        const toDraw = "Y"
        const toWin = "Z";

        let totalScoreTwo = 0;
        let totalScoreOne = 0;

        for (let i = 0; i < input.length; i++) {
            if (i % 2 === 1) {
                const myTurn = input[i];
                const myShape = oppponentMoves.indexOf(input[i-1]);
                const theirShape = myMoves.indexOf(myTurn);

                totalScoreOne += theirShape + 1
                totalScoreTwo++;

                if (myShape === theirShape) {
                    totalScoreOne += draw
                } else if ((theirShape === rock && myShape === scissors) || (theirShape === myShape + 1)) {
                    totalScoreOne += win;
                }

                if (myTurn === toWin) {
                    totalScoreTwo += win;
                    if (myShape === scissors) {
                        totalScoreTwo += rock
                    } else {
                        totalScoreTwo += myShape + 1
                    }
                } else if (myTurn === toDraw) {
                    totalScoreTwo += draw + myShape;
                } else {
                    if (myShape === rock) {
                        totalScoreTwo += scissors
                    } else {
                        totalScoreTwo += myShape - 1
                    }
                }
            }
        }

        this.answerOne = `Total score 1: ${totalScoreOne}`
        this.answerTwo = `Total score 2: ${totalScoreTwo}`
    }

    solve2022_3(input: string) {
        const priorities = [];
        const badgePriorites = [];

        const rucksacks = input.split("\n");
        for (let i = 0; i < rucksacks.length; i++) {
            const rucksackOne = rucksacks[i].replace("\r", "");
            const lettersInCptOne = Array.from(rucksackOne.slice(0, rucksackOne.length / 2))
            const lettersInCptTwo = Array.from(rucksackOne.slice(rucksackOne.length / 2))
            const letter = lettersInCptOne.filter(x => lettersInCptTwo.includes(x))[0];
    
            if (letter == letter.toUpperCase()) {
                priorities.push(letter.charCodeAt(0) - 38);
            } else {
                priorities.push(letter.charCodeAt(0) - 96);
            }

            if ((i + 1) % 3 === 0) {
                const lettersRucksackOne = Array.from(rucksackOne);
                const lettersRucksackTwo = Array.from(rucksacks[i-1].replace("\r", ""));
                const lettersRucksackThree = Array.from(rucksacks[i-2].replace("\r", ""));
                const letter = lettersRucksackOne.filter(x => lettersRucksackTwo.includes(x) && lettersRucksackThree.includes(x))[0]
                
                if (letter == letter.toUpperCase()) {
                    badgePriorites.push(letter.charCodeAt(0) - 38);
                } else {
                    badgePriorites.push(letter.charCodeAt(0) - 96);
                }
            }
        }

        const prioritySum = priorities.reduce((x, a) => x + a, 0);
        const badgePrioritySum = badgePriorites.reduce((x, a) => x + a, 0);

        this.answerOne = `Priority sum: ${prioritySum}`
        this.answerTwo = `Badge priority sum: ${badgePrioritySum}`
    }

    solve2022_4(input: string) {
        let containingPairs = 0;
        let overlappingPairs = 0;
        
        const elves = input.split("\n").toString().split(",");
        for (let i = 0; i < elves.length; i++) {         
            if (i % 2 === 1) {
                const elfTwo = Array.from(elves[i].split("-"), Number)
                const elfOne = Array.from(elves[i-1].split("-"), Number)

                if (elfOne[0]=== elfTwo[0] || elfOne[1] === elfTwo[1]) {
                    containingPairs++;
                    overlappingPairs++
                } else {
                    let highElf: number[]; let lowElf: number[];
                    (elfOne[1] >= elfTwo[1]) ? (highElf=elfOne, lowElf=elfTwo) : (highElf=elfTwo, lowElf=elfOne)

                    if (highElf[0] <= lowElf[0]) {
                        containingPairs++;
                    }

                    if (highElf[0] <= lowElf[0] || highElf[0] <= lowElf[1]) {
                        overlappingPairs++;
                    }
                }
            }
        }

        this.answerOne = `Containing pairs: ${containingPairs}`
        this.answerTwo = `Overlapping pairs: ${overlappingPairs}`
    }
}
