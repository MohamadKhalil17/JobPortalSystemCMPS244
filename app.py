from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import relationship

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost:3306/jobapplication'
CORS(app, resources={r'*': {'origins': '*'}})
db = SQLAlchemy(app)


class JobSeeker(db.Model):
    __tablename__ = 'job_seeker'
    seekerID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    dateOfBirth = db.Column(db.Date)
    email = db.Column(db.String(100))

    # education = relationship('Education', backref='job_seeker')
    # work_experience = relationship('WorkExperience', backref='job_seeker')
    # skills = relationship('Skill', backref='job_seeker')

    # applications = relationship('Application', backref='job_seeker')

    def __init__(self, firstName, lastName, address, phone, dateOfBirth, email):
        super(JobSeeker, self).__init__(firstName=firstName,
                                        lastName=lastName,
                                        address=address,
                                        phone=phone,
                                        dateOfBirth=dateOfBirth,
                                        email=email)

    def serialize(self):
        return {
            'seekerID': self.seekerID,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'address': self.address,
            'phone': self.phone,
            'dateOfBirth': self.dateOfBirth.isoformat() if self.dateOfBirth else None,
            'email': self.email,
        }


class Skill(db.Model):
    __tablename__ = 'skill'
    seekerID = db.Column(db.Integer, db.ForeignKey('job_seeker.seekerID'), primary_key=True)
    skill = db.Column(db.String(50))

    def __init__(self, seekerID, skill):
        self.seekerID = seekerID
        self.skill = skill

    def serialize(self):
        return {
            'seekerID': self.seekerID,
            'skill': self.skill
        }


class Education(db.Model):
    __tablename__ = 'education'
    university = db.Column(db.String(100), nullable=False)
    graduationYear = db.Column(db.Date)
    degree = db.Column(db.String(50), primary_key=True)
    fieldOfStudy = db.Column(db.String(50))
    seekerID = db.Column(db.Integer, db.ForeignKey('job_seeker.seekerID'), primary_key=True)

    job_seeker_edu = relationship('JobSeeker', backref='education')

    def __init__(self, university, graduationYear, degree, fieldOfStudy, seekerID):
        self.university = university
        self.graduationYear = graduationYear
        self.degree = degree
        self.fieldOfStudy = fieldOfStudy
        self.seekerID = seekerID

    def serialize(self):
        return {
            'university': self.university,
            'graduationYear': self.graduationYear.isoformat() if self.graduationYear else None,
            'degree': self.degree,
            'fieldOfStudy': self.fieldOfStudy,
            'seekerID': self.seekerID
        }


class JobListing(db.Model):
    _tablename_ = 'job_listing'
    jobListID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    jobTitle = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), index=True)
    salary = db.Column(db.DECIMAL(10, 2))
    description = db.Column(db.Text)
    jobType = db.Column(db.String(50))
    postDate = db.Column(db.Date)
    employerName = db.Column(db.String(100), db.ForeignKey('employer.employerName'), index=True)

    # employer = relationship('Employer', backref='job_listings')
    # applications = relationship('Application', backref='job_listing')

    def __init__(self, jobTitle, location, salary, description, jobType, postDate, employerName):
        self.jobTitle = jobTitle
        self.location = location
        self.salary = salary
        self.description = description
        self.jobType = jobType
        self.postDate = postDate
        self.employerName = employerName

    def serialize(self):
        return {
            'jobListID': self.jobListID,
            'jobTitle': self.jobTitle,
            'location': self.location,
            'salary': float(self.salary) if self.salary else None,
            'description': self.description,
            'jobType': self.jobType,
            'postDate': self.postDate.isoformat() if self.postDate else None,
            'employerName': self.employerName
        }


class Applies(db.Model):
    __tablename__ = 'applies'

    seekerID = db.Column(db.Integer, db.ForeignKey('job_seeker.seekerID'), primary_key=True)
    jobListID = db.Column(db.Integer, db.ForeignKey('job_listing.jobListID'), primary_key=True)
    appID = db.Column(db.Integer, db.ForeignKey('application.appID'), primary_key=True)

    # Define the relationships with the JobSeeker, JobListing, and Application models
    seeker = db.relationship('JobSeeker', backref='applied_jobs')
    job_listing = db.relationship('JobListing', backref='job_applications')
    application = db.relationship('Application', backref='job_application')

    def serialize(self):
        return {
            'seekerID': self.seekerID,
            'jobListID': self.jobListID,
            'appID': self.appID
        }


