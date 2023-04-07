from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient
from bson import ObjectId
import jwt
import datetime, time
from functools import wraps
import bcrypt
from flask_cors import CORS
from chat import get_response

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'mysecret'

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.coursesDB
courses = db.courses
students = db.students
instructors = db.instructors
blacklist = db.blacklist

# Checks if a valid token is present (Backend Authenticatation)
def jwt_required(func):
    @wraps(func)
    def jwt_required_wrapper(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify(
                {'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token,
                              app.config['SECRET_KEY'])
        except:
            return jsonify(
                {'message': 'Token is invalid'}), 401

        bl_token = blacklist.find_one({"token": token})
        if bl_token is not None:
            return make_response(jsonify(
                {'message': 'Token has been cancelled'}), 401)
        return func(*args, **kwargs)

    return jwt_required_wrapper

# Check if the json web token being presented is by someone who has admin rights (Backend Authenticatation)
def admin_required(func):
    @wraps(func)
    def admin_required_wrapper(*args, **kwargs):
        token = request.headers['x-access-token']
        data = jwt.decode(token, app.config['SECRET_KEY'])
        if data["admin"]:
            return func(*args, **kwargs)
        else:
            return make_response(jsonify({'message': 'Admin access required'}), 401)
    return admin_required_wrapper

# Retrieve all courses
@app.route("/api/v1.0/courses", methods=["GET"])
def show_all_courses():
    page_num, page_size = 1, 10
    if request.args.get('pn'):
        page_num = int(request.args.get('pn'))
    if request.args.get('ps'):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num - 1))

    data_to_return = []
    for course in courses.find().skip(page_start).limit(page_size):
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id'])
        data_to_return.append(course)

    return make_response(jsonify(data_to_return), 200)

# Retrieve number of courses in collection
@app.route("/api/v1.0/courseCount", methods=["GET"])
def show_course_count():
    total_count = courses.count_documents({})

    return make_response(jsonify(total_count), 200)

# Retrieve one specific course by _id
@app.route("/api/v1.0/courses/<string:id>", methods=["GET"])
def show_one_course(id):
    course = courses.find_one({'_id': ObjectId(id)})
    if course is not None:
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id'])
        return make_response(jsonify([course]), 200)
    else:
        return make_response(jsonify({"error": "Invalid course ID"}), 404)

# Retrieve one specific course by name
@app.route("/api/v1.0/courses/course_title=<course_title>", methods=["GET"])
def search_course_by_name(course_title):
    course = courses.find_one({'course_title': course_title})
    if course is not None:
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id'])
        return make_response(jsonify([course]), 200)
    else:
        return make_response(jsonify({"error": "Invalid course Name!"}), 404)

# Retrieve all courses by course_category
@app.route("/api/v1.0/courses/course_category=<course_category>", methods=["GET"])
def search_course_by_course_category(course_category):
    data_to_return = []
    for course in courses.find({'course_category': course_category}):
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id'])
        data_to_return.append(course)

    return make_response(jsonify(data_to_return), 200)

#Filter Courses Options

# 1) Filter by course_difficulty
@app.route("/api/v1.0/courses/course_difficulty=<course_difficulty>", methods=["GET"])
def search_course_by_course_difficulty(course_difficulty):
    data_to_return = []
    for course in courses.find({'course_difficulty': course_difficulty}):
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id'])
        data_to_return.append(course)

    return make_response(jsonify(data_to_return), 200)

# 2) Filter by release_year
@app.route("/api/v1.0/courses/release_year=<release_year>", methods=["GET"])
def search_course_by_release_year(release_year):
    data_to_return = []
    for course in courses.find({'release_year': release_year}):
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id'])
        data_to_return.append(course)

    return make_response(jsonify(data_to_return), 200)

# 3) Filter by course_rating >= 2.5
@app.route("/api/v1.0/courses/course_rating2.5", methods=["GET"])
def search_course_by_course_rating_1():
    data_to_return = []
    for course in courses.find():
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id'])
        if course['course_rating'] >= 2.5:
            data_to_return.append(course)

    return make_response(jsonify(data_to_return), 200) 

