import json
import os
import build

paths = build.path

def get(path):
	if not os.path.isfile(path + "/dependencies.json"):
		dependencies_json = { 
			"elements": [],
			"styles": [],
			"scripts": [],
		}
	else:
		print("LOADING:", path)
		dependencies_file = open(path + "/dependencies.json", "r")
		dependencies_json = json.loads(dependencies_file.read())

	real_path = path[len("../../templates/"):]

	for kind in dependencies_json:
		if type(dependencies_json[kind])  is list:
			for n in range(len(dependencies_json[kind])):
				dependencies_json[kind][n] = \
					dependencies_json[kind][n].replace('#&', real_path)

	dependencies_json["elements"] = set(dependencies_json["elements"])
	dependencies_json["scripts"]  = set(dependencies_json["scripts"])
	dependencies_json["styles"]   = set(dependencies_json["styles"])

	filename = build.get_filename(path)	

	if os.path.isdir(path + "/_styles/css"):
		styles = [file for file in os.listdir(path + "/_styles/css")]
		for style in styles:
			style = real_path + "/_styles/css/" + style
			dependencies_json["styles"].add(".".join(style.split(".")[:-1]))

	if os.path.isdir(path + "/_scripts"):
		scripts = [file for file in os.listdir(path + "/_scripts")]
		for script in scripts:
			script = real_path + "/_scripts/" + script
			dependencies_json["scripts"].add(".".join(script.split(".")[:-1]))

	return dependencies_json


def add(page_dependencies, dependencies):
	page_dependencies["elements"] |= dependencies["elements"]
	page_dependencies["scripts"]  |= dependencies["scripts"]
	page_dependencies["styles"]   |= dependencies["styles"]