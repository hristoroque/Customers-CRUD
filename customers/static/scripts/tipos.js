let id_eliminar;
let card;
$(document).ready(function(){
    $('input.autocomplete').autocomplete({});
    $('.modal').modal();
    $.ajax({
        url: '/customers/ajax/search/tipo',
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
        },
        method: 'GET'
    })
});

$( ".form-eliminar" ).on( "submit", function( event ) {
    event.preventDefault();
    id = $(this).find("input[name='id']").val()
    card = $("#card-"+id)
    var instance = M.Modal.getInstance($("#tipoConf"));
    instance.open();
});

$('#eliminar').on('click',()=>{
    $.ajax({
        url: '/customers/ajax/tipos/del',
        data: {
        'id': id
        },
        dataType: 'json',
        success: function (data) {
        if (data.is_deleted) {
            card.remove()
            M.toast({html: 'Tipo Eliminado'})
        }
        },
        method: 'POST'
    });
})