class Application(db.Model):
    _tablename_ = 'application'
    appID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dateApplied = db.Column(db.Date, index=True)
    status = db.Column(db.String(50), index=True)
    jobListID = db.Column(db.Integer, db.ForeignKey('job_listing.jobListID'), index=True)
    seekerID = db.Column(db.Integer, db.ForeignKey('job_seeker.seekerID'), index=True)

    job_listing = relationship('JobListing', backref='applications')
    job_seeker = relationship('JobSeeker', backref='applications')

    _table_args_ = (db.UniqueConstraint('jobListID', 'seekerID', name='UK_Application_JobList_Seeker'),)

    def __init__(self, dateApplied, status, jobListID, seekerID):
        self.dateApplied = dateApplied
        self.status = status
        self.jobListID = jobListID
        self.seekerID = seekerID

    def serialize(self):
        return {
            'appID': self.appID,
            'dateApplied': self.dateApplied.isoformat() if self.dateApplied else None,
            'status': self.status,
            'jobListID': self.jobListID,
            'seekerID': self.seekerID
        }


class Employer(db.Model):
    _tablename_ = 'employer'
    employerName = db.Column(db.String(100), primary_key=True)
    description = db.Column(db.Text)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    address = db.Column(db.String(100))
    industry = db.Column(db.String(50))

    job_listings = relationship('JobListing', backref='employer')

    def __init__(self, employerName, description, phone, email, address, industry):
        self.employerName = employerName
        self.description = description
        self.phone = phone
        self.email = email
        self.address = address
        self.industry = industry

    def serialize(self):
        return {
            'employerName': self.employerName,
            'description': self.description,
            'phone': self.phone,
            'email': self.email,
            'address': self.address,
            'industry': self.industry
        }


class WorkExperience(db.Model):
    _tablename_ = 'work_experience'
    workexpID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    employerName = db.Column(db.String(100), db.ForeignKey('employer.employerName'))
    jobTitle = db.Column(db.String(100))
    startDate = db.Column(db.Date)
    endDate = db.Column(db.Date)
    seekerID = db.Column(db.Integer, db.ForeignKey('job_seeker.seekerID'))

    # job_seeker = relationship('JobSeeker', backref='work_experience')

    def __init__(self, employerName, jobTitle, startDate, endDate, seekerID):
        self.employerName = employerName
        self.jobTitle = jobTitle
        self.startDate = startDate
        self.endDate = endDate
        self.seekerID = seekerID

    def serialize(self):
        return {
            'workexpID': self.workexpID,
            'employerName': self.employerName,
            'jobTitle': self.jobTitle,
            'startDate': self.startDate.isoformat() if self.startDate else None,
            'endDate': self.endDate.isoformat() if self.endDate else None,
            'seekerID': self.seekerID
        }


@app.route('/hello', methods=['GET'])
def hello_world():
    return "Hello World!"


# Create job seeker route with work experience and skills
@app.route('/jobseeker', methods=['POST'])
def create_jobseeker():
    data = request.json
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    address = data.get('address')
    phone = data.get('phone')
    dateOfBirth = data.get('dateOfBirth')
    email = data.get('email')

    new_jobseeker = JobSeeker(
        firstName=firstName,
        lastName=lastName,
        address=address,
        phone=phone,
        dateOfBirth=dateOfBirth,
        email=email
    )
    db.session.add(new_jobseeker)
    db.session.commit()

    return jsonify({'message': 'Job seeker created successfully!'})


@app.route('/create_application', methods=['POST'])
def create_application():
    data = request.json
    dateApplied = data.get('dateApplied')
    status = data.get('status')
    jobListID = data.get('jobListID')
    seekerID = data.get('seekerID')

    new_application = Application(
        dateApplied=dateApplied,
        status=status,
        jobListID=jobListID,
        seekerID=seekerID
    )

    db.session.add(new_application)
    db.session.commit()

    return jsonify({'message': 'Job application created successfully!'})


