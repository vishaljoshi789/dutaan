# Generated by Django 5.0.3 on 2024-06-28 06:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0020_alter_vendor_aadhar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatbox',
            name='order',
        ),
    ]