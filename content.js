let studentDetails = new Map();
let studentsNameSet = new Set();
let ui_buttons;
let totalClassDuration = 0;
let StartTime = new Date().toLocaleTimeString();
let goingToStop = 0;
let isAttendanceWorking = false;
function start()
{
    startAttendanceTracker = setInterval(attendanceTracker,1000);
}
let stop = STOP = function(){
    clearInterval(startAttendanceTracker);
    let newWindow = window.open();
    newWindow.document.writeln("<style>");
    newWindow.document.writeln("table{ font-family: arial, sans-serif; border-collapse: collapse; width: 100%; }");
    newWindow.document.writeln("td,th{   border: 1px solid black;text-align: center;padding: 8px; }");
    newWindow.document.writeln("tr:nth-child(even) { background-color: #dddddd; }");
    newWindow.document.writeln("</style>");
    newWindow.document.writeln("<hr>");
    newWindow.document.writeln("<title>Google Meet Attendance Summary</title>");
    newWindow.document.writeln("<p style=text-align:center;font-size:25px;>Google Meet Attendance Tracking Report</p>");
    newWindow.document.writeln("<button style=float:right><a href=https://buymeacoffee.com/shaileshrkumar target=_blank style=text-decoration:none;> Like this extension ? Buy me a coffee !</a></button>");
    newWindow.document.writeln("<hr>");
    newWindow.document.writeln("<h3 style=margin-left:35%;>Attendance Tracking Started at &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;"+StartTime+"</h3>");
    newWindow.document.writeln("<h3 style=margin-left:35%;>Attendance Tracking Stopped at &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;"+new Date().toLocaleTimeString()+"</h3>");
    newWindow.document.writeln("<h3 style=margin-left:35%;>Total Number of People Attended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : &nbsp;&nbsp;&nbsp;"+((studentDetails.size))+"</h3>");
    newWindow.document.writeln("<h3 style=margin-left:35%;>Total Meeting Duration;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;"+toTimeFormat(totalClassDuration)+"</h3>");
    newWindow.document.writeln("<hr>");
    let sortedtstudentsNameSet = [];
    let mapKeys = studentDetails.keys();
    let PercentDuration_65 = Math.ceil((totalClassDuration*65)/100);
    let studentsLessThan_65 = 0,studentsMoreThan_65 = 0;
    for(i=0; i<studentDetails.size; i++){ 
        let studentName = mapKeys.next().value;
        sortedtstudentsNameSet.push(studentName);
        studentDetails.get(studentName) >= PercentDuration_65 ? studentsMoreThan_65++ : studentsLessThan_65++;
    }
    newWindow.document.write("<p style=margin-left:12px;font-size:18px;display:inline>"+"*Number Of People Attended More Than 65% of the Meeting : <b>"+(studentsMoreThan_65)+"</b></p>");
    newWindow.document.write("<p style=margin-left:377px;font-size:18px;color:red;display:inline>"+"*Number Of People Attended Less Than 65% of the Meeting : <b>"+studentsLessThan_65+"</b></p>");
    newWindow.document.writeln("<hr>");
    newWindow.document.writeln("<h2 style=text-align:center>Detailed Attendance Report</h2>");
    newWindow.document.writeln("<table>");
    newWindow.document.writeln("<tr>");
    newWindow.document.writeln("<th>SNo</th>");
    newWindow.document.writeln("<th>People Name</th>");
    newWindow.document.writeln("<th>Attended Duration</th>");
    newWindow.document.writeln("<th>Attended Percentage</th>");
    newWindow.document.writeln("</tr>");
    let serialNum = 1;
    sortedtstudentsNameSet.sort();
    for(studentName of sortedtstudentsNameSet){
        let attendedPercentage = Math.ceil(((studentDetails.get(studentName)/60)/(totalClassDuration/60))*100);
        let attendedDuration = toTimeFormat(studentDetails.get(studentName));
        newWindow.document.writeln("<tr>");
        newWindow.document.writeln(attendedPercentage<65 ? "<td style=color:red>"+serialNum+"</td>" : "<td>"+serialNum+"</td>");
        newWindow.document.writeln(attendedPercentage<65 ? "<td style=color:red>"+studentName.toUpperCase()+"</td>" : "<td>"+studentName.toUpperCase()+"</td>");
        newWindow.document.writeln(attendedPercentage<65 ? "<td style=color:red>"+attendedDuration+"</td>" : "<td>"+attendedDuration+"</td>");
        newWindow.document.writeln(attendedPercentage<65 ? "<td style=color:red>"+attendedPercentage+"%</td>" : "<td>"+attendedPercentage+"%</td>");
        newWindow.document.writeln("</tr>");
        serialNum++;
    }
    newWindow.document.writeln("</table>");
    if(sortedtstudentsNameSet.length==0){
        newWindow.document.writeln("<h3 style=text-align:center;>Oops ! Meeting Duration was too short</h3>");
        newWindow.document.writeln("<h3 style=text-align:center;>**No Data Available To Display**</h3>");
    }
    return "Thank You For Using Meet Attendance Tracker"; 
}
function attendanceTracker(){
    let currentlyPresentStudents = document.getElementsByClassName("ZjFb7c");
    studentsNameSet.clear();
    for(i=0; i<currentlyPresentStudents.length; i++){
        studentsNameSet.add(currentlyPresentStudents[i].innerHTML.toUpperCase());
    }
    for(studentName of studentsNameSet){
        if(studentDetails.has(studentName)){
            let currStatus = studentDetails.get(studentName);
            studentDetails.set(studentName,currStatus+1);
        }
        else{
            studentDetails.set(studentName,1);
        }
    }
    if(((studentsNameSet.size)-1) == -1) {
        goingToStop+=1;
     } else{
        newButton.innerHTML = "Tracking Started<br>"+toTimeFormat(totalClassDuration)+" Ago<br>"+"Click To Generate Report";
        totalClassDuration+=1;
        goingToStop=0;
     }
    if(goingToStop==2) {
        isAttendanceWorking=false;
        newButton.innerHTML = "Track Attendance";
        newButton.style.border = "2px solid #C5221F";
        goingToStop=0;
        stop();
    }
}
// Adding button to meet ui
let newButton = document.createElement("button");
newButton.id = "newButton";
newButton.className = "Jyj1Td CkXZgc";
newButton.innerHTML = "Track Attendance";
newButton.type = "button";
newButton.innerHTML = "Track Attendance";
newButton.style.border = "2px solid #C5221F";
newButton.style.backgroundColor = "white";
newButton.style.color = "black";
newButton.style.borderRadius = "2px";
newButton.style.padding = "auto auto auto auto";
newButton.style.height = "75px";
newButton.style.width = "250px";
let tryInsertingButton = setInterval(insertButton,1000);

