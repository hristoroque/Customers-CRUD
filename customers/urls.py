from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('new/',views.new,name='new'),
    path('tipos/new/',views.new_tipo,name='new_tipo'),
    path('zonas/new/',views.new_zona,name='new_zona')
]