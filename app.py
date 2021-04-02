# Standard library
import os
import json

# Third party
from flask import Flask, redirect, make_response

# Constants
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))
PICS_PATH = f"{CURRENT_PATH}/pics"
DISPLAY_FILE = "display.json"
PYXL_FILE = "pyxl.html"
DEFAULT_PIC = "smile.json"

# The main Flask app
app = Flask(__name__, static_url_path="", static_folder="static", template_folder="templates")


@app.route("/", methods=["GET"])
def index():
    with open(f"{app.static_folder}/{PYXL_FILE}", "r") as fp:
        response = fp.readlines()
        return str(response)


@app.route("/image", methods=["GET"])
@app.route("/image/<string:pic>", methods=["GET"])
def image(pic=DEFAULT_PIC):
    if not pic.lower().endswith(".json"):
        file_name = f"{pic}.json"
    else:
        file_name = pic

    with open(f"{PICS_PATH}/{file_name}", "r") as fp:
        resp = make_response(json.load(fp))
        resp.headers["Content-Type"] = "application/json"
        return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=False)
