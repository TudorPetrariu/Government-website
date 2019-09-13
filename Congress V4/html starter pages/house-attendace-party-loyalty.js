const members = data.results[0].members

let democrats = []
let republicans = []
let independets = []


for (var i = 0; i < members.length; i++) {
    var all = members[i].party
    for (var key in all) {
        if (all.includes("R")) {
            republicans.push(all)
        } else if (all.includes("D")) {
            democrats.push(all)
        } else if (all.includes("I")) {
            independets.push(all)
        }
    }
}
console.log(republicans)
console.log(democrats)
console.log(independets)

// votes_with_party_pct

// allvotes = []
// for (var i = 0; i < members.length; i++) {
//     var allv = members[i].votes_with_party_pct
//     for (var key in allv) {
//         if (allv.includes(members[i].votes_with_party_pct)) {
//             allvotes.push(allv)
//         }
//     }
// }
// console.log(allvotes)
// gTable = document.getElementById("HouseGlance")
// gheader = document.createElement("thead")
// grow = document.createElement("th")

// cell1 = document.createElement("td");
// text1 = document.createTextNode("Party")
// cell1.appendChild(text1)
// grow.appendChild(cell1)

// cell2 = document.createElement("td");
// text2 = document.createTextNode("Number of Reps%")
// cell2.appendChild(text2)
// grow.appendChild(cell2)

// cell3 = document.createElement("td");
// text3 = document.createTextNode("Voted with Party")
// cell3.appendChild(text3)
// grow.appendChild(cell3)

// tblBody = document.createElement("tbody")
// tblBody.appendChild(grow)
// gTable.appendChild(tblBody)