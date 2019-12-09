$(document).ready(function(){
    $('input.autocomplete').autocomplete({});
    $('.modal').modal();
    $.ajax({
        url: '/customers/ajax/search',
        data: {
            'word': "",
        },
        success: function(data){
            let instance = M.Autocomplete.getInstance($("input.autocomplete"));

            completion = {}

            Object.keys(data).forEach(id=>{
                let nombre = data[id].nombre
                completion[nombre] = null;
            })

            instance.updateData(completion)

            $('.autocomplete-content').children().on("click",ev=>{
                $('#search-input').val(ev.target.innerText)
                $("#search-form").submit()
            })
        },
        method: 'GET'
    })
});

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

let id_eliminar;
let card;

$( "#eliminar" ).on('click', function(event){
    $.ajax({
        url: '/customers/ajax/clientes/del',
        data: {
        'id': id_eliminar
        },
        dataType: 'json',
        success: function (data) {
        if (data.is_deleted) {
            card.remove()
            M.toast({html: 'Cliente Eliminado'})
        }
        },
        method: 'POST'
    });
})

$( ".form-eliminar" ).on( "submit", function( event ) {
    event.preventDefault();
    var id = $(this).find("input[name='id']").val()
    var cardid = "#card-"+id
    id_eliminar = id
    card = $(cardid)
    let instance = M.Modal.getInstance($("#clienteConf"));
    instance.open();
});