# Generated by Django 4.1 on 2023-08-31 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_alter_user_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventoryrecord',
            name='delete',
            field=models.BooleanField(default=False),
        ),
    ]
