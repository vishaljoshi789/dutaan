# Generated by Django 5.0.3 on 2024-05-17 18:05

import mainapp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0009_event_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=mainapp.models.website_images_path),
        ),
    ]