$(document).ready(function() {
    
    //---- Variables
    
     //$(".btnGrafica").hide();
//            $(".btnGrafica").show();
//            $(".btnTabla").hide();
//            $(".divGrafica").hide();
//            $(".divTabla").show();
//            console.log('Muestra algo------');
//            $(".btnGrafica").on("click",function(){ $(".btnGrafica").hide();$(".btnTabla").show();$(".divGrafica").show();$(".divTabla").hide();});
//            $(".btnTabla").on("click",function(){ $(".btnGrafica").show();$(".btnTabla").hide();$(".divGrafica").hide();$(".divTabla").show();});
//        
        
        function armaTabla(data, str){
            var cua = "";
            cua += '<div class="tabulado'+str+'">';
            cua += '<h3>' + data.breakdown_group[str].breakdown_group_name + '</h3><br />';
            cua += datosTabulado(data.breakdown_group[str].resource_id, data.breakdown_group[str].variable_dataset_id, data.breakdown_group[str].breakdown_attribute_result, data.breakdown_group[str].breakdown_attribute, data.breakdown_group[str].breakdown_group_year, data.breakdown_group[str].breakdown_resource_name);
            cua += '</div>';
            console.log(cua);
            return cua;
        }
            $(".tabulado0").show();
            $("#breakdown").on("change", function() {
                console.log("Si jaló ------------------------");
                str = $(this).val();
                console.log(str);
                console.log(datosDer);
                $(".verTabla").html(armaTabla(datosDer,str));
                console.log("Aquí hace algo!!!");
            });
    
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