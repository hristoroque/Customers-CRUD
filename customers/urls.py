from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('clientes/',views.show_clientes,name="clientes"),
    path('new/',views.new,name='new'),
    path('clientes/del',views.del_cliente,name="del"),
    path('clientes/state',views.toogle_cliente,name="toogle"),
    path('tipos/new/',views.new_tipo,name='new_tipo'),
    path('tipos/del',views.del_tipo,name="del_tipo"),
    path('tipos/',views.show_tipos,name='tipos'),
    path('zonas/state',views.toogle_zona,name="toogle_zona"),
    path('zonas/new/',views.new_zona,name='new_zona'),
    path('zonas/del/',views.del_zona,name="del_zona"),
    path('zonas/',views.show_zonas,name="zonas"),
    path('ajax/clientes/del',views.ajax_del_cliente,name="ajax_del"),
]