
$(document).ready(function(){

  var x ="",i;
                    
   for (i=1;i<=3;i++) {
     x+='<div class="left_msg"><p>I will call you later in the evening.is this ok?</p><span>6/27/2022</span> <span>11:04</span></div><div class="right_msg"><p>Sounds perfect.</p><span>6/27/2022</span> <span>11:04</span></div>';
    }
    document.querySelector(".demo").innerHTML = x;
    
   $('.all_icons').click(function(){
       $('.all_icons').removeClass("messenger_btn"); 
       $(this).addClass("messenger_btn");
   });
});