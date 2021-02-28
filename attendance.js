console.clear();
let studentDetails = new Map();
let studentsNameSet = new Set();
let buttons = document.querySelectorAll('[role="button"]');
let totalClassDuration = 0;
let StartTime = new Date().toLocaleTimeString();
startAttendanceTracker = setInterval(attendanceTracker,1000);
setTimeout(function(){console.clear();},1); 

let stop = STOP = function(){
    clearInterval(startAttendanceTracker);
    console.clear();
    console.log("----------------------------------------------");
    console.log("                  Report           ");
    console.log("----------------------------------------------");
    console.log("Attendance Tracking Started at  : "+StartTime);
    console.log("Attendance Tracking Stopped at  : "+new Date().toLocaleTimeString());
    console.log("Total Class Duration (rounded)  : "+Math.ceil(totalClassDuration/60)+" mins");
    console.log("----------------------------------------------");
    console.log("Students Who Attended More Than 65% Of The Class");
    console.log("----------------------------------------------");
    max = 0;
    let sortedtstudentsNameSet = [];
    let mapKeys = studentDetails.keys();
    for(i=0; i<studentDetails.size; i++){ 
        let studentName = mapKeys.next().value;
        sortedtstudentsNameSet.push(studentName);
        if(studentName.length > max) max = studentName.length;
    }
    sortedtstudentsNameSet.sort();
    studentWithLessThan65 = [];
    for(studentName of sortedtstudentsNameSet){
        space = " ";
        for(i=0; i<max-studentName.length; i++) space+=" ";
        let attendedPercentage = Math.ceil(((studentDetails.get(studentName)/60)/(totalClassDuration/60))*100);
        attendedPercentage >= 65 ? console.log(studentName.toUpperCase()+space+"("+attendedPercentage+"%)") : studentWithLessThan65.push(studentName);
    }
    console.log("");
    console.log("----------------------------------------------");
    console.log("Students Who Attended Less Than 65% Of The Class");
    console.log("----------------------------------------------");
    console.log(studentWithLessThan65.length==0 ? "N/A" : "");
    for(studentName of studentWithLessThan65){
        space = " ";
        for(i=0; i<max-studentName.length; i++) space+=" ";
        let attendedPercentage = Math.ceil(((studentDetails.get(studentName)/60)/(totalClassDuration/60))*100); 
        console.log(studentName.toUpperCase()+space+"("+attendedPercentage+"%)")
    }
    console.log("");
    return "Thank You For Using Meet Attendance Tracker"; 
}

function attendanceTracker(){
    buttons[1].click();
    let currentlyPresentStudents = document.getElementsByClassName("ZjFb7c");
    studentsNameSet.clear();
    for(i=0; i<currentlyPresentStudents.length; i++){
        studentsNameSet.add(currentlyPresentStudents[i].innerHTML);
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
    console.clear();
    console.log("Attendance is being tracked since : "+StartTime);
    console.log("type -> stop(); <- to stop tracking attendance");
    console.log("STUDENTS PRESENT IN CLASS (LIVE) : "+studentsNameSet.size);
    totalClassDuration+=1;
}
