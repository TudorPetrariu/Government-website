const members = data.results[0].members


let statistics = [{
        Party: "Democrat",
        Number: 0,
        PartyVotesPercentage: 0

    },
    {
        Party: "Republican",
        Number: 0,
        PartyVotesPercentage: 0

    },
    {
        Party: "Independent",
        Number: 0,
        PartyVotesPercentage: 0,


    },
    {
        Total: "Total",
        TotalNumber: 0,
        TotalPercentageVotes: 0,


    },


];
// let statistics = {
//     "Number of Democrats": 204,
//     "Number of Republicans": 252,
//     "Number of Independents": 0,
//     "Total": 0,
//     "%Voted w/ Party Democrats": 0,
//     "%Voted w/ Party Republicans": 0,
//     "%Voted w/ Party Independents": 0,
//     "%Voted w/ Party Total": 0,
//     "Least Engaged Loyal": [],
//     "Most Engaged Loyal": [],
//     "Least Engaged Attendance": [],
//     "Most Engaged Attendance": []
// }

let allMemberVotes = []
dSum = []
rSum = []
iSum = []
let numberVotes = []



for (var i = 0; i < members.length; i++) {
    let allNumberVotes = members[i].total_votes

    numberVotes.push(allNumberVotes)
    numberVotesSum = numberVotes.reduce((a, b) => a + b, 0)
    console.log(numberVotesSum)

    var allParty = members[i].party
    var pctVotes = members[i].votes_with_party_pct

    let democratSum = Math.round(dSum.reduce((a, b) => a + b, 0))
    let republicanSum = Math.round(rSum.reduce((a, b) => a + b, 0))
    let independentSum = Math.round(iSum.reduce((a, b) => a + b, 0))

    statistics[3].TotalPercentageVotes = (statistics[0].Number * 0.88) + (statistics[1].Number * 0.94) + (statistics[2].Number * 0.43)
    if (allParty.includes("D")) {
        statistics[0].Number++;
        allMemberVotes.push(members[i])
        dSum.push(pctVotes)
        statistics[0].PartyVotesPercentage = Math.round(democratSum / statistics[0].Number);

    } else if (allParty.includes("R")) {
        statistics[1].Number++;
        allMemberVotes.push(members[i])
        rSum.push(pctVotes)
        statistics[1].PartyVotesPercentage = Math.round(republicanSum / statistics[1].Number);



    } else if (allParty.includes("I")) {
        statistics[2].Number++;
        allMemberVotes.push(members[i])
        iSum.push(pctVotes)
        statistics[2].PartyVotesPercentage = Math.round(independentSum / statistics[2].Number);




    }


    statistics[3].TotalNumber = statistics[0].Number + statistics[1].Number + statistics[2].Number

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







let mostMissedVotesMembers = allMemberVotes.sort((a, b) => parseFloat(b.missed_votes) - parseFloat(a.missed_votes));
let most10PercentMissed = mostMissedVotesMembers[Math.round(mostMissedVotesMembers.length * 0.1)].missed_votes;

worstTop = []
for (j = 0; j < mostMissedVotesMembers.length; j++) {
    let mostVotes = mostMissedVotesMembers[j]
    if (mostVotes.missed_votes >= most10PercentMissed) {
        worstTop.push(mostVotes)
    }
}

let leastMissedVotesMembers = allMemberVotes.sort((a, b) => parseFloat(a.missed_votes) - parseFloat(b.missed_votes));
let least10PercentMissed = leastMissedVotesMembers[Math.round(leastMissedVotesMembers.length * 0.1)].missed_votes

bestTop = []
for (i = 0; i < leastMissedVotesMembers.length; i++) {
    let leastVotes = leastMissedVotesMembers[i]
    if (leastVotes.missed_votes <= least10PercentMissed) {
        bestTop.push(leastVotes)

    }

}


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

generateTopTable("least", worstTop)
generateTopTable("most", bestTop)