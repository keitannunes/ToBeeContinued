from flask import Flask
from flask_cors import CORS
from tbc.api import tbc

app = Flask(__name__)
app.register_blueprint(tbc, url_prefix='/tbc/')
CORS(app)


if __name__ == '__main__':
    app.run()
