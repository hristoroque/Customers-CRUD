$(document).ready(function(){
    $('input.autocomplete').autocomplete({});
    $('.modal').modal();
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

$ ('#search-button').on('click',function(event){
    $('#search-input').focus()
})
$ ('#search-close').on('click',function(event){
    $('#search-input').val("")
})
$ ('#search-input').on('keyup',function(event){
    word = $(this).val()
    console.log("searching word "+ word)
    $.ajax({
        url: '/customers/ajax/search',
        data: {
            'word': word,
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
})

/*
function SetClientes(clientes){
    let container = $('#cards-container');
    container.children().hide()
    let content = ""
    Object.keys(clientes).forEach(id=>{
        let estado = clientes[id].estado=='A'?'Activo':'Inactivo'
        content += 
        `
        <div id="card-${id}" class="card">
                    <div class="card-content">
                        <span class="card-title flow-text"> ${clientes[id].nombre} </span> 
                        <p class="col s3" >RUC: ${clientes[id].ruc} </p>
                        <p class="col s3">Tipo: ${clientes[id].tipo} </p>
                        <p class="col s3">Zona: ${clientes[id].zona} </p>
                        <p id="status-${id}" class="col s3">Estado:
                            ${estado}
                        </p>
                    </div>
                    <div class="card-action">
                        <div class="row">
                            <form action="${}" method="get" class="col s4 center-align flow-text">
                                <input type="hidden" value="{{ cliente.id }}" name="id">
                                <input type="hidden" value="{{ cliente.nombre }}" name="nombre">
                                <input type="hidden" value="{{ cliente.ruc }}" name="ruc">
                                <input type="hidden" value="{{ cliente.zona.nombre }}" name="zona">
                                <input type="hidden" value="{{ cliente.tipo.nombre }}" name="tipo">
                                <button class="btn" type="submit">
                                        EDITAR
                                </button>
                            </form>
                            <form class="activar col s4 center-align"> 
                                <input name="id" type="hidden" value="${id}" />
                                {% if cliente.estado == 'A'%}
                                    <button class="btn-flat" name="option" type="submit" value="INACTIVAR">
                                            INACTIVAR
                                    </button>
                                {% else %}
                                    <button class="btn-flat" name="option" type="submit" value="ACTIVAR">
                                            ACTIVAR
                                    </button>
                                {% endif %}
                                </input>
                            </form>
                            <form  class="form-eliminar col s4 center-align">
                            {% csrf_token %}
                                <input name="id" type="hidden" value="{{ cliente.id }}" />
                                <button class="btn-flat modal-trigger" type="submit" value="ELIMINAR">
                                    ELIMINAR
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        `
    })
    container.html(content)
}
*/