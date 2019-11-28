from django.shortcuts import render,redirect,reverse
from django.http import HttpResponse
from . import models
from .models import TipoCliente,Zona,Cliente

# Create your views here.
def index(req):
    tipos = TipoCliente.objects.all()
    zonas = Zona.objects.all()
    return render(req,"customers/index.html",{"zonas": zonas,"tipos": tipos})

def new(req):
    if(req.method == "GET"):
        tipos = TipoCliente.objects.all()
        zonas = Zona.objects.all()
        return render(req,"customers/create.html",{"zonas": zonas,"tipos": tipos})
    elif (req.method == "POST"):
        cliente = Cliente()
        cliente.nombre = req.POST["name"]
        cliente.ruc = req.POST["ruc"]
        cliente.save()
        return redirect(reverse("index"))

def new_tipo(req):
    if(req.method == 'GET'):
        return render(req,"customers/create_tipo.html")
    elif (req.method == "POST"):
        name = req.POST['name']
        tipo = models.TipoCliente()
        tipo.nombre = name
        tipo.save()
        return redirect(reverse("index"))

def new_zona(req):
    if(req.method == 'GET'):
        return render(req,"customers/create_zona.html")
    elif (req.method == "POST"):
        name = req.POST['name']
        zona = models.Zona()
        zona.nombre = name
        zona.save()
        return redirect(reverse("index"))