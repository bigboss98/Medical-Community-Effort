from django.urls import path

from . import views

urlpatterns = [
    path('exams', views.exams, name='exams'),
    path('exams/<str:name>', views.exam, name='exam')
]