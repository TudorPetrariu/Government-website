// const members = data.results[0].members




let members = [];

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

let table = document.getElementById("GlanceTable");




if (location.pathname == "/html%20starter%20pages/senate-attendance-starter-page.html" || location.pathname == "/html%20starter%20pages/senate-party-loyalty-starter-page.html") {
    url = "https://api.propublica.org/congress/v1/113/senate/members.json";
    fetchData(url)


}

if (location.pathname == "/html%20starter%20pages/house-attendance-starter-page.html" || location.pathname == "/html%20starter%20pages/house-party-loyalty-starter-page.html") {
    url = "https://api.propublica.org/congress/v1/113/house/members.json";
    fetchData(url)


}


async function fetchData(url) {
    let key = "QnkcksP0Rnbsidg1ytUXGMMj9ocWwHHQUaxhBblS"
    document.body.className = "loading"

    members = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "X-API-KEY": key
            })
        })
        .then(response => response.json())
        .then(data => data.results[0].members)
        .catch(err => console.error(err))
    document.body.className = "";


    console.log(members);
    fillStatistics();
    let info = Object.keys(statistics[0])
    genTable(table, statistics)
    generateTableHead(table, info)
    loyality();

}

function generateTopTable(id, top) {

    let tbl = document.getElementById(id)
    let tblBody = document.createElement("tbody");


    for (i = 0; i < top.length; i++) {
        let row = document.createElement("tr");
        if (top == mostEngagedTop || top == leastEngagedTop) {
            row.insertCell().innerHTML = (top[i].first_name + " " + top[i].last_name).link(top[i].url)
            row.insertCell().innerHTML = top[i].missed_votes;
            row.insertCell().innerHTML = top[i].missed_votes_pct;

        }
        if (top == mostLoyalTop || top == leastLoyalTop) {


            row.insertCell().innerHTML = (top[i].first_name + " " + top[i].last_name).link(top[i].url)
            row.insertCell().innerHTML = top[i].total_votes;
            row.insertCell().innerHTML = top[i].votes_with_party_pct;

        }
        tblBody.appendChild(row);

    }

    tbl.appendChild(tblBody);
}

function fillStatistics() {

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




    for (let i = 0; i < members.length; i++) {

        let republicansAllVotesSum = 0
        let republicanPureVotesSum = 0

        let democratsAllVotesSum = 0
        let democratsPureVotesSum = 0

        let independentsAllVotesSum = 0
        let independentsPureVotesSum = 0

        if (members[i].party == "D") {
            statistics[0].Number++;
            democratsAllVotesSum += members[i].total_votes
            if (members[i].total_votes !== 0) {
                democratsPureVotesSum += democratsAllVotesSum * (members[i].votes_with_party_pct / 100)

            }
            statistics[0].PartyVotesPercentage = Math.round((democratsPureVotesSum / democratsAllVotesSum) * 100)

        }
        if (members[i].party == "R") {
            statistics[1].Number++;
            republicansAllVotesSum += members[i].total_votes
            if (members[i].missed_votes !== null) {
                republicanPureVotesSum += republicansAllVotesSum * (members[i].votes_with_party_pct / 100)
                statistics[1].PartyVotesPercentage = Math.round((republicanPureVotesSum / republicansAllVotesSum) * 100);
            }

        } else if (members[i].party == "I") {
            statistics[2].Number++;
            independentsAllVotesSum += members[i].total_votes
            independentsPureVotesSum = independentsAllVotesSum * (members[i].votes_with_party_pct / 100)
            statistics[2].PartyVotesPercentage = Math.round((independentsPureVotesSum / independentsAllVotesSum) * 100);




        }
        statistics[3].TotalNumber = statistics[0].Number + statistics[1].Number + statistics[2].Number


        statistics[3].TotalPercentageVotes = Math.round((sumPureVotes / numberVotesSum) * 100)

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


function loyality() {

    let leastLoyal = members.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
    let leastLoyalTop10Percent = leastLoyal[Math.round(leastLoyal.length * 0.1)].votes_with_party_pct
    leastLoyalTop = []
    for (i = 0; i < leastLoyal.length; i++) {
        if (leastLoyal[i].votes_with_party_pct <= leastLoyalTop10Percent && leastLoyal[i].missed_votes !== 0) {
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


    let mostMissedVotesMembers = members.sort((a, b) => b.missed_votes - a.missed_votes);

    let most10PercentMissed = mostMissedVotesMembers[Math.round(mostMissedVotesMembers.length * 0.1)].missed_votes;
    leastEngagedTop = []
    for (j = 0; j < mostMissedVotesMembers.length; j++) {
        if (mostMissedVotesMembers[j].missed_votes >= most10PercentMissed) {
            leastEngagedTop.push(mostMissedVotesMembers[j])
        }
    }

    let leastMissedVotesMembers = members.sort((a, b) => a.missed_votes - b.missed_votes);
    let least10PercentMissed = leastMissedVotesMembers[Math.round(leastMissedVotesMembers.length * 0.1)].missed_votes


    mostEngagedTop = []
    for (i = 0; i < leastMissedVotesMembers.length; i++) {
        if (leastMissedVotesMembers[i].missed_votes <= least10PercentMissed && leastMissedVotesMembers[i].missed_votes !== null) {
            mostEngagedTop.push(leastMissedVotesMembers[i])

        }

    }


    if (location.pathname == "/html%20starter%20pages/house-attendance-starter-page.html" || location.pathname == "/html%20starter%20pages/senate-attendance-starter-page.html") {

        generateTopTable("mostEngaged", mostEngagedTop)
        generateTopTable("leastEngaged", leastEngagedTop)

    }

    if (location.pathname == "/html%20starter%20pages/house-party-loyalty-starter-page.html" || location.pathname == "/html%20starter%20pages/senate-party-loyalty-starter-page.html") {


        generateTopTable("leastLoyal", leastLoyalTop)
        generateTopTable("mostLoyal", mostLoyalTop)

    }



}