# 3.1) Filter by course_rating >= 3.5
@app.route("/api/v1.0/courses/course_rating3.5", methods=["GET"])
def search_course_by_course_rating_2():
    data_to_return = []
    for course in courses.find():
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id'])
        if course['course_rating'] >= 3.5:
            data_to_return.append(course)

    return make_response(jsonify(data_to_return), 200) 

# 3.2) Filter by course_rating >= 4.5
@app.route("/api/v1.0/courses/course_rating4.5", methods=["GET"])
def search_course_by_course_rating_3():
    data_to_return = []
    for course in courses.find():
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id'])
        if course['course_rating'] >= 4.5:
            data_to_return.append(course)

    return make_response(jsonify(data_to_return), 200) 

#Sort Courses Options (Ascending & Descending Order)

#1) Ascending Order
@app.route("/api/v1.0/courses/ascendingOrder", methods=["GET"])
def order_by_ascending_order():
    data_to_return = []
    for course in courses.find():
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id']) 
            data_to_return.append(course)

    asc_sorted_data = sorted(data_to_return, key=lambda x: time.strptime(x['published_date'], '%d-%m-%Y'))

    return make_response(jsonify(asc_sorted_data), 200)

#2) Descending Order
@app.route("/api/v1.0/courses/descendingOrder", methods=["GET"])
def order_by_descending_order():
    data_to_return = []
    for course in courses.find():
        course['_id'] = str(course['_id'])
        for review in course['reviews']:
            review['_id'] = str(review['_id']) 
            data_to_return.append(course)

    des_sorted_data = sorted(data_to_return, reverse=True, key=lambda x: time.strptime(x['published_date'], '%d-%m-%Y'))

    return make_response(jsonify(des_sorted_data), 200)

# Create a course
@app.route("/api/v1.0/courses", methods=["POST"])
# @jwt_required
def add_course():
    if "course_title" in request.form and "course_category" in request.form and "course_image" in request.form and "course_description" in request.form and "course_difficulty" in request.form and "lecturer_name" in request.form and "release_year" in request.form:
        new_course = {
            "course_title": request.form["course_title"],
            "course_category": request.form["course_category"],
            "course_image": request.form["course_image"],
            "course_description": request.form["course_description"],
            "course_difficulty": request.form["course_difficulty"],
            "lecturer_name": request.form["lecturer_name"],
            "release_year": request.form["release_year"],
            "num_of_students": 0,
            "review_count": 0,
            "reviews": []
        }
        new_course_id = courses.insert_one(new_course)
        new_course_link = "http://localhost:5000/api/v1.0/courses/" + \
            str(new_course_id.inserted_id)
        return make_response(jsonify({"url": new_course_link}), 201)
    else:
        return make_response(jsonify({"error": "Missing form data"}), 404)

# Update a course
@app.route("/api/v1.0/courses/<string:id>", methods=["PUT"])
# @jwt_required
def edit_course(id):
    if "course_title" in request.form and "course_category" in request.form and "course_image" in request.form and "course_image" in request.form and "course_description" in request.form and "course_difficulty" in request.form and "lecturer_name" in request.form and "release_year" in request.form:
        result = courses.update_one(
            {"_id": ObjectId(id)}, {
                "$set": {"course_title": request.form["course_title"],
                         "course_category": request.form["course_category"],
                         "course_image": request.form["course_image"],
                         "course_description": request.form["course_description"],
                         "course_difficulty": request.form["course_difficulty"],
                         "lecturer_name": request.form["lecturer_name"],
                         "release_year": request.form["release_year"],
                         "reviews": []
                         }
            })
        if result.matched_count == 1:
            edited_course_link = "http://localhost:5000/api/v1.0/courses/" + id
            return make_response(jsonify({"url": edited_course_link}), 200)
        else:
            return make_response(jsonify({"error": "Invalid course ID"}), 404)
    elif "review_count" in request.form:
        result = courses.update_one(
            {"_id": ObjectId(id)}, {
                "$set": {"review_count": request.form["review_count"],
                         }
            })
        if result.matched_count == 1:
            edited_course_link = "http://localhost:5000/api/v1.0/courses/" + id
            return make_response(jsonify({"url": edited_course_link}), 200)
    else:
        return make_response(jsonify({"error": "Missing form data"}), 404)

