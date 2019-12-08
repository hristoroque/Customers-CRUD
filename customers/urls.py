from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('clientes/',views.show_clientes,name="clientes"),
    #path('clientes/created',views.show_clientes,name="clientescreated",kwargs={'action':'created'}),
    #path('clientes/modified',views.show_clientes,name="clientesmodified",kwargs={'action':'modified'}),
    path('new/',views.new,name='new'),
    path('clientes/del',views.del_cliente,name="del"),
    path('clientes/state',views.toogle_cliente,name="toogle"),
    path('tipos/state',views.toogle_tipo,name="toogle_tipo"),
    path('tipos/new/',views.new_tipo,name='new_tipo'),
    path('tipos/del',views.del_tipo,name="del_tipo"),
    path('tipos/',views.show_tipos,name='tipos'),
    path('zonas/state',views.toogle_zona,name="toogle_zona"),
    path('zonas/new/',views.new_zona,name='new_zona'),
    path('zonas/del/',views.del_zona,name="del_zona"),
    path('zonas/',views.show_zonas,name="zonas"),
    path('ajax/clientes/del',views.ajax_del_cliente,name="ajax_del"),
    path('ajax/toggle/cliente',views.ajax_toggle_cliente,name="ajax_toggle"),
    path('clientes/search',views.search_cliente,name="search_cliente"),
    path('tipos/search',views.search_tipos,name="search_tipos"),
    path('zonas/search',views.search_zonas,name="search_zonas"),
    path('ajax/zonas/del',views.ajax_del_zona,name="ajax_del_zona"),
    path('ajax/tipos/del',views.ajax_del_tipo,name="ajax_del_tipo"),
    path('ajax/search',views.ajax_search_cliente,name="ajax_search_cliente"),
]