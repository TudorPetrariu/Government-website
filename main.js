//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
// console.log(data.results[0].members)
const members = data.results[0].members
let links = members.url
let party = members.party





function generateTable(members) {

  var tbl = document.getElementById('table')
  tbl.innerHTML = "";
  var header = document.createElement("thead");
  var hRow = document.createElement("tr");

  var hCell1 = document.createElement("td");
  var hText1 = document.createTextNode("Name");
  hCell1.appendChild(hText1);
  hRow.appendChild(hCell1);

  var hCell2 = document.createElement("td");
  var hText2 = document.createTextNode("Party");
  hCell2.appendChild(hText2);
  hRow.appendChild(hCell2);

  var hCell3 = document.createElement("td");
  var hText3 = document.createTextNode("States");
  hCell3.appendChild(hText3);
  hRow.appendChild(hCell3);

  var hCell4 = document.createElement("td");
  var hText4 = document.createTextNode("Years in Office");
  hCell4.appendChild(hText4);
  hRow.appendChild(hCell4);

  var hCell5 = document.createElement("td");
  var hText5 = document.createTextNode("%Votes w/Party");
  hCell5.appendChild(hText5);
  hRow.appendChild(hCell5);

  header.appendChild(hRow);
  tbl.appendChild(header);
  var tblBody = document.createElement("tbody");


  for (i = 0; i < members.length; i++) {
    var row = document.createElement("tr");

    if (members[i].middle_name == null) {
      members[i].middle_name = ""
    }

    row.insertCell().innerHTML = (members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name).link(members[i].url)
    row.insertCell().innerHTML = members[i].party;
    row.insertCell().innerHTML = members[i].state;
    row.insertCell().innerHTML = members[i].seniority;
    row.insertCell().innerHTML = members[i].votes_with_party_pct;



    tblBody.appendChild(row);

  }

  tbl.appendChild(tblBody);




}



generateTable(members)



function filterMembers() {
  // let selectedValues = [...document.querySelectorAll('input:checked')].map(checkbox => checkbox.value);
  // console.log(selectedValues)
  let selected = [];
  var boxes = document.getElementsByTagName("INPUT");
  let select = document.getElementById("selectstate");
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    if (box.checked) {
      selected.push(box.value)
    }
  }
  //  let filteredMembers = members.filer(member => selected.includes(member.party))
  let filtered = [];
  for (let i = 0; i < members.length; i++) {
    if (selected.includes(members[i].party) && (members[i].state == select.value || select.value == "all")) {
      filtered.push(members[i])


    }

  }
  if (filtered.length > 0) {
    generateTable(filtered)
  } else {
    alert("select something")
  }

}



let allStates = []
let select = document.getElementById("selectstate");
for (let i = 0; i < members.length; i++) {
  let eachState = members[i].state;
  allStates.push(eachState)

}
var allUnique = allStates.filter((item, index) => allStates.indexOf(item) === index).sort()
for (i = 0; i < allUnique.length; i++) {
  let unique = allUnique[i]
  let options = document.createElement("option");
  options.innerHTML = unique;
  select.appendChild(options)
}



document.getElementById("Democrat").addEventListener("click", filterMembers);
document.getElementById("Republican").addEventListener("click", filterMembers);
document.getElementById("Individual").addEventListener("click", filterMembers);
document.getElementById("selectstate").addEventListener("change", filterMembers)