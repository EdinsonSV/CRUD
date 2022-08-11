jQuery(function(){
    $("form").submit(function(e){
        $('#btn-enviar').attr("disabled", "true");   
        e.preventDefault();
        let nombre = $("input[name=nombre]").val();
        let email = $("input[name=email]").val();
        let fechanacimiento = $("input[name=fechanacimiento]").val().toString();

        let fecha = new Date();
        let mes = (fecha.getMonth() +1).toString();
        if (mes.length <= 1){
            mes = '0'+ mes;
        }
        let dia = fecha.getDate().toString();
        if (dia.length <= 1){
            dia = '0'+ dia;
        }
        let fechaactual = fecha.getFullYear()+'-'+mes+'-'+dia;

        if(fechanacimiento > fechaactual ){
            alert('Fecha inexistente')
        }else{
            console.log(fechanacimiento[0]+fechanacimiento[1]+fechanacimiento[2]+fechanacimiento[3]);
            // Creamos array con los meses del año
            const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            // Construimos el formato de salida
            const diaespañol = parseInt((fechanacimiento[8]+fechanacimiento[9]))
            const mesespañol = parseInt((fechanacimiento[5]+fechanacimiento[6])-1)
            
            fechanacimiento = diaespañol + ' de ' + meses[mesespañol] + ' de ' + (fechanacimiento[0]+fechanacimiento[1]+fechanacimiento[2]+fechanacimiento[3]);


            let sexo = $("select[name=sexo]").val();

            $("tbody").append("<tr data-name='"+nombre+"'data-email='"+email+"'data-fechanacimiento='"+fechanacimiento+"'data-sexo='"+sexo+"'><td>"+nombre+"</td><td>"+email+"</td><td>"+fechanacimiento+"</td><td>"+sexo+"</td><td><button class='btn btn-info btn-xs btn-edit'>Editar</button><button class='btn btn-danger btn-xs btn-delete'>Eliminar</button></td></tr>");
            $("input[name=nombre]").val('');
            $("input[name=email]").val('');
            $("input[name=fechanacimiento]").val('');
            $("select[name=sexo]").val('Sin especificar');
        }
    });

    $("body").on("click",".btn-delete",function(){
        if(window.confirm("¿Esta seguro de Eliminar el registro?"))
            $(this).parents("tr").remove();
    });

    $("body").on("click",".btn-edit",function(){
        $('#btn-enviar').attr("disabled", "true");   
        let nombre = $(this).parents("tr").attr("data-name");
        let email = $(this).parents("tr").attr("data-email");
        let fechanacimiento = $(this).parents("tr").attr("data-fechanacimiento");
        let sexo = $(this).parents("tr").attr("data-sexo")

        document.getElementById("nombreid").value=[].innerHTML = nombre ;
        document.getElementById("emailid").value=[].innerHTML = email;
        document.getElementById("fechanacimiento").value=[].innerHTML = fechanacimiento;
        document.getElementById("Elegirsexo").value=[].innerHTML = sexo;

        $(this).parents("tr").find("td:eq(4)").prepend("<button class='btn btn-info btn-xs btn-update'>Actualizar</button><button class='btn btn-warning btn-xs btn-cancel'>Cancelar</button>");
        $(this).hide();
    });

    $("body").on("click",".btn-cancel",function(){
        let nombre = $(this).parents("tr").attr("data-name");
        let email = $(this).parents("tr").attr("data-email");
        let fechanacimiento = $(this).parents("tr").attr("data-fechanacimiento");
        let sexo = $(this).parents("tr").attr("data-sexo");

        $(this).parents("tr").find("td:eq(0)").text(nombre);
        $(this).parents("tr").find("td:eq(1)").text(email);
        $(this).parents("tr").find("td:eq(2)").text(fechanacimiento);
        $(this).parents("tr").find("td:eq(3)").text(sexo);

        $(this).parents("tr").find(".btn-edit").show();
        $(this).parents("tr").find(".btn-update").remove();
        $(this).parents("tr").find(".btn-cancel").remove();

        $("input[name=nombre]").val('');
        $("input[name=email]").val('');
        $("input[name=fechanacimiento]").val('');
        $("select[name=sexo]").val('Sin especificar');

    });
    $("body").on("click",".btn-update",function(){
        let nombre = $(document.getElementById("nombreid")).val();
        let email = $(document.getElementById("emailid")).val();
        let fechanacimiento = $(document.getElementById("fechanacimiento")).val();
        let sexo = $(document.getElementById("Elegirsexo")).val();
    
        $(this).parents("tr").find("td:eq(0)").text(nombre);
        $(this).parents("tr").find("td:eq(1)").text(email);
        $(this).parents("tr").find("td:eq(2)").text(fechanacimiento);
        $(this).parents("tr").find("td:eq(3)").text(sexo);
         
        $(this).parents("tr").attr("data-name",nombre);
        $(this).parents("tr").attr("data-email",email);
        $(this).parents("tr").attr("data-fechanacimiento",fechanacimiento);
        $(this).parents("tr").attr("data-sexo",sexo);

        $("input[name=nombre]").val('');
        $("input[name=email]").val('');
        $("input[name=fechanacimiento]").val('');
        $("select[name=sexo]").val('Sin especificar');

        $(this).parents("tr").find(".btn-edit").show();
        $(this).parents("tr").find(".btn-cancel").remove();
        $(this).parents("tr").find(".btn-update").remove();
        
    });
})


$(function() {
    $('#btn-enviar').attr("disabled", "true");
    $("#nombreid").keyup(function(){
        if ($('#nombreid').val() !== '') {
            $('#btn-enviar').removeAttr('disabled');
        }
    })
});