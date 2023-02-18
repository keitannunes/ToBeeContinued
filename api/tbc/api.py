from flask import Blueprint, request, jsonify, abort
from tbc import ai as api

tbc = Blueprint('__name__','api')


@tbc.route('/ideas', methods=['POST'])
def ideas():
    if not request.json or not 'prompt' in request.json:
        abort(400)
    data = {
        'data': api.generate_ideas(request.json['prompt'])
    }
    return jsonify(data)

@tbc.route('/images', methods=['POST'])
def images():
    if not request.json or not 'prompt' in request.json:
        abort(400)
    data = {
        'data': api.generate_images(request.json['prompt'])
    }
    return jsonify(data)

@tbc.route('/script', methods=['POST'])
def script():
    if not request.json or not 'prompt' in request.json:
        abort(400)
    data = {
        'data': api.generate_script(request.json['prompt'])
    }
    return jsonify(data)

@tbc.route('/title', methods=['POST'])
def title():
    if not request.json or not 'prompt' in request.json:
        abort(400)
    data = {
        'data': api.generate_title(request.json['prompt'])
    }
    return jsonify(data)