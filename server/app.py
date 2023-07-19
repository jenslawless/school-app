from flask import Flask, request, make_response, render_template, redirect, flash
from flask_migrate import Migrate
from models import *
import os
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user



# from config import app, db, api


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

# Initialize Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'login'  # Replace 'login' with the endpoint of your login route

api = Api(app)
CORS(app)


@app.route('/')
def index():
    return '<h1>Phase 4 Project</h1>'

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Query the user by email
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        # Password matches, login successful
        # You can generate a JWT here and send it as part of the response
        # For simplicity, let's just return a success message for now
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('/login')

@app.route('/dashboard')
@login_required
def dashboard():
    if current_user.role == 'teacher':
        # Show teacher dashboard
        return render_template('teacher_dashboard.html')
    elif current_user.role == 'student':
        # Show student dashboard
        return render_template('student_dashboard.html')
    else:
        # Handle other roles or cases if needed
        return "Unauthorized"


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
        students = User.query.filter(User.role == 'student').all()
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


api.add_resource(Courses, '/courses')
api.add_resource(Students, '/students')
api.add_resource(Assignments, '/assignments')
api.add_resource(IndividualCourse, '/courses/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
