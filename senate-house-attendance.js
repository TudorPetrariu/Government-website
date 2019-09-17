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
        PartyVotesPercentage: 0


    },
    {
        Total: "Total",
        TotalNumber: 0,
        TotalPercentageVotes: 0


    },


];


let numberVotes = []
pureVootes = []
for (j = 0; j < members.length; j++) {
    let allNumberVotes = members[j].total_votes
    numberVotes.push(allNumberVotes)
    numberVotesSum = numberVotes.reduce((a, b) => a + b, 0)
    if (allNumberVotes !== null && allNumberVotes !== 0) {
        let pureVotes = Math.round(members[j].total_votes * (members[j].votes_with_party_pct / 100))


        pureVootes.push(pureVotes)
        sumPureVotes = pureVootes.reduce((a, b) => a + b, 0)
    }
}
let allMemberVotes = []
dSum = []
rSum = []
iSum = []
dVotes = []
rVotes = []
iVotes = []


for (let i = 0; i < members.length; i++) {

    let allParty = members[i].party
    separatedVotes = members[i].total_votes
    actualDvotes = 0
    actualRvotes = 0
    actualIvotes = 0

    let democratSum = Math.round(dSum.reduce((a, b) => a + b, 0))
    let republicanSum = Math.round(rSum.reduce((a, b) => a + b, 0))
    let independentSum = Math.round(iSum.reduce((a, b) => a + b, 0))

    sumDVotes = Math.round(dVotes.reduce((a, b) => a + b, 0))
    sumRVotes = Math.round(rVotes.reduce((a, b) => a + b, 0))
    sumIVotes = Math.round(iVotes.reduce((a, b) => a + b, 0))


    if (allParty.includes("D")) {
        statistics[0].Number++;
        allMemberVotes.push(members[i])
        dSum.push(separatedVotes)
        if (members[i].total_votes !== 0) {
            actualDvotes = Math.round(members[i].total_votes * (members[i].votes_with_party_pct / 100))
            dVotes.push(actualDvotes)
            statistics[0].PartyVotesPercentage = Math.round((sumDVotes / democratSum) * 100);
        }
    } else if (allParty.includes("R")) {
        statistics[1].Number++;
        allMemberVotes.push(members[i])
        rSum.push(separatedVotes)
        if (members[i].missed_votes !== null) {
            actualRvotes = Math.round(members[i].total_votes * (members[i].votes_with_party_pct / 100))
            rVotes.push(actualRvotes)

            statistics[1].PartyVotesPercentage = Math.round((sumRVotes / republicanSum) * 100);
        }


    } else if (allParty.includes("I")) {
        statistics[2].Number++;
        allMemberVotes.push(members[i])
        iSum.push(separatedVotes)

        actualIvotes = Math.round(members[i].total_votes * (members[i].votes_with_party_pct / 100))
        iVotes.push(actualIvotes)

        statistics[2].PartyVotesPercentage = Math.round((sumIVotes / independentSum) * 100);




    }
    statistics[3].TotalNumber = statistics[0].Number + statistics[1].Number + statistics[2].Number


    statistics[3].TotalPercentageVotes = Math.round((sumPureVotes / numberVotesSum) * 100)

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
    if (mostVotes.missed_votes >= most10PercentMissed && mostVotes.missed_votes !== null && mostVotes.missed_votes !== undefined) {
        worstTop.push(mostVotes)
    }
}

let leastMissedVotesMembers = allMemberVotes.sort((a, b) => parseFloat(a.missed_votes) - parseFloat(b.missed_votes));
let least10PercentMissed = leastMissedVotesMembers[Math.round(leastMissedVotesMembers.length * 0.1)].missed_votes


bestTop = []
for (i = 0; i < leastMissedVotesMembers.length; i++) {
    let leastVotes = leastMissedVotesMembers[i]
    if (leastVotes.missed_votes <= least10PercentMissed && leastVotes.missed_votes !== null) {
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



        row.insertCell().innerHTML = (top[i].first_name + " " + top[i].last_name).link(top[i].url)
        row.insertCell().innerHTML = top[i].missed_votes;
        row.insertCell().innerHTML = top[i].missed_votes_pct;

        tblBody.appendChild(row);

    }

    tbl.appendChild(tblBody);


}

generateTopTable("least", worstTop)
generateTopTable("most", bestTop)