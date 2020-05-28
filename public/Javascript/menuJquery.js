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
			}else{
				clase="error-msg"
			}
			$("body").prepend('<div class="'+clase+'"> <label>'+ texto +'</label> </div>')
		}
	}
$(":button").click(function(){
  event.preventDefault();
  var idClickEl=$(this).attr('id');
  if (idClickEl=="busca") {
  	buscar();
  }
  else if (idClickEl=="crea") {}{
  	$("#menuAction").value("crea");
  	setTimeout(function(){$("#menu").submit()},1000);
  }
  else if (idClickEl=="enviarBusqueda") {}{
  	$("#menuAction").value("busca");
  	setTimeout(function(){$("#menu").submit()},1000);
  }
  else if (idClickEl=="llistat") {}{
  	$("#menuAction").value("llista");
  	setTimeout(function(){$("#menu").submit()},1000);
  }
  
  //crear()
})

function buscar(){
  $("<input type='text' class='form__field' class='form__label' name='search'></input></br><button id='enviarBusqueda'>Buscar!</button>").insertAfter("#busca");

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