# Delete a course
@app.route("/api/v1.0/courses/<string:id>", methods=["DELETE"])
# @jwt_required
# @admin_required
def delete_course(id):
    result = courses.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return make_response(jsonify({}), 204)
    else:
        return make_response(jsonify({"error": "Invalid course ID"}), 404)

# Review Sub Document Endpoints

# Get one review
@app.route("/api/v1.0/courses/<cid>/reviews/<rid>", methods=["GET"])
def fetch_one_review(cid, rid):
    course = courses.find_one(
        {"reviews._id": ObjectId(rid)},
        {"_id": 0, "reviews.$": 1})
    if course is None:
        return make_response(
            jsonify(
                {"error": "Invalid course ID or review ID"}), 404)
    course['reviews'][0]['_id'] = str(course['reviews'][0]['_id'])

    return make_response(jsonify(course['reviews'][0]), 200)

# Get all reviews
@app.route("/api/v1.0/courses/<string:id>/reviews", methods=["GET"])
def fetch_all_reviews(id):
    data_to_return = []
    course = courses.find_one(
        {"_id": ObjectId(id)},
        {"reviews": 1, "_id": 0})

    for review in course["reviews"]:
        review["_id"] = str(review["_id"])
        data_to_return.append(review)

    return make_response(jsonify(data_to_return), 200)

# Create a review
@app.route("/api/v1.0/courses/<string:id>/reviews", methods=["POST"])
# @jwt_required
def add_new_review(id):
    new_review = {
        "_id": ObjectId(),
        "name": request.form["name"],
        "text": request.form["text"],
        "stars": request.form["stars"],
        "date": request.form["date"],
        "like": 0,
        "dislike": 0
    }
    courses.update_one({"_id": ObjectId(id)}, {
        "$push": {"reviews": new_review}})
    new_review_link = "http://localhost:5000/api/v1.0/courses/" \
        + id + "/reviews/" + str(new_review['_id'])
    return make_response(jsonify({"url": new_review_link}), 201)

# Update a review
@app.route("/api/v1.0/courses/<cid>/reviews/<rid>", methods=["PUT"])
# @jwt_required
def edit_review(cid, rid):
    if "name" in request.form and "text" in request.form and "stars" in request.form:
        edited_review = {
            "reviews.$.name": request.form["name"],
            "reviews.$.text": request.form["text"],
            "reviews.$.stars": request.form['stars'],
        }
    elif "like" in request.form:
        edited_review = {
            "reviews.$.like": request.form["like"]
        }
    elif "dislike" in request.form:
        edited_review = {
            "reviews.$.dislike": request.form["dislike"]
        }
    courses.update_one(
        {"reviews._id": ObjectId(rid)},
        {"$set": edited_review})
    edit_review_url = "http://localhost:5000/api/v1.0/courses/" + \
        cid + "/reviews/" + rid
    return make_response(jsonify({"url": edit_review_url}), 200)

# Delete a review
@app.route("/api/v1.0/courses/<cid>/reviews/<rid>", methods=["DELETE"])
# @jwt_required
# @admin_required
def delete_review(cid, rid):
    courses.update_one(
        {"_id": ObjectId(cid)},
        {"$pull": {"reviews": {"_id": ObjectId(rid)}}})
    return make_response(jsonify({}), 204)

# Student Collection Endpoints

