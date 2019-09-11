const members = data.results[0].members


let statistics = [{
        Party: "Democrat",
        Number: 0,
        Voted: 0,
        Average: 0
    },
    {
        Party: "Republican",
        Number: 0,
        Voted: 0,
        Average: 0
    },
    {
        Party: "Independent",
        Number: 0,
        Voted: 0,
        Average: 0
    }
];





for (var i = 0; i < members.length; i++) {
    var allParty = members[i].party
    var pctVotes = members[i].votes_with_party_pct

    for (var key in allParty) {
        if (allParty.includes("D")) {
            statistics[0].Number++;
            statistics[0].Voted = Math.round(statistics[0].Voted + pctVotes);
            statistics[0].Average = Math.round(statistics[0].Voted / statistics[0].Number);
        } else if (allParty.includes("R")) {
            statistics[1].Number++;
            statistics[1].Voted = Math.round(statistics[1].Voted + pctVotes);
            statistics[1].Average = Math.round(statistics[1].Voted / statistics[1].Number);
        } else if (allParty.includes("I")) {
            statistics[2].Number++;
            statistics[2].Voted = Math.round(statistics[2].Voted + pctVotes);
            statistics[2].Average = Math.round(statistics[2].Voted / statistics[2].Number);
        }
    }
}


function generateTableHead(table, info) {

    let thead = table.createTHead();
    let row = thead.insertRow();
    for (key of info) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, info) {
    for (element of info) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key])
            cell.appendChild(text)
        }
    }
}
let table = document.getElementById("testTable");
let info = Object.keys(statistics[0])
generateTable(table, statistics)
generateTableHead(table, info)


/////////////////////////////////////////////////////

// let republicans = {
//     "name": "Republicans",
//     "number": 0,
//     "pct": 0,
//     "average": 0
// };
// let democrats = {
//     "name": "Democrats",

//     "number": 0,
//     "pct": 0,
//     "average": 0
// };
// let independents = {
//     "name": "Independents",
//     "number": 0,
//     "pct": 0,
//     "average": 0
// };




// for (var i = 0; i < members.length; i++) {
//     var allParty = members[i].party
//     var pctVotes = members[i].votes_with_party_pct

//     for (var key in allParty) {
//         if (allParty.includes("R")) {
//             republicans.number++;
//             republicans.pct = Math.round(republicans.pct + pctVotes);
//             republicans.average = Math.round(republicans.pct / republicans.number);
//         } else if (allParty.includes("D")) {
//             democrats.number++;
//             democrats.pct = Math.round(democrats.pct + pctVotes)
//             democrats.average = Math.round(democrats.pct / democrats.number);
//         } else if (allParty.includes("I")) {
//             independents.number++
//             independents.pct = Math.round(independents.pct + pctVotes);
//             independents.average = Math.round(independents.pct / independents.number);

//         }
//     }
// }

// console.log(republicans)
// console.log(democrats)
// console.log(independents)










// allVotes = []
// rvotes = []
// let sum = 0;
// for (let k = 0; k < members.length; k++) {
//     let votes = members[k].votes_with_party_pct;
//     allVotes.push(votes)
//     //console.log(allVotes[k])



//     for (k = 0; k < allVotes.length; k++) {
//         sum += allVotes[k]
//     }
// }
// console.log(sum)
// console.log(allVotes.length)