from django.shortcuts import render,redirect,reverse
from django.http import HttpResponse
from . import models
from .models import TipoCliente,Zona,Cliente

# Create your views here.
def index(req):
    return render(req,"customers/index.html")

def show_clientes(req):
    clientes = Cliente.objects.exclude(estado = '*')
    return render(req,"customers/clientes_show.html",{'clientes': clientes})

def new(req):
    if(req.method == "GET"):
        tipos = TipoCliente.objects.all()
        zonas = Zona.objects.all()
        return render(req,"customers/create.html",{"zonas": zonas,"tipos": tipos})
    elif (req.method == "POST"):
        tipo_id = req.POST["tipo_id"]
        zona_id = req.POST["zona_id"]
        cliente = Cliente()
        cliente.nombre = req.POST["nombre"]
        cliente.ruc = req.POST["ruc"]
        cliente.tipo = TipoCliente.objects.get(pk = tipo_id)
        cliente.zona = Zona.objects.get(pk = zona_id )
        cliente.save()
        return redirect(reverse("clientes"))

def del_cliente(req):
    if(req.method == "POST"):
        id = req.POST['id']
        cliente = Cliente.objects.get(pk = id)
        cliente.delete()
        return redirect(reverse("clientes"))
        
def new_tipo(req):
    if(req.method == 'GET'):
        return render(req,"customers/create_tipo.html")
    elif (req.method == "POST"):
        name = req.POST['name']
        tipo = models.TipoCliente()
        tipo.nombre = name
        tipo.save()
        return redirect(reverse("index"))

def del_tipo(req):
    if(req.method == "POST"):
        id = req.POST['id']
        tipo = TipoCliente.objects.get(pk = id)
        tipo.delete()
        return redirect(reverse("tipos"))

def show_tipos(req):
    tipos = TipoCliente.objects.all()
    return render(req,"customers/tipos_show.html",{"tipos": tipos})

def new_zona(req):
    if(req.method == 'GET'):
        return render(req,"customers/create_zona.html")
    elif (req.method == "POST"):
        name = req.POST['name']
        zona = models.Zona()
        zona.nombre = name
        zona.save()
        return redirect(reverse("index"))

def del_zona(req):
    if(req.method == 'POST'):
        id = req.POST['id']
        zona = Zona.objects.get(id = id)
        zona.delete()
        return redirect(reverse("zonas"))

def show_zonas(req):
    zonas = Zona.objects.all()
    return render(req,"customers/zonas_show.html",{"zonas": zonas})