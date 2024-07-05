from src.main import application
from werkzeug.wrappers import Request, Response
from werkzeug.routing import Map, Rule
from werkzeug.exceptions import HTTPException, NotFound
 


if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 7000, application)
