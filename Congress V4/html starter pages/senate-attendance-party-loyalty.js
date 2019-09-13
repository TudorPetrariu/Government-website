const members = data.results[0].members


let statistics = [{
        Party: "Democrat",
        Number: 0,
        Voted: 0,
        Average: 0,

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

let allMemberVotes = []
// allVotes = []
// let sum = 0;
// for (let k = 0; k < members.length; k++) {
//     let votes = members[k].votes_with_party_pct;
//     allVotes.push(votes)

//     for (k = 0; k < allVotes.length; k++) {
//         sum += allVotes[k]
//     }
// }
// console.log(sum)



for (var i = 0; i < members.length; i++) {

    var allParty = members[i].party
    var pctVotes = members[i].votes_with_party_pct

    if (allParty.includes("D")) {
        statistics[0].Number++;
        statistics[0].Voted = Math.round(statistics[0].Voted + pctVotes);
        statistics[0].Average = Math.round(statistics[0].Voted / statistics[0].Number);
        allMemberVotes.push(members[i])


    } else if (allParty.includes("R")) {
        statistics[1].Number++;
        statistics[1].Voted = Math.round(statistics[1].Voted + pctVotes);
        statistics[1].Average = Math.round(statistics[1].Voted / statistics[1].Number);
        allMemberVotes.push(members[i])
    } else if (allParty.includes("I")) {
        statistics[2].Number++;
        statistics[2].Voted = Math.round(statistics[2].Voted + pctVotes);
        statistics[2].Average = Math.round(statistics[2].Voted / statistics[2].Number);
        allMemberVotes.push(members[i])
    }
}




let mostMissedVotesMembers = allMemberVotes.sort((a, b) => parseFloat(b.missed_votes) - parseFloat(a.missed_votes));
//console.log(mostMissedVotesMembers)
let top10MostMissedVotes = mostMissedVotesMembers.slice(Math.round(0, mostMissedVotesMembers.length * 0.1));
console.log(top10MostMissedVotes)
let most10PercentMissed = mostMissedVotesMembers[Math.round(mostMissedVotesMembers.length * 0.1)].missed_votes;
// console.log(most10PercentMissed)
worstTop = []
for (j = 0; j < mostMissedVotesMembers.length; j++) {
    let mostVotes = mostMissedVotesMembers[j]
    if (mostVotes.missed_votes >= most10PercentMissed) {
        worstTop.push(mostVotes)
        top10MostMissedVotes = worstTop
    }
}

let leastMissedVotesMembers = allMemberVotes.sort((a, b) => parseFloat(a.missed_votes) - parseFloat(b.missed_votes));
//console.log(leastMissedVotesMembers)
let top10LeastMissedVotes = leastMissedVotesMembers.slice(Math.round(0, leastMissedVotesMembers.length * 0.1))
//console.log(top10LeastMissedVotes)
let least10PercentMissed = leastMissedVotesMembers[Math.round(leastMissedVotesMembers.length * 0.1)].missed_votes
//console.log(least10PercentMissed)
bestTop = []
for (i = 0; i < leastMissedVotesMembers.length; i++) {
    let leastVotes = leastMissedVotesMembers[i]

    if (leastVotes.missed_votes <= least10PercentMissed) {
        bestTop.push(leastVotes)
        top10LeastMissedVotes = bestTop
    }

}
//console.log(top10LeastMissedVotes)



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

function genTable(table, info) {
    for (element of info) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key])
            cell.appendChild(text)
        }
    }
}
let table = document.getElementById("GlanceTable");

let info = Object.keys(statistics[0])
genTable(table, statistics)
generateTableHead(table, info)



function generateTopTable(id, top) {

    var tbl = document.getElementById(id)
    var header = document.createElement("thead");
    var hRow = document.createElement("tr");

    var hCell1 = document.createElement("td");
    var hText1 = document.createTextNode("Name");
    hCell1.appendChild(hText1);
    hRow.appendChild(hCell1);

    var hCell2 = document.createElement("td");
    var hText2 = document.createTextNode("Number of Missed Votes");
    hCell2.appendChild(hText2);
    hRow.appendChild(hCell2);

    var hCell3 = document.createElement("td");
    var hText3 = document.createTextNode("% Missed");
    hCell3.appendChild(hText3);
    hRow.appendChild(hCell3);


    header.appendChild(hRow);
    tbl.appendChild(header);
    var tblBody = document.createElement("tbody");


    for (i = 0; i < top.length; i++) {
        var row = document.createElement("tr");


        row.insertCell().innerHTML = top[i].first_name + " " + top[i].last_name
        row.insertCell().innerHTML = top[i].missed_votes;
        row.insertCell().innerHTML = top[i].missed_votes_pct;

        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);


}

generateTopTable("least", top10MostMissedVotes)
generateTopTable("most", top10LeastMissedVotes)