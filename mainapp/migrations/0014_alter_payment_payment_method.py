# Generated by Django 5.0.3 on 2024-05-18 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0013_orderitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='payment_method',
            field=models.CharField(choices=[('Online', 'Online'), ('Cash On Delivery', 'Cash On Delivery')], max_length=20),
        ),
    ]