function insertButton()
{
    try{
        let ui_buttons = document.querySelectorAll('[role="button"]');
        let closeButton = document.getElementsByClassName("VUk8eb");
        document.getElementsByClassName("jzP6rf")[0].appendChild(newButton);
        document.getElementById('newButton').addEventListener('click',function(){
            if(!isAttendanceWorking){
                isAttendanceWorking=true;
                newButton.innerHTML = "Click To<br>Generate Attendance Report";
                newButton.style.border = "2px solid #00796b";
                StartTime = new Date().toLocaleTimeString();
                studentDetails.clear();
                studentsNameSet.clear();
                totalClassDuration=0;
                ui_buttons[1].click();
                closeButton[0].style.visibility = "hidden";
                start();
            } else if(isAttendanceWorking){
                isAttendanceWorking=false;
                closeButton[0].style.visibility = "visible";
                newButton.innerHTML = "Track Attendance";
                newButton.style.border = "2px solid #C5221F";
                stop();
            }
        });
        clearInterval(tryInsertingButton);
    }catch(error){
    }
}
function toTimeFormat(time)
{
    hh = Math.floor(time/3600);
    time = time - (hh*3600);
    mm = Math.floor(time/60);
    time = time - (mm*60); 
    ss = time;
    if(hh==0)return mm+" min "+ss+"s";
    else return hh+" hr "+mm+" min "+ss+"s";
}
