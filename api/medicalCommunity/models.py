from django.db import models
import json 


class Exam(models.Model):
    name = models.CharField(max_length = 200, primary_key=True)

    def toJson(self): 
        exam_json = {
            'name': self.name,
            'structures': [structure.name for structure in self.structure_set.all()]
        }
        return json.dumps(exam_json)

# Create your models here.
class Structure(models.Model):
    name = models.CharField(max_length=200, primary_key=True)
    city = models.CharField(max_length=200)
    region = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)
    advertiser = models.BooleanField()
    exam_name = models.ManyToManyField(Exam)

    def toJson(self): 
        structure_json = {
            'name': self.name,
            'city': self.city,
            'region': self.region,
            'phone_number': self.phone_number,
            'advertiser': self.advertiser,
            'exams_name': [elem.name for elem in self.exam_name.all()]
        }
        return json.dumps(structure_json)


