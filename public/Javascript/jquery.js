$( document ).ready(function() {
	showResult()
	function showResult(){
		console.log("doing")
		var parrafo= $("hidden-msg").find("p")
		var texto=$("hidden-msg").find("p").text();
		var clase="";
		if (texto!=""){
			if (parrafo.id=="just-ok") {
				clase="success-msg";
			}else{
				clase="error-msg"
			}
			$("body").append('<div class="'+clase+'"> <p>'+ texto +'</p> </div>')
		}
	}

	$("#map-canvas").ready(function(){
		setTimeout(function(){
			$(".dismissButton").click()
		},2000)
	})

	randomBackground()
	function randomBackground(){
		var num= Math.floor((Math.random() * 10) + 1);
		var urlimage= "http://localhost:5000/img/background/back"+num+".jpg"

		$("body").css("background-image", "url("+urlimage+")");
	}

	$(document).on('click','.div-category span',function(e){
		var text = $("#hidden-category").val();

		if (text.includes(","+ $(this).text())) {
			text = text.replace(',"'+ $(this).text()+'"', '');

		}else{
			text = text.replace('"'+$(this).text()+'",', '');
		}
		$("#hidden-category").val(text)


		$(e.target).remove();
		//replace("lollypops", "marshmellows");

	})

    $("#actualizar").unbind("click").click(function(){
	    event.preventDefault();
		var categoria= $("#category").val();
		var texto=$("#hidden-category").val();
		if (texto=="") {
			$("#hidden-category").val('"'+categoria+'"');
		}else{
			$("#hidden-category").val(texto+","+'"'+categoria+'"');

		}
		var element= "<span class='badge'>" +categoria+"</span>  "
		$(".div-category").append(element);
		var categoria= $("#category").val("");
		$('.div-category').children('span').last().css("background-color", getRandomColor())



});


var marker, lat, lng;
function initialize() {
    var myLatLng = new google.maps.LatLng( 41.5, 2 ),
        myOptions = {
            zoom: 4,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            },
        map = new google.maps.Map( document.getElementById( 'map-canvas' ), myOptions );
        marker = new google.maps.Marker( {position: myLatLng, map: map, draggable: true} );
        google.maps.event.addListener(marker, 'dragend', update);

    marker.setMap( map );
}

function update() {
	var path = marker.getPosition();
  lat = path.lat();
  lng = path.lng();
	$("#lat").text(lat)
	$("#lon").text(lng)
	var value='"lat":"'+lat+'","lon":"'+lng+'"';
	$("#hidden-coordinates").val(value)
}

initialize();


function getRandomColor() {
  color = 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)'
  return color ;

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

	var newCategories = "["+ $("#hidden-category").val() + "]"
	$("#hidden-coordinates").val("{"+ $("#hidden-coordinates").val() + "}")
	//console.log(newCategories)
	var newschedule = "["+ $("#hidden-schedule").val() + "]"
	$("#hidden-category").val(newCategories)
	$("#hidden-schedule").val(newschedule)
		//console.log($("#hidden-schedule").val())

	setTimeout(function(){
		$("#restaurante").submit()
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
