$( ".activar" ).on("submit", function(event){
    event.preventDefault()
    var id = $(this).find("input[name='id']").val()
    var option = $(this).find("button[name='option']")
    console.log(option.val())
    var cardid = "card-"+id
    carElement = $("#"+cardid)
    $.ajax({
        url: '/customers/ajax/toggle/cliente',
        data: {
            'id': id,
            'option': option.val()
        },
        success: function(data){
            if(data.status == "A"){
                $('#status-'+id).html("Estado: Activo")
                option.val("INACTIVAR")
                option.text("INACTIVAR")
                M.toast({html: 'El estado del cliente se cambió a activo'})
            } else {
                $('#status-'+id).html("Estado: Inactivo")
                option.val("ACTIVAR")
                option.text("ACTIVAR")
                M.toast({html: 'El estado del cliente se cambió a inactivo'})
            }
        },
        method: 'POST'
    });
});
$( ".eliminar" ).on( "submit", function( event ) {
    event.preventDefault();
    var id = $(this).find("input[name='id']").val()
    var cardid = "card-"+id
    $.ajax({
            url: '/customers/ajax/clientes/del',
            data: {
            'id': id
            },
            dataType: 'json',
            success: function (data) {
            if (data.is_deleted) {
                $("#"+cardid).remove()
                M.toast({html: 'Cliente Eliminado'})
            }
            },
            method: 'POST'
        });
});