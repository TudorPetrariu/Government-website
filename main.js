//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
// console.log(data.results[0].members)
const members = data.results[0].members
let links= members.url


function generate_table(){
var body=document.getElementsByTagName("body")[0];
var tbl=document.createElement("table");
var header=document.createElement("thead");
var hRow=document.createElement("tr");

var hCell1=document.createElement("td");
var hText1=document.createTextNode("Name");
hCell1.appendChild(hText1);
hRow.appendChild(hCell1);

var hCell2=document.createElement("td");
var hText2=document.createTextNode("Party");
hCell2.appendChild(hText2);
hRow.appendChild(hCell2);

var hCell3=document.createElement("td");
var hText3=document.createTextNode("States");
hCell3.appendChild(hText3);
hRow.appendChild(hCell3);

var hCell4=document.createElement("td");
var hText4=document.createTextNode("Years in Office");
hCell4.appendChild(hText4);
hRow.appendChild(hCell4);

var hCell5=document.createElement("td");
var hText5=document.createTextNode("%Votes w/Party");
hCell5.appendChild(hText5);
hRow.appendChild(hCell5);

header.appendChild(hRow);
tbl.appendChild(header);
var tblBody=document.createElement("tbody");


for(i=0; i<members.length ; i++){
    var row=document.createElement("tr");
   if( members[i].middle_name == null){
    members[i].middle_name=""
   }
    row.insertCell().innerHTML = (members[i].first_name + " " +members[i].middle_name+" " + members[i].last_name).link(members[i].url)
    row.insertCell().innerHTML = members[i].party;
    row.insertCell().innerHTML = members[i].state;
    row.insertCell().innerHTML = members[i].seniority;
    row.insertCell().innerHTML = members[i].votes_with_party_pct;
  
  

    tblBody.appendChild(row);


}
tbl.appendChild(tblBody);
body.appendChild(tbl);

}
 generate_table()

