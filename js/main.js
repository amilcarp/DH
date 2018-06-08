$(document).ready(function() {
    
    //---- Variables
    
    var bdown = [];
    
    $('.cuadro-derechos p').hide();
    
    function apiGOB(resource, dataset, page, total){
        $.ajax({
		  type: 'GET',
		  url: pathAPIGob + 'ckan.'+dataset+'.'+resource+'?page='+page+'',
		  data: {},
		  success: function( data, textStatus, jqxhr ) {
              gob = data;
		  },
		  async:false
		});
        return gob;
    }
    
    
    function apiGobGrupo(resource, dataset, atributo, variable){
        var gobGrupo = [];
        $.ajax({
		  type: 'GET',
		  url: pathAPIGob + 'ckan.'+dataset+'.'+resource+'?'+atributo+'='+variable,
		  data: {},
		  success: function( data, textStatus, jqxhr ) {
              gobGrupo = data['results'];
		  },
		  async:false
		});
        return gobGrupo;
    }
    

});