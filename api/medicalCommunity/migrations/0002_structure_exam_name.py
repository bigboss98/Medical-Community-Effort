# Generated by Django 4.1.3 on 2022-11-07 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicalCommunity', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='structure',
            name='exam_name',
            field=models.ManyToManyField(to='medicalCommunity.exam'),
        ),
    ]