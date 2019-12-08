from django.db import models

class TipoCliente(models.Model):
    nombre = models.CharField(max_length = 60)
    estado = models.CharField(max_length = 1, default = 'A')
    
class Zona(models.Model):
    nombre = models.CharField(max_length = 60)
    estado = models.CharField(max_length = 1, default = 'A')

class Cliente(models.Model):
    nombre = models.CharField(max_length = 60)
    ruc = models.CharField(max_length=11)
    tipo = models.ForeignKey(TipoCliente,on_delete = models.CASCADE)
    zona = models.ForeignKey(Zona,on_delete = models.CASCADE)
    estado = models.CharField(max_length = 1, default = 'A')
