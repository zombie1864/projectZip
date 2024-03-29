import io 
from flask.globals import request
from flask import send_file
from server import app, jsonify, request, db
from server.models import Project, Resource, Task, Img
from werkzeug.utils import secure_filename
from typing import Dict, Any


@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, PATCH, OPTIONS"
    return response


@app.route('/', methods=['GET'])
def home_resources_API():
    ''' route func - returns project name, project desc, project img, and project src code'''
    if request.method == 'GET':
        projects = Project.query.all()
        data = [project.home_resources() for project in projects]
        return jsonify(data)


@app.route('/proj_img/<int:proj_id>', methods=['GET'])
def proj_img_resource_API(proj_id):
    ''' route func - returns project img'''
    project = Project.query.get_or_404(proj_id)
    proj_img_byte = project.project_img(proj_id)
    if proj_img_byte == None:
        return 'None', 204 # HTTP 204 means no content 
    else:
        return send_file(io.BytesIO(proj_img_byte), mimetype='image/gif')


@app.route('/projects', methods=['GET', 'POST', 'PUT', 'DELETE'])
def projects_API():
    ''' route func - Adds(POST), updates(PUT), and deletes(DELETE) projects with a default
    HTTP GET request which returns project state
    ''' 
    if request.method == 'PUT': 
        incoming_data = request.json
        data_to_update = Project.query.get_or_404(incoming_data['proj_id'])
        for key, value in incoming_data.items():
            if key == 'proj_resources': 
                resources_to_update = Resource.query.filter(
                    Resource.project_id == incoming_data['proj_id']
                ).all() 
                if len(incoming_data['proj_resources']) != len(resources_to_update): 
                    for idx in range(len(resources_to_update),len(incoming_data['proj_resources'])): 
                        new_resource_str = incoming_data['proj_resources'][idx]
                        converted_resource_data = Resource(proj_resource_str=new_resource_str)
                        data_to_update.proj_resources.append(converted_resource_data)
                        db.session.add(data_to_update)
                        db.session.commit()
                for resource_idx in range(len(resources_to_update)): 
                    resource = resources_to_update[resource_idx]
                    if value[resource_idx] == 'null': 
                        Resource.query.filter(
                            Resource.id == resource.id
                        ).delete()
                    setattr(resource, 'proj_resource_str', value[resource_idx]) 
            else:
                setattr(data_to_update, key, value) 
        try: 
            db.session.commit()
        except Exception: 
            print(Exception)  
    elif request.method == 'POST': 
        if request.headers['Content-Type'] == 'application/json': 
            incoming_data = request.json 
            converted_data = Project(
                proj_name = incoming_data['proj_name'], 
                proj_desc = incoming_data['proj_desc'],
                proj_purpose = incoming_data['proj_purpose'],
                proj_techs = incoming_data['proj_techs'],
                proj_aoa = incoming_data['proj_aoa'], 
                proj_src_code = incoming_data['proj_src_code'],
                proj_resources = incoming_data['proj_resources']
            )
            db.session.add(converted_data)
            db.session.commit()
        else:  
            project = db.session.query(Project).order_by(Project.id.desc()).first()
            img = request.files['proj_img'] # NOTE stores img data to var img 
            filename = secure_filename(img.name)
            filetype = img.mimetype
            img_record_obj = Img(
                img_data=img.read(), name=filename, filetype=filetype, project_id=project.id
            )
            db.session.add(img_record_obj)
            db.session.commit()
    elif request.method == 'DELETE':
        list_of_proj_to_be_deleted = request.json
        for proj_id in list_of_proj_to_be_deleted:
            proj_to_be_deleted = Project.query.get(proj_id)
            db.session.delete(proj_to_be_deleted)
            db.session.commit()
    projects = Project.query.all()
    data = [project.as_dict() for project in projects]
    return jsonify(data)


@app.route('/tasks', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def tasks_API():
    ''' route func 
    '''
    if request.method == 'PATCH':
        incoming_data = request.json
        task_inst_obj = Project.query.get_or_404(int(incoming_data['proj_id'])).get_tasks_as_inst_obj()[int(incoming_data['task_idx'])]
        for key, value in incoming_data['patch_update'].items():
            setattr(task_inst_obj, key, value)
        try:
            db.session.commit()
        except Exception: 
            db.session.rollback()
            print(Exception) 
    elif request.method == 'DELETE':
        try:
            incoming_data = request.json
            db.session.delete(Task.query.get_or_404(int(incoming_data['task_id'])))
            db.session.commit()
        except Exception:
            db.session.rollback()
            print(Exception) 
    elif request.method == 'POST':
        incoming_data = request.json
        converted_data = Task(
            task_desc = incoming_data['task_desc'], 
            due_date = incoming_data['due_date'], 
            prio = incoming_data['prio'], 
            proj_tags = incoming_data['proj_tags'], 
            project_id = incoming_data['proj_id'] 
        )
        try:
            db.session.add(converted_data)
            db.session.commit()
        except Exception:
            print('err')
    projects = Project.query.all()
    list_of_tasks = [project.get_tasks() for project in projects]
    return jsonify(list_of_tasks)

'''  
[MISC]
    []_You are using ORM - object Relation Mapping. The ORM API provides a way to perform CRUD operations without writing raw 
    SQL statements. This is what SQLAlchemy does 
    []_This server provides full CRUD API 
    []_MVC design pattern: each route is associated with a controller. controller is the business logic that 
    CONN(httpReq, DB)
'''