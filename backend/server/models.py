import base64
import io
import os 
from server import db
from typing import Dict, Any

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

    
    def home_resources(self):
        ''' returns resources for home route '''
        all_imgs = Img.query.filter(Img.project_id == self.id).all()
        if len(all_imgs) > 0:
            all_imgs = all_imgs[0]
            with io.BytesIO(all_imgs.img_data) as image_file:
                all_imgs = base64.b64encode(image_file.read()).decode()
        return {
            "proj_id": self.id, 
            "proj_name":  self.proj_name,
            "proj_desc": self.proj_desc, 
            "proj_src_code": self.proj_src_code, 
            # "proj_img": all_imgs
        }


    def project_img(self, id):
        '''  '''
        img_inst = Img.query.filter(Img.project_id == id).all() 
        if len(img_inst) != 0: 
            return img_inst[0].img_data
        else: 
            return None 

    def get_tasks(self) -> Dict[str, Any]:
        '''   '''
        project_tasks = Project.query.get(self.id).proj_tasks.all()
        return {
            "proj_id": self.id,
            "proj_name": self.proj_name, 
            "proj_tasks": [task.as_dict() for task in project_tasks] # NOTE task obj has .as_dict method
        }
    
    def get_tasks_as_inst_obj(self):
        '''  '''
        return Project.query.get(self.id).proj_tasks.all()


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
    task_desc = db.Column(db.String(2500), unique=False)
    due_date = db.Column(db.String(10), unique=False)
    prio = db.Column(db.String(20), unique=False)
    proj_tags = db.Column(db.String(2500), unique=False) # tag1-tag2-tag3...
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))


    def __init__(self, task_desc, due_date, prio, proj_tags, project_id):
        '''  '''
        self.task_desc = task_desc 
        self.due_date = due_date 
        self.prio = prio 
        self.proj_tags = proj_tags 
        self.project_id = project_id

    
    def as_dict(self):
        '''  '''
        return {
            "task_desc": self.task_desc, 
            "proj_tags": self.proj_tags,
            "prio_lvl": { 
                "lvl": self.prio, 
                "due_date": self.due_date, 
            },
            "task_id": self.id
        }


class Img(db.Model):
    '''  '''
    id = db.Column(db.Integer, primary_key=True)
    img_data = db.Column(db.Text, unique=False)
    name = db.Column(db.Text, unique=False)
    filetype = db.Column(db.Text, unique=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))


if os.path.exists('backend.db'):
    os.remove('backend.db')


db.create_all()