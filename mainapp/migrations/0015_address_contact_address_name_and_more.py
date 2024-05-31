# Generated by Django 5.0.3 on 2024-05-19 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0014_alter_payment_payment_method'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='contact',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='address',
            name='name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='street_address',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
