from flask.globals import request
from server import app, jsonify, request, db
from server.models import Project, Resource, Task


@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
    return response


@app.route('/projects', methods=['GET', 'POST', 'PUT'])
def projects():
    ''' route func '''
    incoming_data = request.json
    if request.method == 'PUT': 
        data_to_update = Project.query.get_or_404(incoming_data['proj_id'])
        for key, value in incoming_data.items():
            if key == 'proj_resources':
                resources_to_update = Resource.query.filter(
                    Resource.project_id == incoming_data['proj_id']
                ).all()
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
            # db.session.rollback()
            print(Exception)  
    elif request.method == 'POST': 
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
    projects = Project.query.all()
    data = [project.as_dict() for project in projects]
    return jsonify(data)


@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    ''' route func '''
    incoming_data = request.json 
    if incoming_data:
        converted_data = Task(
            task = incoming_data['task'], 
            due_date = incoming_data['due_date'], 
            prio_lvl = incoming_data['prio_lvl'], 
            tags = incoming_data['tags'], 
            project_id = incoming_data['proj_id'] 
        )
        db.session.add(converted_data)
        db.session.commit()
    projects = Project.query.all()
    list_of_tasks = [project.get_tasks() for project in projects]
    return jsonify(list_of_tasks)

'''  
    NOTE 
        - You are using ORM - object Relation Mapping. The ORM API provides a way to perform CRUD operations without writing raw SQL statements 
        - at this point i have build the model interface which communicates with db 
            ⮑ i am able to process a GET req but am missing func to handle full CRUD 
                ⮑ Create: avail
                ⮑ Read: avail 
                ⮑ Update: avail 
                ⮑ Delete: i can delete records using 
                    db.session.delete(id)
                    db.session.commit()
'''