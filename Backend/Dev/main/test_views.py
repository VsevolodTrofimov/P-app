from django.http import HttpResponse
from django.shortcuts import render
from django.template import Context
from .models import *
from . import transliterate
# from django.core.servers.basehttp import FileWrapper
import os
import json
import io


def edit(request):
	# switch for create\load test, launches test editor anyway
	if "test_id" in request.GET:
		return load(request)
	else:
		return create(request)


def create(request):
	# creates test environment (no test exists as file untill saved)
	course_id = request.GET["course_id"]
	context = Test.objects.create(course_id=course_id)
	context["breadcrumbs"] = [{
			"href": "/course/" + str(course_id),
			"link": Course.objects.get(id=course_id).name
		}, {
			"href": "#",
			"link": "Новый тест"
		}]

	return render(request, 'Pages/test_editor.html', context)


def delete(request):
	# moves test to trash bin
	course_id = request.POST["course_id"]
	test_id = request.POST["test_id"]
	Test.objects.delete(course_id, test_id)
	return HttpResponse("Тест удален")


def save(request):
	# saves test file
	print("save")
	if request.method == 'POST':
		json_file = request.POST["json_file"]
		course_id = request.POST["course_id"]
		test_id = request.POST["test_id"]
		Test.objects.save(json_file=json_file, course_id=course_id, test_id=test_id)
	return HttpResponse("Тест сохранен")


def load(request):
	# loads test file
	course_id = request.GET["course_id"]
	test_id = request.GET["test_id"]
	Test.objects.load(course_id=course_id, test_id=test_id)
	context["breadcrumbs"] = [{
			"href": "/course/" + str(course_id),
			"link": Course.objects.get(id=course_id).name
		}, {
			"href": "#",
			"link": test["json"]["title"]
		}]
	return render(request, 'Pages/test_editor.html', context)


def publish(request):
	# makes test visible in course screen
	course_id = request.POST["course_id"]
	test_id = request.POST["test_id"]
	Test.objects.publish(course_id=course_id, test_id=test_id)
	return HttpResponse("Тест опубликован")


def unpublish(request):
	# makes test invisible in course screen
	course_id = request.POST["course_id"]
	test_id = request.POST["test_id"]
	Test.objects.unpublish(course_id=course_id, test_id=test_id)
	return HttpResponse("Тест скрыт")


def share(request):
	# make test avalible in package_catalog
	pass


def attempt(request):
	# creates or continues attempt
	# loads test file
	course_id = request.GET["course_id"]
	test_id = request.GET["test_id"]
	context = Test.objects.attempt(course_id=course_id, text_id=test_id)
	return render(request, 'Pages/test_attempt.html', context)


def check_question(request, item):
	return Test.objects.check_question(item=item)


def attempt_save(request):
	if request.method == 'POST':
		test_id = request.POST.get("test_id")
		question_id = int(request.POST.get("question"))
		task_id = int(request.POST.get("task_number")) - 1
		course_id = request.POST.get("course_id")
		answer = request.POST.get("answer", None)
		Test.objects.attempt_save(test_id=test_id, question_id=question_id,
		                          task_id=task_id, course_id=course_id, answer=answer)
		return HttpResponse("ok")


def attempt_check(request):
	if request.method == 'POST':
		test_id = request.POST.get("test_id")
		course_id = request.POST.get("course_id")
		Test.objects.attempt_check(test_id=test_id, course_id=course_id)
		return HttpResponse("ok")


def give_mark(request, percentage, course_id, test_id):
	return Test.objects.give_mark(percentage=percentage, course_id=course_id, test_id=test_id)


def set_mark_quality(mark):
	return Test.object.set_mark_quality(mark=mark)


def check_correctness(user_version, ideal_version):
	if user_version == ideal_version:
		return True
	else: return False


def get_results(request, course_id, test_id):
	return Test.objects.get_results(course_id=course_id, test_id=test_id)

def get_test_info(request, course_id, test_id):
	return Test.objects.get_test_info(course_id=course_id, test_id=test_id)

def get_attempt_info(request, course_id, test_id):
	return Test.objects.get_attempt_info(course_id=course_id, test_id=test_id, user=request.user)

def upload_asset(request):
	if request.method == 'POST':
		asset=request.FILES["asset"]
		course_id=request.POST["course_id"]
		test_id=request.POST["test_id"]
		path='main/files/media/courses/' + course_id + '/assets/' + test_id + "/"
		filename=Test.objects.upload_asset(
		    asset=asset, course_id=course_id, test_id=test_id, path=path)
		return HttpResponse(filename)

def upload_downloadable(request):
	if request.method == 'POST':
		asset=request.FILES["asset"]
		course_id=request.POST["course_id"]
		test_id=request.POST["test_id"]
		path='main/files/media/courses/' + course_id + '/assets/' + test_id + "/"
		Test.objects.upload_downloadable(
		    asset=asset, course_id=course_id, test_id=test_id, path=path)
	return HttpResponse("ok")

# embmend
def upload_embmend(request):
	if request.method == 'POST':
		asset=request.POST["code"]
		course_id=request.POST["course_id"]
		test_id=request.POST["test_id"]
		path='main/files/media/courses/' + course_id + '/assets/' + test_id + "/"
		asset_id=Test.objects.upload_embmend(
		    path=path, asset=asset, course_id=course_id, test_id=test_id)
		return HttpResponse(asset_id)

def load_embmend(request):
	course_id=request.GET["course_id"]
	test_id=request.GET["test_id"]
	asset_id=request.GET["asset_id"]
	path='main/files/media/courses/' + course_id + '/assets/' + test_id + "/"
	f=open(path + asset_id + ".html", 'r')
	asset=f.read()
	return HttpResponse(asset)

def load_asset_file(request, course_id, test_id, asset_name):
	path='main/files/media/courses/' + course_id + '/assets/' + test_id + "/"
	f=open(path + asset_name, 'r')
	asset=f.read()
	response=HttpResponse(FileWrapper(asset.getvalue()),
	                      content_type='application/zip')
	response['Content-Disposition']='attachment; filename=myfile.zip'
	return response
