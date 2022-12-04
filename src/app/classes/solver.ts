export class Solver {
    // #region 2021
    s2021_1(input: string) {
        const values = Array.from(input.split("\n"), Number)
        let timesUp = 0;
        let tripleTimesUp = 0;
        let previousUp = 0;

        for (let i = 1; i < values.length; i++) {
            if (values[i] > values[i-1]) {
                timesUp++;
            }

            if (i>=2) {
                const lastThree = values[i-2] + values[i-1] + values[i]
                if (previousUp && lastThree > previousUp) {
                    tripleTimesUp++;
                }
                previousUp = lastThree;
            }
        }

        return { one: `Times increased: ${timesUp}`, two: `Times increased: ${tripleTimesUp}`}
    }

    s2021_2(input: string) {
        const commands = input.split("\n");
        let x = 0;
        let y = 0;
        let a = 0;

        for (let command of commands) {
            command = command.replace("\r", "")
            const commandStart = command[0];
            const value = parseInt(command[command.length - 1])

            if (commandStart === "f") {
                x += value
                a += y * value;
            } else if (commandStart === "d") {
                y += value
            } else if (commandStart === "u") {
                y -= value
            }
        }

        const total = x * y;
        const totalAim = x * a

        return { one: `Total: ${total}`, two: `Aim: ${totalAim}`}
    }

    s2021_3(input: string) {
        const fileLength = input.split("\r").length
        const rowLength = input.split("\r")[0].length
        const bytes = input.split("\n");

        const zeroCount = Array(rowLength).fill(0);
        let gRate = "";
        let eRate = "";

        for (const byte of bytes) {
            for (let i = 0; i < byte.length; i++) {
                if (byte[i] === "0") {
                    zeroCount[i]++
                }
            }
        }

        for (const zeros of zeroCount) {
            gRate += (zeros >= fileLength / 2) ? "0" : "1"
            eRate += (zeros >= fileLength / 2) ? "1" : "0"
        }

        let rates = bytes;
        const getRate = function(value: string, index: number, type: string) {
            if (rates.length !==  1) {
                rates = rates.filter(x => x[index] === value)
                const zeros = rates.filter(x => x[index+1] === "0")
                const newBit = (type === "o") ? (zeros.length > rates.length / 2 ? "0" : "1") : (zeros.length > rates.length / 2 ? "1" : "0")
                return getRate(newBit, index += 1, type)
            } else {
                return rates[0];
            }
        }
        const oDecimal = parseInt(getRate(gRate[0], 0, "o"), 2)
        rates = bytes;
        const cDecimal = parseInt(getRate(eRate[0], 0, "c"), 2)
        
        const gDecimal = parseInt(gRate, 2)
        const eDecimal = parseInt(eRate, 2)

        const powerConsumption = gDecimal * eDecimal
        const lifeSupport = oDecimal * cDecimal

        return { one: `Power consumption: ${powerConsumption}`, two: `Life support rating: ${lifeSupport}` }
    }
    // #endregion

    // #region 2022
    s2022_1(input: string) {
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

        return { one: `Highest: ${highest}`, two: `Top three combined: ${topThree}`}
    }

    s2022_2(input: string) {
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

        return { one: `Total score 1: ${totalScoreOne}`, two: `Total score 2: ${totalScoreTwo}`}
    }

    s2022_3(input: string) {
        const priorities = [];
        const badgePriorites = [];

        const rucksacks = input.split("\n");
        for (let i = 0; i < rucksacks.length; i++) {
            const rucksackOne = rucksacks[i];
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
                const lettersRucksackTwo = Array.from(rucksacks[i-1]);
                const lettersRucksackThree = Array.from(rucksacks[i-2]);
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

        return { one: `Priority sum: ${prioritySum}`, two: `Badge priority sum: ${badgePrioritySum}`}
    }

    s2022_4(input: string) {
        let containingPairs = 0;
        let overlappingPairs = 0;
        
        const elves = input.split("\n").toString().split(",");
        for (let i = 0; i < elves.length; i++) {         
            if (i % 2 === 1) {
                const elfTwo = Array.from(elves[i].split("-"), Number)
                const elfOne = Array.from(elves[i-1].split("-"), Number)

                let highElf: number[]; 
                let lowElf: number[];
                (elfOne[1] >= elfTwo[1]) ? (highElf=elfOne, lowElf=elfTwo) : (highElf=elfTwo, lowElf=elfOne)
                
                if (highElf[0] <= lowElf[0] || highElf[1] <= lowElf[1]) {
                    containingPairs++;
                } 
                
                if (highElf[0] <= lowElf[1]) {
                    overlappingPairs++
                }
            }
        }

        return { one: `Containing pairs: ${containingPairs}`, two: `Overlapping pairs: ${overlappingPairs}`}
    }
    // #endregion
}