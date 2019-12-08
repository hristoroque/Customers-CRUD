let id
let card

$('.form-eliminar').on('submit',function(event){
    event.preventDefault()
    id = $(this).find("input[name='id']").val()
    card = $("#card-"+id)
    var instance = M.Modal.getInstance($("#zonaDelModal"));
    instance.open();
})

$('#eliminar').on('click',()=>{
    $.ajax({
        url: '/customers/ajax/zonas/del',
        data: {
        'id': id
        },
        dataType: 'json',
        success: function (data) {
        if (data.is_deleted) {
            card.remove()
            M.toast({html: 'Zona Eliminada'})
        }
        },
        method: 'POST'
    });
})