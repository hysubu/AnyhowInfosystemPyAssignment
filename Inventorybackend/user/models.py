from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Role(models.Model):
    role = models.CharField(max_length=100)



    def __str__(self):
        return self.role



class User(models.Model):
    username = models.CharField(max_length=100 , unique=True)
    email = models.CharField(max_length=100)
    password = models.TextField()
    password_key = models.TextField()
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True , blank=True)


class InventoryRecord(models.Model):
    product_name = models.CharField(max_length=100)
    vendor = models.CharField(max_length=100)
    mrp = models.FloatField()
    batch_num = models.CharField(max_length=100)
    batch_date = models.DateField()
    quantity = models.PositiveIntegerField()
    status =  models.CharField(max_length=100,default="Pending",null=True , blank=True)
    delete = models.BooleanField(null=True, blank=True ,default=False)


# class TryDatabase(AbstractUser):
#     phone = models.IntegerField()
#     password_key = models.TextField()




