import os 
from server import db

class Project(db.Model):
    ''' Project schema '''
    id = db.Column(db.Integer, primary_key=True )
    proj_name = db.Column(db.String(125), index=True, unique=False)
    proj_desc = db.Column(db.String(1200), index=True, unique=False)
    proj_purpose = db.Column(db.String(5000), index=True, unique=False)
    proj_aoa = db.Column(db.String(200), index=True, unique=False)
    proj_src_code = db.Column(db.String(200), index=True, unique=False)
    proj_techs = db.relationship('Technology', backref='project', lazy='dynamic')


    def __init__(self, id, proj_name, proj_desc, proj_purpose, proj_aoa, proj_src_code, proj_techs):
        '''  '''
        self.id = id 
        self.proj_name = proj_name
        self.proj_desc = proj_desc
        self.proj_purpose = proj_purpose
        self.proj_aoa = proj_aoa
        self.proj_src_code = proj_src_code
        self.proj_techs = map(Technology, proj_techs)


    def as_dict(self):
        '''  '''
        return {
            "proj_id": self.id,
            "proj_name":  self.proj_name,
            "proj_desc":  self.proj_desc,
            "proj_purpose":  self.proj_purpose,
            "proj_aoa":  self.proj_aoa, 
            "proj_src_code": self.proj_src_code,
            "proj_techs": [tech.as_str() for tech in Project.query.get(self.id).proj_techs.all()]
        }


    def __repr__(self):
        '''  '''
        return f'id: {self.id}, proj_name: {self.proj_name}, proj_desc: {self.proj_desc}, proj_purpose: {self.proj_purpose}, proj_aoa: {self.proj_aoa}, proj_src_code: {self.proj_src_code}'


class Technology(db.Model):
    '''  '''
    id = db.Column(db.Integer, primary_key=True)
    proj_tech = db.Column(db.String(120), unique=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))


    def __init__(self, proj_tech):
        '''  '''
        self.proj_tech = proj_tech


    def as_str(self):
        return self.proj_tech


if os.path.exists('backend.db'):
    os.remove('backend.db')


db.create_all()