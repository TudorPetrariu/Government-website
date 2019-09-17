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

for (i = 0; i < members.length; i++) {



    if (members[i].party.includes("D")) {
        statistics["Number of Democrats"]++
        statistics["%Voted w/ Party Democrats"] = Math.round((members[i].total_votes * (members[i].votes_with_party_pct / 100) / members[i].total_votes) * 100)
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
}
console.log(statistics)