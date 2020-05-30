$( document ).ready(function() {
	showResult()
	function showResult(){

		var parrafo= $(".hidden-msg").find("label")
		var texto=$(".hidden-msg").find("label").text();
		var clase="";
		
    	console.log(texto)
		if (texto!=""){
			if (parrafo.attr('id')=="just-ok") {
				clase="success-msg";
			}else if(parrafo.attr('id')=="just-ko"){
				clase="error-msg";
			}
			$("body").prepend('<div class="'+clase+'"> <label>'+ texto +'</label> </div>')
		}
	}
$('.central-div').on('click', ':button', function(){
  event.preventDefault();
  var idClickEl=$(this).attr('id');
    

  if (idClickEl=="busca") {
  	buscar();
  }else{
  	if (idClickEl=="crea") {
  	$("#menuAction").val("crea");
  	}
  	else if (idClickEl=="enviarBusqueda") {
  	$("#menuAction").val("busca");
  	}
  	else if (idClickEl=="llistat") {
  	$("#menuAction").val("llista");
  	}
  	setTimeout(function(){$("#menu").submit()},1000);

  }
  
  
  //crear()
});

function buscar(){
	


  $("<input type='text' class='form__field' class='form__label' name='search'></input><button id='enviarBusqueda'>Buscar!</button>").insertAfter("#busca");
  $("<p>Tipo de Busqueda:</p><input checked='checked' type='radio' id='id' name='searchBy' value='_id'><label class='searchRadio'  for='ID'>ID</label><input type='radio' id='name' name='searchBy' value='name'><label class='searchRadio' for='Name'>Nombre</label> </br>").insertBefore("#enviarBusqueda");
  setTimeout(function(){
		//$("#menu").submit()
	},1000)
}

	randomBackground()
	function randomBackground(){
		var num= Math.floor((Math.random() * 10) + 1);
		var urlimage= "http://localhost:5000/img/background/back"+num+".jpg"

		$("body").css("background-image", "url("+urlimage+")");
}


});
