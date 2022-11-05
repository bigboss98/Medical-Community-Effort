from django.db import models

# Create your models here.
class Structure(models.Model):
    name = models.CharField(max_length=200, primary_key=True)
    city = models.CharField(max_length=200)
    region = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    advertiser = models.BooleanField()

class Exam(models.Model):
    name = models.CharField(max_length = 200, primary_key=True)