@app.route('/create_job_listing', methods=['POST'])
def create_job_listing():
    data = request.json
    jobTitle = data.get('jobTitle')
    location = data.get('location')
    salary = data.get('salary')
    description = data.get('description')
    jobType = data.get('jobType')
    postDate = data.get('postDate')
    employerName = data.get('employerName')

    new_job_listing = JobListing(
        jobTitle=jobTitle,
        location=location,
        salary=salary,
        description=description,
        jobType=jobType,
        postDate=postDate,
        employerName=employerName
    )

    db.session.add(new_job_listing)
    db.session.commit()

    return jsonify({'message': 'Job listing created successfully!'})


@app.route('/create_employer', methods=['POST'])
def create_employer():
    data = request.json
    employerName = data.get('employerName')
    description = data.get('description')
    phone = data.get('phone')
    email = data.get('email')
    address = data.get('address')
    industry = data.get('industry')

    new_employer = Employer(
        employerName=employerName,
        description=description,
        phone=phone,
        email=email,
        address=address,
        industry=industry
    )

    db.session.add(new_employer)
    db.session.commit()

    return jsonify({'message': 'Employer created successfully!'})


# list all companies
# done
@app.route('/companies', methods=['GET'])
def get_companies():
    companies = Employer.query.all()
    return jsonify([company.serialize() for company in companies])


@app.route('/job_listings', methods=['GET'])
def get_job_listings():
    job_listings = JobListing.query.all()
    return jsonify([job_listing.serialize() for job_listing in job_listings])


# list all job seekers
# done
@app.route('/jobseekers', methods=['GET'])
def get_job_seekers():
    job_seekers = JobSeeker.query.all()
    return jsonify([seeker.serialize() for seeker in job_seekers])


# list all applications for a given job posting
@app.route('/applications_by_job/<int:job_id>', methods=['GET'])
def get_applications_by_job(job_id):
    applications = Application.query.filter_by(jobListID=job_id).all()
    return jsonify([application.serialize() for application in applications])


# list all applications for a given jobseeker
@app.route('/applications_by_seeker/<int:seeker_id>', methods=['GET'])
def get_applications_by_seeker(seeker_id):
    applications = Application.query.filter_by(seekerID=seeker_id).all()
    return jsonify([application.serialize() for application in applications])


# order applications by date for a given company
@app.route('/applications_by_date/<string:company_name>', methods=['GET'])
def get_applications_by_date(company_name):
    applications = db.session.query(Application).select_from(Application). \
        join(JobListing). \
        filter(JobListing.employerName == company_name). \
        order_by(Application.dateApplied).all()
    return jsonify([application.serialize() for application in applications])


# list all job postings given a certain location
# done
@app.route('/jobs_by_location/<string:location>', methods=['GET'])
def get_jobs_by_location(location):
    jobs = JobListing.query.filter_by(location=location).all()
    return jsonify([job.serialize() for job in jobs])


# count the number of applications for a given job posting
@app.route('/application_count/<int:job_id>', methods=['GET'])
def get_application_count(job_id):
    application_count = Application.query.filter_by(jobListID=job_id).count()
    return jsonify({'count': application_count})


# count the number of accepted/rejected applications
@app.route('/application_status_count/<string:status>', methods=['GET'])
def get_application_status_count(status):
    application_count = Application.query.filter_by(status=status).count()
    return jsonify({'count': application_count})


# Search job postings by keyword
# Done
@app.route('/search_jobs/<string:keyword>', methods=['GET'])
def search_jobs(keyword):
    jobs = JobListing.query.filter(JobListing.description.like(f"%{keyword}%")).all()
    return jsonify([job.serialize() for job in jobs])


# Retrieve job postings that match a certain job type
# done
@app.route('/jobs_by_type/<string:job_type>', methods=['GET'])
def get_jobs_by_type(job_type):
    jobs = JobListing.query.filter_by(jobType=job_type).all()
    return jsonify([job.serialize() for job in jobs])


# Retrieve a job posting by ID
@app.route('/job/<int:id>', methods=['GET'])
def get_job_by_id(id):
    job = JobListing.query.get(id)
    if job:
        return jsonify(job.serialize())
    else:
        return jsonify({'error': 'Job not found'})


