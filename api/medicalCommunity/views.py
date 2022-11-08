from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core import serializers
import json 
from django.views.decorators.http import require_http_methods
from django.core import serializers
from .models import Structure, Exam 
# Create your views here.
@csrf_exempt
def exams(request): 
    """
        Handle a GET Response to obtain all Structures 
    """
    if request.method == 'GET':
        exams = Exam.objects.all()
        exams_json = []
        
        for exam in exams:
            exams_json.append(exam.toJson())
        return JsonResponse(exams_json, safe=False)

@csrf_exempt
def exam(request, name): 
    if request.method == 'GET':
        exam = get_object_or_404(Exam, pk=name)
        return JsonResponse(exam.toJson(), safe=False)

    elif request.method == 'PUT':
        exam = get_object_or_404(Exam, pk=name)
        exam_json = json.loads(request.body)

        exam.name = exam_json['name']
        exam.city = exam_json['city']
        exam.region = exam_json['region']
        exam.phone_number = exam_json['phone_number']
        exam.advertiser = exam_json['advertiser']
        exam.save()

        return JsonResponse(exam.toJson(), safe=False)
        
    elif request.method == 'DELETE': 
        exam = get_object_or_404(Exam, pk=name)
        exam_json = exam.toJson()
        exam.delete()
        return JsonResponse(exam_json, safe=False)

    elif request.method == 'POST':
        exam_json = json.loads(request.body)
        exam = Exam(name=name)
        exam.save()

        return JsonResponse(exam.toJson(), safe=False)

@csrf_exempt
def structures(request): 
    """
        Handle a GET Response to obtain all Structures 
    """
    if request.method == 'GET':
        structures = Structure.objects.all()
        structures_json = []
        
        for structure in structures:
            structures_json.append(structure.toJson())
        return JsonResponse(structures_json, safe=False)

@csrf_exempt
def structure(request, name): 
    if request.method == 'GET':
        structure = get_object_or_404(Structure, pk=name)
        return JsonResponse(structure.toJson(), safe=False)

    elif request.method == 'PUT':
        structure = get_object_or_404(Structure, pk=name)
        structure_json = json.loads(request.body)

        structure.name = structure_json['name']
        structure.city = structure_json['city']
        structure.region = structure_json['region']
        structure.phone_number = structure_json['phone_number']
        structure.advertiser = structure_json['advertiser']
        structure.save()

        exams = []
        for exam_name in structure_json['exam_name']:
            exam = Exam.objects.get(pk=exam_name)
            exams.append(exam)
        structure.exam_name.set(exams, clear=True)
        structure.save()
        
        return JsonResponse(structure.toJson(), safe=False)
        
    elif request.method == 'DELETE': 
        structure = get_object_or_404(Structure, pk=name)
        structure_json = structure.toJson()
        structure.delete()
        return JsonResponse(structure_json, safe=False)

    elif request.method == 'POST':
        structure_json = json.loads(request.body)
        structure = Structure(name=name, city=structure_json['city'], region=structure_json['region'],
                              phone_number=structure_json['phone_number'], advertiser=structure_json['advertiser'])
        structure.save()
        for exam_name in structure_json['exam_name']:
            exam = Exam.objects.get(pk=exam_name)
            structure.exam_name.add(exam)
        structure.save()

        return JsonResponse(structure.toJson(), safe=False)
