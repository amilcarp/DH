$(document).ready(function() {
    
    //---- Variables
    
    var bdown = [];
    
    
    $('.cuadro-derechos p').hide();
    
    $.ajax({
		  type: 'POST',
		  url: "json/breakdown_group.json",
		  data: {},
		  success: function( data, textStatus, jqxhr ) {      
              bdown = data;
              console.log(bdown);
		  },
		  async:false
		});
    
});