# Retrieve a job seeker by ID
@app.route('/jobseeker/<int:id>', methods=['GET'])
def get_job_seeker_by_id(id):
    job_seeker = JobSeeker.query.get(id)
    if job_seeker:
        return jsonify(job_seeker.serialize())
    else:
        return jsonify({'error': 'Job seeker not found'})


# Retrieve job postings that match a certain salary range
# done
@app.route('/jobs_by_salary_range', methods=['GET'])
def get_jobs_by_salary_range():
    data = request.json
    min_salary = data.get('min_salary')
    max_salary = data.get('max_salary')

    jobs = JobListing.query.filter(JobListing.salary.between(min_salary, max_salary)).all()
    return jsonify([job.serialize() for job in jobs])


# Retrieve job seekers that match a certain location
# done
@app.route('/job_seekers_by_location/<string:location>', methods=['GET'])
def get_job_seekers_by_location(location):
    job_seekers = JobSeeker.query.filter_by(address=location).all()
    return jsonify([seeker.serialize() for seeker in job_seekers])


# Retrieve a company that match a certain location
# done
@app.route('/company_by_location/<string:location>', methods=['GET'])
def get_company_by_location(location):
    company = Employer.query.filter_by(address=location).first()
    return jsonify(company.serialize())


# Retrieve job seekers that match a certain skill
# done
@app.route('/job_seekers_by_skill/<string:skill>', methods=['GET'])
def get_job_seekers_by_skill(skill):
    job_seekers = JobSeeker.query.join(Skill).filter(Skill.skill.like(f"%{skill}%")).all()
    return jsonify([seeker.serialize() for seeker in job_seekers])


# Edit a job listing by id
@app.route('/job_seeker/<int:id>', methods=['PUT'])
def edit_job_seeker(id):
    job_seeker = JobSeeker.query.get(id)
    if not job_seeker:
        return jsonify({'message': 'Job seeker not found'}), 404

    # Retrieve the data from the request and update the jobseeker object
    data = request.get_json()
    job_seeker.firstName = data.get('firstName', job_seeker.firstName)
    job_seeker.lastName = data.get('lastName', job_seeker.lastName)
    job_seeker.address = data.get('address', job_seeker.address)
    job_seeker.phone = data.get('phone', job_seeker.phone)
    job_seeker.dateOfBirth = data.get('dateOfBirth', job_seeker.dateOfBirth)
    job_seeker.email = data.get('email', job_seeker.email)

    # Commit the changes to the database
    db.session.commit()

    return jsonify(job_seeker.serialize()), 200


@app.route('/job_listing/<int:id>', methods=['PUT'])
def edit_job_listing(id):
    job_listing = JobListing.query.get(id)
    if not job_listing:
        return jsonify({'message': 'Job listing not found'}), 404

    # Retrieve the data from the request and update the job_listing object
    data = request.get_json()
    job_listing.jobTitle = data.get('jobTitle', job_listing.jobTitle)
    job_listing.location = data.get('location', job_listing.location)
    job_listing.salary = data.get('salary', job_listing.salary)
    job_listing.description = data.get('description', job_listing.description)
    job_listing.jobType = data.get('jobType', job_listing.jobType)
    job_listing.postDate = data.get('postDate', job_listing.postDate)
    job_listing.employerName = data.get('employerName', job_listing.employerName)

    # Commit the changes to the database
    db.session.commit()

    return jsonify(job_listing.serialize()), 200


# delete a job seeker by their id
@app.route('/job_seeker/<int:id>', methods=['DELETE'])
def delete_job_seeker(id):
    job_seeker = JobSeeker.query.filter_by(seekerID=id).first()
    db.session.delete(job_seeker)
    db.session.commit()
    return jsonify({'success': 'Job seeker deleted'})


# delete job listing given its id
@app.route('/job_listing/<int:id>', methods=['DELETE'])
def delete_job_listing(id):
    job_listing = JobListing.query.filter_by(jobListID=id)
    db.session.delete(job_listing)
    db.session.commit()
    return jsonify({'success': 'Job listing deleted'})


with app.app_context():
    db.create_all()
