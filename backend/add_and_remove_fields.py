from pymongo import MongoClient
import random
from bson.objectid import ObjectId

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.coursesDB
courses = db.courses

def add_fields():
    for course in courses.find():
        courses.update_one(
            {"_id": course['_id']},
            {
                "$set": {
                    "review_count": 0,
                    "reviews": [],
                }
            }
        )

add_fields()
