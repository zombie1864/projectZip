import os 
from server import db

class Project(db.Model):
    ''' Project schema '''
    id = db.Column(db.Integer, primary_key=True )
    proj_name = db.Column(db.String(125), index=True, unique=False)
    proj_desc = db.Column(db.String(1200), index=True, unique=False)
    proj_purpose = db.Column(db.String(5000), index=True, unique=False)
    proj_techs = db.Column(db.String(500), index=True, unique=False)
    proj_aoa = db.Column(db.String(200), index=True, unique=False)
    proj_src_code = db.Column(db.String(200), index=True, unique=False)
    proj_resources = db.relationship('Resource', backref='project', lazy='dynamic')
    proj_tasks = db.relationship('Task', backref='project', lazy='dynamic')
    proj_img = db.relationship('Img', backref='project', lazy='dynamic')


    def __init__(self, proj_name, proj_desc, proj_purpose, proj_techs, proj_aoa, proj_src_code, proj_resources):
        '''  '''
        self.proj_name = proj_name
        self.proj_desc = proj_desc
        self.proj_purpose = proj_purpose
        self.proj_techs = proj_techs 
        self.proj_aoa = proj_aoa
        self.proj_src_code = proj_src_code
        self.proj_resources = map(Resource, proj_resources) #adv python technique called mapping 
        # map(func, itrable), here an inst of Resource is created for each el in a list


    def as_dict(self):
        ''' returns prject data as dict '''
        return {
            "proj_id": self.id,
            "proj_name":  self.proj_name,
            "proj_desc":  self.proj_desc,
            "proj_purpose":  self.proj_purpose,
            "proj_techs": self.proj_techs, 
            "proj_aoa":  self.proj_aoa, 
            "proj_src_code": self.proj_src_code,
            "proj_resources": [resource.as_str() for resource in Project.query.get(self.id).proj_resources.all()]#list[str]
        }

    
    def get_tasks(self):
        '''  return an obj: tasks_obj '''
        project_tasks = Project.query.get(self.id).proj_tasks.all()
        return {
            "proj_id": self.id,
            "proj_name": self.proj_name, 
            "list_of_tasks": [task.as_dict() for task in project_tasks]
        }


    def __repr__(self):
        '''  '''
        return f'id: {self.id}, proj_name: {self.proj_name}, proj_desc: {self.proj_desc}, proj_purpose: {self.proj_purpose}, proj_tech: {self.proj_techs}, proj_aoa: {self.proj_aoa}, proj_src_code: {self.proj_src_code}'


class Resource(db.Model):
    ''' resources schema - relational table '''
    id = db.Column(db.Integer, primary_key=True)
    proj_resource_str = db.Column(db.String(500), unique=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))


    def __init__(self, proj_resource_str):
        '''  '''
        self.proj_resource_str = proj_resource_str


    def as_str(self):
        return self.proj_resource_str


class Task(db.Model):
    '''  '''
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(2500), unique=False)
    due_date = db.Column(db.String(10), unique=False)
    prio_lvl = db.Column(db.String(20), unique=False)
    tags = db.Column(db.String(2500), unique=False) # tag1-tag2-tag3...
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))


    def __init__(self, task, due_date, prio_lvl, tags, project_id):
        '''  '''
        self.task = task 
        self.due_date = due_date 
        self.prio_lvl = prio_lvl 
        self.tags = tags 
        self.project_id = project_id

    
    def as_dict(self):
        '''  '''
        return {
            "task": self.task, 
            "due_date": self.due_date, # NOTE worry about the details later 
            "prio_lvl": self.prio_lvl, 
            "tags": self.tags
        }


class Img(db.Model):
    '''  '''
    id = db.Column(db.Integer, primary_key=True)
    img_data = db.Column(db.Text, unique=True)
    name = db.Column(db.Text, unique=False)
    filetype = db.Column(db.Text, unique=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))


if os.path.exists('backend.db'):
    os.remove('backend.db')


db.create_all()