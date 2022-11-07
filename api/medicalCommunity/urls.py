from django.urls import path

from . import views

urlpatterns = [
    path('structures', views.exams, name='structures'),
    path('structures/<str:name>', views.exam, name='structure')
]