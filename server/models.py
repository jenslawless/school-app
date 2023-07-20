from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

# db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    role = db.Column(db.String)

    course_list = db.relationship('Course', secondary='enrollments', backref='students')

    serialize_rules = ('-courses.teacher',"-courses.enrollments","-course_list.enrollments", "-enrollments")
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Invalid email address. Email must contain an '@' symbol.")
        if len(email) > 40:
                raise ValueError("Invalid email address. Email must be a maximum of 40 characters long.")
        return email

class Assignment(db.Model, SerializerMixin):
    __tablename__ = "assignments"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))

    grades = db.relationship('Grade', backref='assignment')
    serialize_rules = ("-course.students", "-grades.student","-course.assignments","-grades.assignment",)


class Course(db.Model, SerializerMixin):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    teacher_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    teacher = db.relationship('User', backref='courses')
    assignments = db.relationship('Assignment', backref='course')

    serialize_rules = ("-students.course_list", "-students.enrollments", "-students.grades", "-teacher.courses", "-enrollments.course", "-assignments.course",)

class Grade(db.Model, SerializerMixin):
    __tablename__ = "grades"

    id = db.Column(db.Integer, primary_key=True)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    value = db.Column(db.Integer)

    student = db.relationship('User', backref='grades')
    serialize_rules = ("-assignment.course.students", "-student", "-assignment.grades")


class Enrollment(db.Model):
    __tablename__ = "enrollments"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'))

    student = db.relationship('User', backref='enrollments')
    course = db.relationship('Course', backref='enrollments')

    serialize_rules = ("-student.enrollments", "course.enrollments",)
    





