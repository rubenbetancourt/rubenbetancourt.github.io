
$(document).ready(function() {

   // add items
   $(".input-button").click(function(){
   var userInput = $(".user-input").val()
   $("ul").append("<li>"+ userInput + "</li>")
   });

   // remove items seleted
   $('ul').on('click', 'li', function(event){
      $(this).remove();
   });

});

