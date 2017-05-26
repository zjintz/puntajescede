$(document).ready(function(){
    var vof = 2285000000;
    updateDatos("#input1",1);

    
    function updateDatos(input , id){
        var percent = ( $(input).val() *100) /vof;
        var percentStr = percent.toFixed(4);
        $("#porcentaje"+id).html(percentStr);
        var values = [];
        $('input.precio').each(function() {
            values.push($(this).val());
       
        });
        var minValue= Math.min.apply(Math,values);
        $("#valorMin").html(minValue);
        for (var i = 0; i < values.length; i++) {
            $("#pp"+(i+1)).html("0");
        }
        $("#total"+id).html(computaTotal(id));
    };

    function updateFinancieros(activos, pasivos , id){
        var capitalTrabajo = ( $(activos).val() - $(pasivos).val() );
        var indiceLiq = ( $(activos).val() / $(pasivos).val() );
        $("#ct"+id).html(capitalTrabajo);
        $("#il"+id).html(indiceLiq.toFixed(3));
        var puntajeCT = 0;
        if(capitalTrabajo<=1080)
            puntajeCT = 0;
        else if (capitalTrabajo>1080 && capitalTrabajo <=1180)
            puntajeCT = 10;
        else if (capitalTrabajo>1180 && capitalTrabajo <= 1280)
            puntajeCT = 30;
        else if (capitalTrabajo>1280 && capitalTrabajo <= 1380)
            puntajeCT = 40;
        else if (capitalTrabajo>1380)
            puntajeCT = 50;
        $("#puntajeCT"+id).html(puntajeCT);
        var puntajeIL = 0;
        if(indiceLiq<=0.4)
            puntajeIL = 0;
        else if (indiceLiq>0.4 && indiceLiq <=0.8)
            puntajeIL = 10;
        else if (indiceLiq>0.8 && indiceLiq <=1.2)
            puntajeIL = 20;
        else if (indiceLiq>1.2 && indiceLiq <=1.6)
            puntajeIL = 30;
        else if (indiceLiq>1.6 && indiceLiq <=2)
            puntajeIL = 40;
        else if (indiceLiq>2)
            puntajeIL = 50;
        $("#puntajeIL"+id).html(puntajeIL);
        $("#total"+id).html(computaTotal(id));
    };

    function computaTotal(id){
        total =  parseInt($("#puntajeNE"+id).text(),10) +
                 parseInt($("#puntajeIL"+id).text() ,10)+
                 parseInt($("#puntajeCT"+id).text(),10) +
                 parseFloat($("#pp"+id).text());
        return total;
    };
    
    function updateFinancierosTotal(activos, pasivos , id){
        var nivelEndeudamiento = ( $(pasivos).val() / $(activos).val() );
        $("#ne"+id).html(nivelEndeudamiento.toFixed(3));

        var puntajeNE = 0;
        if(nivelEndeudamiento<50)
            puntajeNE = 50;
        else if (nivelEndeudamiento>50 && nivelEndeudamiento <=55)
            puntajeNE = 40;
        else if (nivelEndeudamiento>55 && nivelEndeudamiento <=60)
            puntajeNE = 30;
        else if (nivelEndeudamiento>65 && nivelEndeudamiento <=75)
            puntajeNE = 20;
        else if (nivelEndeudamiento>75 && nivelEndeudamiento <=85)
            puntajeNE = 10;
        else if (nivelEndeudamiento>85)
            puntajeNE = 0;
        $("#puntajeNE"+id).html(puntajeNE);
        $("#total"+id).html(computaTotal(id));
    };
    
    function crearJugador(id){
        var tagJugador = '<li><div class="section1"><h1> Factor precio</h1><div class="sub_li"><h2>Participante '+id+' :</h2></div><div class="sub_li"><div><label for="input'+id+'">Precio </label><input class="precio" id="input'+id+'" type="number" name="p'+id+'" min="2056500000" max="2285000000" value="2285000000" step="228500"></div><div><span class="vof_percent"> % del Vof = </span><span class="porcentajes" id="porcentaje'+id+'">100</span></div></div><div class="sub_li" ><span>pp'+id+' = </span><span id="pp'+id+'">0</span></div></div><div class="section2"><h1>Razones financieras</h1><div><label for="activoSLMM'+id+'"> Activos SLMM</label><input id="activosSLMM'+id+'" type="number" value="0" step="1"><label for="pasivosSLMM'+id+'"> Pasivos SLMM</label><input id="pasivosSLMM'+id+'" type="number" value="0" step="1"><div class="sub_li" ><div><span>Capital Trabajo = </span><span id="ct'+id+'">1</span><span>Puntaje = </span><span id="puntajeCT'+id+'"> 0</span></div><span>Indice Liquidez = </span><span id="il'+id+'">0</span><span>Puntaje = </span><span id="puntajeIL'+id+'">0</span></div></div><div><label for="activosTotal'+id+'"> Activo Total</label><input id="activosTotal'+id+'" type="number" value="0" step="1"><label for="pasivosTotal'+id+'"> Pasivo Total</label><input id="pasivosTotal'+id+'" type="number" value="0" step="1"><div class="sub_li" ><span>Nivel Endeudamiento = </span><span id="ne'+id+'"></span><span>Puntaje = </span><span id="puntajeNE'+id+'">0</span></div></div></div><div class ="section"><div class="sub_li" ><h1 class="total">Puntaje total = </h1><span id="total'+id+'">0</span></div></div></li>';
        
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
        $("#activosSLMM"+id).change(function(){
            updateFinancieros(this, "#pasivosSLMM"+id, id)
        });

        $("#pasivosSLMM"+id).change(function(){
            updateFinancieros("#activosSLMM"+id,this,id)
        });

        $("#activosTotal"+id).change(function(){
            updateFinancierosTotal(this, "#pasivosTotal"+id, id)
        });

        $("#pasivosTotal"+id).change(function(){
            updateFinancierosTotal("#activosTotal"+id,this,id)
        });
    });

    $("#reset").click(function(){
        var mJugadores = 0;
        $('#valorM').html(mJugadores);
        var tagJugador = crearJugador(1);
        $('#participantes').html(tagJugador);
        $("#valorMin").html(vof);
        $("#input1").change(function(){
            updateDatos(this,1)
        });
    });

    $("#input1").change(function(){
        updateDatos(this,1)
    });

    $("#activosSLMM1").change(function(){
        updateFinancieros(this, "#pasivosSLMM1", 1)
    });

    $("#pasivosSLMM1").change(function(){
        updateFinancieros("#activosSLMM1",this,1)
    });

    $("#activosTotal1").change(function(){
        updateFinancierosTotal(this, "#pasivosTotal1", 1)
    });

    $("#pasivosTotal1").change(function(){
        updateFinancierosTotal("#activosTotal1",this,1)
    });

    $("#calcular").click(function(){
        var m = parseInt($('#valorM').text(), 10);
        var vMenor = parseInt($('#valorMin').text(), 10);
        var values = [];
        $('input.precio').each(function() {
            values.push(parseInt($(this).val(), 10));
        });
        var sumVi = 0;
        for (var i = 0; i < values.length; i++) {
            sumVi += values[i];
        }
        var vRef = ((2*vof) + vMenor + sumVi) / (m+4);
        var vRefStr = vRef.toFixed(4);
        $("#valorRef").html(vRefStr);
        for (var i = 0; i < values.length; i++) {
            var ppi = 600;
            if(vRef> values[i]){
                ppi = (1-((vRef - values[i])/ vRef)) *600;
            }
            else if (vRef< values[i] ){
                ppi = (1-((values[i]-vRef)/ vRef)) *600;
            }
            else{
                $("#pp"+(i+1)).html(600);
            }
            var ppiStr = ppi.toFixed(4);
            $("#pp"+(i+1)).html(ppiStr);
            $("#total"+(i+1)).html(computaTotal(i+1));
        }
    });
});
