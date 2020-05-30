$( document ).ready(function() {
	
	randomBackground()
	function randomBackground(){
		var num= Math.floor((Math.random() * 10) + 1);
		var urlimage= "http://localhost:5000/img/background/back"+num+".jpg"

		$("body").css("background-image", "url("+urlimage+")");
	}

	
   


$('.time-input').keypress(function(event) {
										if ( (event.which < 48 || event.which > 57)) {
												event.preventDefault();
										}
								}).on('paste', function(event) {
										event.preventDefault();
								});

					var requiredText = ':';
$('.time-input').on('input',function() {
	console.log("Writing...")
		if (String($(this).val()).indexOf(requiredText) == -1) {
				$(this).val(requiredText);
		}
});
function getValueOfSchedule(){
	$('.day').each(function(i, obj) {
		var dia= "";
		var id=$(this).attr('id');
		if ($(this).find(".check").prop("checked") == true) {
			var open="closed";
			var close="closed";
		}else{
			var open=$(this).find(".open").next().val();
			var close=$(this).find(".close").next().val();
	}
		if(id==1){
			dia= '{"diaSetmana":'+id+',"horaIni":"'+open+'","horaFi":"'+close+'"}'

		}else{
			dia= ',{"diaSetmana":'+id+',"horaIni":"'+open+'","horaFi":"'+close+'"}'

		}
		$("#hidden-schedule").val($("#hidden-schedule").val()+dia);
});
}
$(".form__button").on("click", function(e){
	event.preventDefault()
	getValueOfSchedule();

	
	var newschedule = "["+ $("#hidden-schedule").val() + "]"
	$("#hidden-schedule").val(newschedule);
	console.log("cacaca")
	setTimeout(function(){
		$("#horarioNuevo").submit()
	},1000)




})


$('input[type="checkbox"]').click(function(){
            if($(this).prop("checked") == true){
                $(this).parent().find(".time-input").prop("disabled", true);
            }
            else if($(this).prop("checked") == false){
								$(this).parent().find(".time-input").prop("disabled", false);
							}
        });



});
