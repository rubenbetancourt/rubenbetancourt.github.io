

$(document).ready(function() {
 
     //default setting
     $("#header_body2 .progress  dd").text(' percentCorrect: 0 %' );
 
     $(".reset").click(function(){
        location.reload();  //Reloads to reset buttons, do on new test
     });

     //Process a Test - score test
     $("#q_continue").click(function(e){ 

         e.preventDefault() 	
         submitForm(); 

     });              
});

 var answers = {
  question1:"1",
  question2:"2",
  question3:"1",
  question4:"1",
  question5:"1"
 }

q1 = undefined;
q2 = undefined;
q3 = undefined;
q4 = undefined;
q5 = undefined;

totalCorrect = 0;
percentCorrect = 0;


function findSelection(field) {
    var test = document.getElementsByName(field);
    var sizes = test.length;
    //alert(sizes);
    for (i=0; i < sizes; i++) {
        if (test[i].checked==true) {
            //alert(test[i].value + ' you got a value');     
            return test[i].value;
        }
    }
}

function submitForm() {

    q1 =  findSelection("q_0_a");
    q2 =  findSelection("q_1_a");
    q3 =  findSelection("q_2_a");
    q4 =  findSelection("q_3_a");
    q5 =  findSelection("q_4_a");
    
    scoreReply(); 

    return false;
}

function scoreReply() {
    
    if (q1 == answers.question1 ){ totalCorrect += 1; }
    if (q2 == answers.question2 ){ totalCorrect += 1; }
    if (q3 == answers.question3 ){ totalCorrect += 1; }
    if (q4 == answers.question4 ){ totalCorrect += 1; }
    if (q5 == answers.question5 ){ totalCorrect += 1; }

    if (totalCorrect > 0) {
    	percentCorrect = (totalCorrect / 5) * 100;
    }
   
    $("#header_body2 .progress dd").text('percentCorrect: ' +  percentCorrect + '%  Total Correct: '  + totalCorrect );

 }  

//});