# Retrieve all students
@app.route("/api/v1.0/students", methods=["GET"])
def show_all_students():
    page_num, page_size = 1, 10
    if request.args.get('pn'):
        page_num = int(request.args.get('pn'))
    if request.args.get('ps'):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num - 1))

    data_to_return = []
    for student in students.find().skip(page_start).limit(page_size):
        student['_id'] = str(student['_id'])
        data_to_return.append(student)

    return make_response(jsonify(data_to_return), 200)

# Retrieve one specific student by _id
@app.route("/api/v1.0/students/<string:id>", methods=["GET"])
def show_one_student(id):
    student = students.find_one({'_id': ObjectId(id)})
    if student is not None:
        student['_id'] = str(student['_id'])
        return make_response(jsonify([student]), 200)
    else:
        return make_response(jsonify({"error": "Invalid student ID"}), 404) 

# Create a student
@app.route("/api/v1.0/students", methods=["POST"])
# @jwt_required
def add_student():
    if "email" in request.form:
        new_student = {
            "email": request.form["email"],
            "name": "Jordan Irvine",
            "student_image": "https://s3.eu-west-2.amazonaws.com/handshake-uk-production/app/public/assets/students/143016/profile/data.?1603051339&timestamp=1678210014627"
        }
        new_student_id = students.insert_one(new_student)
        new_student_link = "http://localhost:5000/api/v1.0/students/" + \
            str(new_student_id.inserted_id)
        return make_response(jsonify({"url": new_student_link}), 201)
    else:
        return make_response(jsonify({"error": "Missing form data"}), 404)
    
# Update a student
@app.route("/api/v1.0/students/<string:id>", methods=["PUT"])
# @jwt_required
def edit_student(id):
    if "name" in request.form and "email" in request.form and "student_image" in request.form:
        result = students.update_one(
            {"_id": ObjectId(id)}, {
                "$set": {"name": request.form["name"],
                         "email": request.form["email"],
                         "student_image": request.form["student_image"]
                         }
            })
        if result.matched_count == 1:
            edited_student_link = "http://localhost:5000/api/v1.0/students/" + id
            return make_response(jsonify({"url": edited_student_link}), 200)
        else:
            return make_response(jsonify({"error": "Invalid student ID"}), 404)

# Delete a student
@app.route("/api/v1.0/students/<string:id>", methods=["DELETE"])
# @jwt_required
# @admin_required
def delete_student(id):
    result = students.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return make_response(jsonify({}), 204)
    else:
        return make_response(jsonify({"error": "Invalid course ID"}), 404)
    
# Retrieve all instructors
@app.route("/api/v1.0/instructors", methods=["GET"])
# @jwt_required
def show_all_instructors():
    data_to_return = []
    for instructor in instructors.find():
        instructor['_id'] = str(instructor['_id'])
        data_to_return.append(instructor)

    return make_response(jsonify(data_to_return), 200)

# Create an instructor
@app.route("/api/v1.0/instructors", methods=["POST"])
# @jwt_required
def add_instructor():
    if "name" in request.form and "instructor_image" in request.form and "subject" in request.form and "teaching_style_quote" in request.form:
        new_instructor = {
            "name": request.form["name"],
            "instructor_image": request.form["instructor_image"],
            "subject": request.form["subject"],
            "teaching_style_quote": request.form["teaching_style_quote"]
        }
        new_instructor_id = instructors.insert_one(new_instructor)
        new_instructor_link = "http://localhost:5000/api/v1.0/instructors/" + \
            str(new_instructor_id.inserted_id)
        return make_response(jsonify({"url": new_instructor_link}), 201)
    else:
        return make_response(jsonify({"error": "Missing form data"}), 404)
    
# Delete an Instructor
@app.route("/api/v1.0/instructors/<string:id>", methods=["DELETE"])
# @jwt_required
# @admin_required
def delete_instructor(id):
    result = instructors.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return make_response(jsonify({}), 204)
    else:
        return make_response(jsonify({"error": "Invalid Instructor ID"}), 404)

# Chatbot Endpoint 

@app.route("/predict", methods=["POST"])
def predict():
    text = request.get_json().get("message") 
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
