from django.db import models
import json 

# Create your models here.
class Structure(models.Model):
    name = models.CharField(max_length=200, primary_key=True)
    city = models.CharField(max_length=200)
    region = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    advertiser = models.BooleanField()

    def toJson(self): 
        return json.dumps(self, default=lambda o: o.__dict__)

class Exam(models.Model):
    name = models.CharField(max_length = 200, primary_key=True)

