from flask import Flask, request, make_response, render_template, redirect, flash, session
from flask_migrate import Migrate
from models import *
import os
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

from config import app, db, api

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = b'<T#A!\x9a\xc0\x11\x1fb\xb18\xd5\x07\xf9%'
migrate = Migrate(app, db)

db.init_app(app)

login_manager = LoginManager(app)
login_manager.login_view = 'login'  # Replace 'login' with the endpoint of your login route

users = current_user

api = Api(app)
CORS(app)


class Login(Resource):

    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']

        user = User.query.filter(User.email == email).first()

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        return {}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict()
        else:
            return {}, 401

class Courses(Resource):
    def get(self):
        courses = Course.query.all()
        courses_dict = []
        for course in courses:
            courses_dict.append(course.to_dict())
        
        return make_response(courses_dict, 200)

class IndividualCourse(Resource):
    def get(self, id):
        course = Course.query.filter_by(id=id).first()
        if course:
            return make_response(course.to_dict(),200)
        else:
            return make_response({"error": "Course not found"},400)


class Students(Resource):
    def get(self):
        students = User.query.filter(User.role == 'Student').all()
        students_serialized = []
        for stu in students:
            students_serialized.append(stu.to_dict())
        
        return make_response(students_serialized, 200)


class Assignments(Resource):

    def get(self):
        assignments = Assignment.query.all()
        assignments_serialized = []
        for ass in assignments:
            assignments_serialized.append(ass.to_dict())
        return make_response(assignments_serialized, 200)
    
class IndStudent(Resource):
    def get(self, id):
        student = User.query.filter_by(id=id).first()
        if student:
            return make_response(student.to_dict(), 200)
        else:
            return make_response({"error": "Student not found."}, 404)

    def patch(self, id):
        data = request.get_json()

        # Retrieve the student record from the database
        student = User.query.filter_by(id=id).first()
        if not student:
            return make_response({"error": "Student not found."}, 404)

        # Update the student record with the data from the request
        student.name = data.get("name", student.name)
        student.email = data.get("email", student.email)
        student.role = data.get("role", student.role)

        # Commit the changes to the database
        db.session.commit()

        return make_response(student.to_dict(), 200)



class IndStudent(Resource):
    def get(self, id):
        student = User.query.filter_by(id=id).first();
        if student:
            return make_response(student.to_dict(),200)
        else:
            return make_response({"error": "Student not found."})


api.add_resource(Courses, '/courses')
api.add_resource(Students, '/students')
api.add_resource(IndStudent, '/students/<int:id>')
api.add_resource(Assignments, '/assignments')
api.add_resource(IndividualCourse, '/courses/<int:id>')

api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(IndStudent, '/students/<int:id>')




if __name__ == '__main__':
    app.run(port=5555, debug=True)
