from flask.globals import request
from server import app, jsonify, request, db
from server.models import Project, Technology


@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] =  "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    response.headers['Access-Control-Allow-Methods']=  "POST, GET, PUT, DELETE, OPTIONS"
    return response


@app.route('/projects', methods=['GET', 'POST'])
def projects():
    ''' Create func '''
    incoming_data = request.json
    if incoming_data: 
        converted_data = Project(
            proj_name = incoming_data['proj_name'], 
            proj_desc = incoming_data['proj_desc'],
            proj_purpose = incoming_data['proj_purpose'],
            proj_techs = incoming_data['proj_techs'],
            proj_aoa = incoming_data['proj_aoa'], 
            proj_src_code = incoming_data['proj_src_code']
        )
        db.session.add(converted_data)
        db.session.commit()
    projects = Project.query.all()
    print('\n----------[ START ]----------\n')
    # print(Technology.query.all())
    # tech_data = [tech.as_str() for tech in Technology.query.all()]
    # tech_data = Technology.query.get(123)
    tech_data = [tech.as_str() for tech in Project.query.get(456).proj_techs.all()]
    print(tech_data)
    print('\n----------[ END ]----------\n') 
    data = [project.as_dict() for project in projects]
    return jsonify(data)

'''  
    NOTE 
        - You are using ORM - object Relation Mapping. The ORM API provides a way to perform CRUD operations without writing raw SQL statements 
        - at this point i have build the model interface which communicates with db 
            ⮑ i am able to process a GET req but am missing func to handle full CRUD 
                ⮑ Create: avail
                ⮑ Read: avail 
                ⮑ Update: missing 
                ⮑ Delete: i can delete records using 
                    db.session.delete(id)
                    db.session.commit()
'''