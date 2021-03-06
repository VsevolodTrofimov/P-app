import io
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
    # print("LOADING:", path)
    with io.open(path + "/dependencies.json", 'r', encoding='utf8') as dependencies_file:
      dependencies_json = json.load(dependencies_file)
  # print(dependencies_json)

  real_path = path[len("../../templates/"):]

  if not "elements" in dependencies_json:
    dependencies_json["elements"] = []

  if not "styles" in dependencies_json:
    dependencies_json["styles"] = []

  if not "scripts" in dependencies_json:
    dependencies_json["scripts"] = []

  for kind in dependencies_json:
    if type(dependencies_json[kind]) is list:
      for n in range(len(dependencies_json[kind])):
        dependencies_json[kind][n] = \
            dependencies_json[kind][n].replace('#&', real_path)

  for element in dependencies_json["elements"]:
    if element.endswith('.all'):
      element = element[:-4]
      element_path = paths["elements"] + element
      blocks = [block[0] for block in os.walk(element_path)]
      for block_path in blocks:
        block_path = block_path.replace("\\", "/")
        block_name = block_path.split("/")[-1]

        if block_name.startswith("_"):
          continue

        block_path = "/".join(block_path.split('/')[4:])
        dependencies_json["elements"].append(block_path)

  dependencies_json["elements"] = set(dependencies_json["elements"])
  dependencies_json["scripts"] = set(dependencies_json["scripts"])
  dependencies_json["styles"] = set(dependencies_json["styles"])

  dependencies_json["scripts_critical"] = set()

  filename = build.get_filename(path)

  # print(path, real_path)
  style_path = "../../files/static/" + real_path + "/_styles/"
  # print(style_path)

  if os.path.isdir(style_path):
    styles = [file for file in os.listdir(style_path)]
    for style in styles:
      if len(style.split(".")) > 1:
        style = real_path + "/_styles/" + style
        dependencies_json["styles"].add(style)

  if os.path.isdir(path + "/_scripts"):
    scripts = [file for file in os.listdir(path + "/_scripts")]
    for script in scripts:
      if len(script.split(".")) > 1:
        is_critical = False
        if script == "core.js" or 'core' in path:
          is_critical = True
        script = real_path + "/_scripts/" + script
        if is_critical:
          dependencies_json["scripts_critical"].add(
              ".".join(script.split(".")[:-1]))
        else:
          dependencies_json["scripts"].add(".".join(script.split(".")[:-1]))
  return dependencies_json


def add(page_dependencies, dependencies):
  for element in dependencies["elements"]:
    if element.startswith("Modules"):
      if element in page_dependencies["priority"]:
        page_dependencies["priority"][element] += 1
      else:
        page_dependencies["priority"][element] = 1
  page_dependencies["elements"] |= dependencies["elements"]
  page_dependencies["scripts"] |= dependencies["scripts"]
  page_dependencies["styles"] |= dependencies["styles"]
  page_dependencies["scripts_critical"] |= dependencies["scripts_critical"]
