from django.db import models

class TipoCliente(models.Model):
    nombre = models.CharField(max_length = 60)

class Zona(models.Model):
    nombre = models.CharField(max_length = 60)

class Cliente(models.Model):
    nombre = models.CharField(max_length = 60)
    ruc = models.IntegerField()
    tipo = models.ForeignKey(TipoCliente,on_delete = models.CASCADE)
    zona = models.ForeignKey(Zona,on_delete = models.CASCADE)

