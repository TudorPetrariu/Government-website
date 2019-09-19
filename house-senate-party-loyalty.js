const members = data.results[0].members

let statistics = {
    "Number of Democrats": 0,
    "Number of Republicans": 0,
    "Number of Independents": 0,
    "Total": 0,
    "%Voted w/ Party Democrats": 0,
    "%Voted w/ Party Republicans": 0,
    "%Voted w/ Party Independents": 0,
    "%Voted w/ Party Total": 0,
    "Least Engaged Loyal": [],
    "Most Engaged Loyal": [],
    "Least Engaged Attendance": [],
    "Most Engaged Attendance": []
}
totalVotes = []
totalPureVotes = []

dTotalVotes = []

for (i = 0; i < members.length; i++) {

    totalVotesSum = totalVotes.reduce((a, b) => a + b, 0)
    totalPureVotesSum = Math.round(totalPureVotes.reduce((a, b) => a + b, 0))

    dTotalVotesSum = dTotalVotes.reduce((a, b) => a + b, 0)

    if (members[i].party.includes("D")) {
        statistics["Number of Democrats"]++
        statistics["%Voted w/ Party Democrats"] = Math.round((members[i].total_votes * (members[i].votes_with_party_pct / 100) / members[i].total_votes) * 100)
        dTotalVotes.push(members[i].total_votes)
        dPureVotes = dTotalVotesSum * (members[i].votes_with_party_pct / 100)
    }
    if (members[i].party.includes("R")) {
        statistics["Number of Republicans"]++
        statistics["%Voted w/ Party Republicans"] = Math.round((members[i].total_votes * (members[i].votes_with_party_pct / 100) / members[i].total_votes) * 100)

    }
    if (members[i].party.includes("I")) {
        statistics["Number of Independents"]++
        statistics["%Voted w/ Party Independents"] = Math.round((members[i].total_votes * (members[i].votes_with_party_pct / 100) / members[i].total_votes) * 100)

    }


    statistics["Total"] = statistics["Number of Democrats"] + statistics["Number of Republicans"] + statistics["Number of Independents"]
    statistics["%Voted w/ Party Total"] = Math.round((totalPureVotesSum / totalVotesSum) * 100)
    // statistics["%Voted w/ Party Total"] = [members[i].total_votes * (members[i].votes_with_party_pct / 100) / members[i].total_votes] * 100

    totalVotes.push(members[i].total_votes)
    totalPureVotes.push(members[i].total_votes * (members[i].votes_with_party_pct / 100))

}

// console.log(dTotalVotes)
// console.log(statistics["%Voted w/ Party Democrats"])
// console.log(statistics["%Voted w/ Party Republicans"])
// console.log(statistics["%Voted w/ Party Independents"])
// console.log(statistics["%Voted w/ Party Total"])


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
    moostLoyal = mostLoyal[i]
    if (moostLoyal.votes_with_party_pct >= mostLoyalTop10Percent) {
        mostLoyalTop.push(moostLoyal)
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
    var hText2 = document.createTextNode("Number of Party Votes");
    hCell2.appendChild(hText2);
    hRow.appendChild(hCell2);

    var hCell3 = document.createElement("td");
    var hText3 = document.createTextNode("% Party Votes");
    hCell3.appendChild(hText3);
    hRow.appendChild(hCell3);


    header.appendChild(hRow);
    tbl.appendChild(header);
    var tblBody = document.createElement("tbody");


    for (i = 0; i < top.length; i++) {
        var row = document.createElement("tr");



        row.insertCell().innerHTML = (top[i].first_name + " " + top[i].last_name).link(top[i].url)
        row.insertCell().innerHTML = Math.round(top[i].total_votes * (top[i].votes_with_party_pct / 100))
        row.insertCell().innerHTML = top[i].votes_with_party_pct;

        tblBody.appendChild(row);

    }

    tbl.appendChild(tblBody);


}

generateTopTable("leastLoyal", leastLoyalTop)
generateTopTable("mostLoyal", mostLoyalTop)