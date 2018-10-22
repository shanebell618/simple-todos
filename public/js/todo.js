//Slide the list down when the page loads
$(document).ready(function(){
    $('.hidden').slideDown(1000);
});

//Check off specific todos by clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//rotate plus sign and show the input
$(".fa-plus").click(function(){
	$(this).toggleClass("rotated");
	$("input[type='text'").fadeToggle();
});

