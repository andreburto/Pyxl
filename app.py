# Standard library
import os
import json

# Third party
from flask import Flask, render_template, make_response, request

# Constants
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))
PICS_PATH = f"{CURRENT_PATH}/pics"
DISPLAY_FILE = "display.json"
PYXL_FILE = "pyxl.html"
DEFAULT_PIC = "smile.json"

# The main Flask app
app = Flask(__name__, static_url_path="", static_folder="static", template_folder="templates")


class PicState:
    def __init__(self):
        self.current_picture = DEFAULT_PIC


pic_state = PicState()


@app.route("/", methods=["GET"])
def index():
    return render_template("pyxl.html", title="Pyxl", javascript_files=["pyxl.js"])


@app.route("/editor", methods=["GET"])
def get_editor():
    return render_template("pyxl.html", title="Pyxl - Admin", javascript_files=["admin.js", "editor.js"])


@app.route("/image", methods=["GET"])
def get_image():
    pic = pic_state.current_picture
    file_name = pic if pic.lower().endswith(".json") else f"{pic}.json"

    with open(f"{PICS_PATH}/{file_name}", "r") as fp:
        resp = make_response(json.load(fp))
        resp.headers["Content-Type"] = "application/json"
        return resp


@app.route("/image/save", methods=["POST"])
def save_image():
    request_json = json.loads(request.data)
    file_name = request_json["file"]
    with open(f"{PICS_PATH}/{file_name}", "w") as fp:
        fp.write(json.dumps(request_json))
    return make_response("OK")


@app.route("/image/<string:pic>", methods=["PUT"])
def set_image(pic):
    file_name = pic if pic.lower().endswith(".json") else f"{pic}.json"
    pic_state.current_picture = pic
    return get_image()


def list_images():
    image_files = []
    for file in os.listdir(PICS_PATH):
        if file.endswith(".json"):
            with open(f"{PICS_PATH}/{file}", "r") as fp:
                image_info = json.load(fp)
                image_info["file"] = image_info.get("file", file)
                image_files.append(image_info)
    return image_files


@app.route("/images", methods=["GET"])
def get_list_images():
    image_list = [i for i in sorted(list_images(), key=lambda item: item["description"])]
    resp = make_response(json.dumps(image_list))
    resp.headers["Content-Type"] = "application/json"
    return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=False)
