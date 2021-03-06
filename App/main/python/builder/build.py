import io
import os

path = {
    "page": "../../templates/Pages/",
    "page_template": "../../templates/Page_templates/",
    "elements": "../../templates/Elements/"
}


def get_filename(path):
  return path.split("/")[-1]


def dev_file(path):

  filename = get_filename(path) + ".html"

  if not os.path.isfile(path + "/" + filename):
    return ""
  template_path = path[len("../../templates/"):]
  # print("Building:", filename)

  file_dev = open(path + "/" + filename, "r", encoding="utf-8")
  html = file_dev.read()
  file_dev.close()

  html = html.replace('#&', template_path)
  html = html.replace('/"', '/exports.html"')
  html = html.replace('\n', '')

  with io.open(path + "/exports.html", 'w+', encoding='utf8') as file_main:
    file_main.write(html)
  return html


def template(dependencies, page_loads, page_path):
  template_path = path["page_template"] + dependencies["template"]

  template_file = open(template_path + "/exports.html", "r")
  template_html = template_file.read()

  page_dev_html = dev_file(page_path)

  # for readability add tabs in lines
  page_dev_html_lines = page_dev_html.split("\n")
  for n in range(1, len(page_dev_html_lines)):
    page_dev_html_lines[n] = "  " + page_dev_html_lines[n]
  page_dev_html = "\n".join(page_dev_html_lines)

  def make_link(style, critical):
    style = '{% static "' + style + '" %}'

    async_attr = "if(media!='all')media='all'"

    # if critical:
    tag = '<link rel="stylesheet" href="' + style + \
        '"> \n'
    # else:
    #   tag= '<link rel="stylesheet" href="' + style + \
    #   '" media="none" onload="' + async_attr + '"> \n'

    return tag

  def make_script(script):
    script = '{%'+' static "' + script + '.js" %}'
    tag = '<script src="' + script + \
        '"> </script>\n'
    return tag

  styles_html = "{%"+" load staticfiles %}"

  styles_critical = []
  styles_secondary = []

  dependencies["styles"] = list(dependencies["styles"])
  dependencies["styles"].sort()

  # print(dependencies["styles"])

  for style in dependencies["styles"]:
    # check if is critical
    if(style.lower().find("layout") > -1 or
       style.lower().find("adaptive") > -1 or
       style.lower().find("card") > -1 or
       style.lower().find("main") > -1):
      styles_critical.append(style)
    else:
      styles_secondary.append(style)

  for style in styles_critical:
    styles_html += make_link(style, True)

  for style in styles_secondary:
    styles_html += make_link(style, False)

  loads_html = "<script> \n loads = {"

  page_loads = list(page_loads)
  page_loads.sort()

  for loaded in page_loads:
    include = '{% include "' + loaded + '" %}'
    loads_html += "'" + loaded + "'" + " : " + "'" + include + "', \n"

  loads_html += "} </script>"

  scripts_critical=""
  scripts_html = ""
  scripts_pages = "<script>"

  dependencies["scripts"] = list(dependencies["scripts"])
  dependencies["scripts"].sort()

  dependencies["scripts_critical"] = list(
      dependencies["scripts_critical"])

  dependencies["scripts_critical"].sort()

  for script in dependencies["scripts_critical"]:
    scripts_critical += make_script(script) + "\n"

  for script in dependencies["scripts"]:
    if script.startswith("Elements/Modules"):
      scripts_html += make_script(script) + '\n'
    else:
      scripts_pages += '    {% include "' + script + '.js" %} \n'

  scripts_critical += scripts_html + scripts_pages + '</script>'

  scripts_html = loads_html + scripts_critical

  page_html = template_html \
      .replace("{ ###title }", dependencies["title"]) \
      .replace("{ **#styles }", styles_html) \
      .replace("{ *#*content }", page_dev_html)\
      .replace("{ ##*js }", scripts_html)

  with io.open(page_path + "/exports.html", 'w+', encoding='utf8') as page_file:
    page_file.write(page_html)
