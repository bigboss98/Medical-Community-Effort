from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core import serializers
import json 
from django.views.decorators.http import require_http_methods
from .models import Structure
# Create your views here.
@csrf_exempt
def exams(request): 
    """
        Handle a GET Response to obtain all Structures 
    """
    if request.method == 'GET':
        structures = list(Structure.objects.all().values())
        return JsonResponse(structures, safe=False)

@csrf_exempt
def exam(request, name): 
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
        
        return JsonResponse(structure.toJson(), safe=False)
        
    elif request.method == 'DELETE': 
        structure = get_object_or_404(Structure, pk=name)
        structure.delete()
        return JsonResponse(structure.toJson(), safe=False)

    elif request.method == 'POST':
        structure_json = json.loads(request.body)
        structure = Structure(name=name, city=structure_json['city'], region=structure_json['region'],
                              phone_number=structure_json['phone_number'], advertiser=structure_json['advertiser'])
        structure.save()
        return JsonResponse(structure.toJson(), safe=False)
