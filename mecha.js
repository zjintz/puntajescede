$(document).ready(function(){
    var vof = 2285000000;
    updateDatos("#input1",1);
    
    function updateDatos(input , id){
        var percent = ( $(input).val() *100) /vof;
        $("#porcentaje"+id).html(percent);
        var values = [];
        $('input').each(function() {
            values.push($(this).val());
       
        });
        var minValue= Math.min.apply(Math,values);
        $("#valorMin").html(minValue);
        for (var i = 0; i < values.length; i++) {
            $("#pp"+(i+1)).html("");
        }

    };
    
    function crearJugador(id){
        var tagJugador = '<li><h2>Participante '+ id +' : </h2><input id="input'+id+'" type="number" name="p'+id+'" min="2056500000" max="2285000000" value="2285000000" step="228500"> <span> % del Vof = </span><span class="porcentajes" id="porcentaje'+id+'">100</span> <span>pp'+id+' = </span><span id="pp'+id+'"></span> </li>';
        return tagJugador;

    };
    $("#nuevoP").click(function(){
        var mJugadores = parseInt($('#valorM').text(), 10) +1 ;
        var id = mJugadores +1;
        $('#valorM').html(mJugadores);
        //        var nuevoJugador = "pone algo";
        var nuevoJugador = crearJugador(id);
        $('#participantes').append(nuevoJugador);

        $("#input"+id).change(function(){
            updateDatos("#input"+id, id)
        });
    });

    $("#reset").click(function(){
        var mJugadores = 0;
        $('#valorM').html(mJugadores);
        var tagJugador = '<li><h2>Participante 1 : </h2><input id="input1" type="number" name="p1" min="2056500000" max="2285000000" value="2285000000" step="228500"> <span> % del Vof = </span><span class="porcentajes" id="porcentaje1">100</span><span> pp1 = </span><span id="pp1"></span> </li>';
        $('#participantes').html(tagJugador);
        $("#valorMin").html(vof);
        $("#input1").change(function(){
            updateDatos(this,1)
        });
    });

    $("#input1").change(function(){
        updateDatos(this,1)
    });


    $("#calcular").click(function(){
        var m = parseInt($('#valorM').text(), 10);
        var vMenor = parseInt($('#valorMin').text(), 10);
        var values = [];
        $('input').each(function() {
            values.push(parseInt($(this).val(), 10));
        });
        var sumVi = 0;
        for (var i = 0; i < values.length; i++) {
            sumVi += values[i];
        }
        var vRef = ((2*vof) + vMenor + sumVi) / (m+4);
        $("#valorRef").html(vRef);
        for (var i = 0; i < values.length; i++) {
            if(vRef> values[i]){
                var ppi = (1-((vRef - values[i])/ vRef)) *600;
                $("#pp"+(i+1)).html(ppi);
            }
            else if (vRef< values[i] ){
                var ppi = (1-((values[i]-vRef)/ vRef)) *600;
                $("#pp"+(i+1)).html(ppi);
            }
            else{
                $("#pp"+(i+1)).html(600);
            }

        }
        
    });
});
