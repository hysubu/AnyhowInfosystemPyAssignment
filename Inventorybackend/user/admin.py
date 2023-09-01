from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


@admin.register(Role)
class UserAdmin(admin.ModelAdmin):
    list_display = ["role"]


@admin.register(InventoryRecord)
class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "product_name"]