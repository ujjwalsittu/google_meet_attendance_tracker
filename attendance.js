console.clear();
let studentDetails = new Map();
let studentsNameSet = new Set();
let StartTime = new Date().toLocaleTimeString();
startAttendanceTracker = setInterval(attendanceTracker,1000);
setTimeout(function(){console.clear();},1); 
document.addEventListener("keydown",function(event){
    if(event.code==("KeyE")) {
        clearInterval(startAttendanceTracker);
        console.clear();
        console.log("-------------------------------------------");
        console.log("                  Report           ");
        console.log("-------------------------------------------");
        console.log("Attendance Tracking Started at  : "+StartTime);
        console.log("Attendance Tracking Stopped at  : "+new Date().toLocaleTimeString());
        console.log("-------------------------------------------");
        console.log("Student Name       |      Total Time attended");
        console.log("");
        for(studentName of studentsNameSet){
            console.log(studentName+"               "+studentDetails.get(studentName)+" mins");
        }
    }
});
function attendanceTracker(){
    let currentlyPresentStudents = document.getElementsByClassName("ZjFb7c");
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
    console.log("Click{ E }outside the console window to stop tracking attendance");
    console.log("CURRENT STUDENTS STRENGTH (LIVE) : "+studentDetails.size);
}
