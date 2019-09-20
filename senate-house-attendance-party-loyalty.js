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


for (let i = 0; i < members.length; i++) {

    let republicansAllVotesSum = 0
    let republicanPureVotesSum = 0

    let democratsAllVotesSum = 0
    let democratsPureVotesSum = 0

    let independentsAllVotesSum = 0
    let independentsPureVotesSum = 0

    if (members[i].party == "D") {
        statistics[0].Number++;
        allMemberVotes.push(members[i])
        democratsAllVotesSum += members[i].total_votes
        if (members[i].total_votes !== 0) {
            democratsPureVotesSum += democratsAllVotesSum * (members[i].votes_with_party_pct / 100)

        }
        statistics[0].PartyVotesPercentage = Math.round((democratsPureVotesSum / democratsAllVotesSum) * 100)

    }
    if (members[i].party == "R") {
        statistics[1].Number++;
        allMemberVotes.push(members[i])
        republicansAllVotesSum += members[i].total_votes
        if (members[i].missed_votes !== null) {
            republicanPureVotesSum += republicansAllVotesSum * (members[i].votes_with_party_pct / 100)
            statistics[1].PartyVotesPercentage = Math.round((republicanPureVotesSum / republicansAllVotesSum) * 100);
        }

    } else if (members[i].party == "I") {
        statistics[2].Number++;
        allMemberVotes.push(members[i])
        independentsAllVotesSum += members[i].total_votes
        independentsPureVotesSum = independentsAllVotesSum * (members[i].votes_with_party_pct / 100)
        statistics[2].PartyVotesPercentage = Math.round((independentsPureVotesSum / independentsAllVotesSum) * 100);




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



let leastLoyal = members.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
let leastLoyalTop10Percent = leastLoyal[Math.round(leastLoyal.length * 0.1)].votes_with_party_pct
leastLoyalTop = []
for (i = 0; i < leastLoyal.length; i++) {
    if (leastLoyal[i].votes_with_party_pct <= leastLoyalTop10Percent) {
        leastLoyalTop.push(leastLoyal[i])
    }
}

let mostLoyal = members.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct);
let mostLoyalTop10Percent = mostLoyal[Math.round(mostLoyal.length * 0.1)].votes_with_party_pct
mostLoyalTop = []
for (i = 0; i < mostLoyal.length; i++) {
    if (mostLoyal[i].votes_with_party_pct >= mostLoyalTop10Percent) {
        mostLoyalTop.push(mostLoyal[i])
    }

}




let mostMissedVotesMembers = allMemberVotes.sort((a, b) => parseFloat(b.missed_votes) - parseFloat(a.missed_votes));
let most10PercentMissed = mostMissedVotesMembers[Math.round(mostMissedVotesMembers.length * 0.1)].missed_votes;
leastEngagedTop = []
for (j = 0; j < mostMissedVotesMembers.length; j++) {
    let mostVotes = mostMissedVotesMembers[j]
    if (mostVotes.missed_votes >= most10PercentMissed && mostVotes.missed_votes !== null && mostVotes.missed_votes !== undefined) {
        leastEngagedTop.push(mostVotes)
    }
}

let leastMissedVotesMembers = allMemberVotes.sort((a, b) => parseFloat(a.missed_votes) - parseFloat(b.missed_votes));
let least10PercentMissed = leastMissedVotesMembers[Math.round(leastMissedVotesMembers.length * 0.1)].missed_votes


mostEngagedTop = []
for (i = 0; i < leastMissedVotesMembers.length; i++) {
    let leastVotes = leastMissedVotesMembers[i]
    if (leastVotes.missed_votes <= least10PercentMissed && leastVotes.missed_votes !== null) {
        mostEngagedTop.push(leastVotes)

    }

}



function generateTopTable(id, top) {

    let tbl = document.getElementById(id)

    // let header = document.createElement("thead");
    // let hRow = document.createElement("tr");

    // let hCell1 = document.createElement("td");
    // let hText1 = document.createTextNode("Name");
    // hCell1.appendChild(hText1);
    // hRow.appendChild(hCell1);

    // let hCell2 = document.createElement("td");
    // let hText2 = document.createTextNode("Number of Missed Votes");
    // hCell2.appendChild(hText2);
    // hRow.appendChild(hCell2);

    // let hCell3 = document.createElement("td");
    // let hText3 = document.createTextNode("Party Votes %");
    // hCell3.appendChild(hText3);
    // hRow.appendChild(hCell3);


    // header.appendChild(hRow);
    // tbl.appendChild(header);
    let tblBody = document.createElement("tbody");


    for (i = 0; i < top.length; i++) {
        let row = document.createElement("tr");
        if (top == mostEngagedTop || top == leastEngagedTop) {
            row.insertCell().innerHTML = (top[i].first_name + " " + top[i].last_name).link(top[i].url)
            row.insertCell().innerHTML = top[i].missed_votes;
            row.insertCell().innerHTML = top[i].missed_votes_pct;

        } else if (top == mostLoyalTop || top == leastLoyalTop) {


            row.insertCell().innerHTML = (top[i].first_name + " " + top[i].last_name).link(top[i].url)
            row.insertCell().innerHTML = top[i].total_votes;
            row.insertCell().innerHTML = top[i].votes_with_party_pct;

        }
        tblBody.appendChild(row);

    }

    tbl.appendChild(tblBody);
}

if (location.pathname == "/html%20starter%20pages/senate-attendance-starter-page.html" || location.pathname == "/html%20starter%20pages/house-attendance-starter-page.html") {

    generateTopTable("mostEngaged", mostEngagedTop)
    generateTopTable("leastEngaged", leastEngagedTop)

}

if (location.pathname == "/html%20starter%20pages/senate-party-loyalty-starter-page.html" || location.pathname == "/html%20starter%20pages/house-party-loyalty-starter-page.html") {

    generateTopTable("leastLoyal", leastLoyalTop)
    generateTopTable("mostLoyal", mostLoyalTop)

}