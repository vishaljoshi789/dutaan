# Generated by Django 5.0.3 on 2024-03-31 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_customuser_image_vendor_aadhar_vendor_gst'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='gender',
            field=models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female')], max_length=10, null=True),
        ),
    ]