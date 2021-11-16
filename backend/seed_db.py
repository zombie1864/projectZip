from server import db 
from server.models import Project

proj_1 = Project(
    id = 123,
    proj_name = "NOAA data acquisition", 
    proj_desc = "A command line interface that simulates a realistic data acquistion phase for data science applications. This project provides clean and aggregated datasets collected from the National Oceanic and Atmospheric Administration, NOAA, that can be ran to data pipelines for further analysis. Datasets from NOAA are used for weather related studies either on buildings, energy efficient products, or climate change analysis.", 
    proj_purpose = "Government and other public services provide data using FTP (file transfer protocol) servers; often time with encrypted data. This project collects ISD (Integrated Surface Data) which are encrypted datasets that provides large amounts of information at the cost of usability. Several algorithms parse the ISD to decode the information into  raw datasets which are then aggregated and stored in CSV and JSON format for further processing.", 
    proj_techs = 'Python, Pydantic, Click, Request, Pytest', 
    proj_aoa = "Climate change research, product efficiency research, building EUI (Energy Use Intensity) reports", 
    proj_src_code = "https://github.com/zombie1864/noaa_data_acquisition",
    proj_resources = ['resource 1', 'resource 2']
)

proj_2 = Project(
    id = 456,
    proj_name = 'Data I/O Aggregation', 
    proj_desc = 'A command line interface that aggregates data from local JSON file and JSON file from REST API servers. This utilizes pythons ability to handle I/O bound problems to properly generate outputs based on user inputs.', 
    proj_purpose = 'Python provides numerous methodologies to handle file management for production level demands. This projects aims to simulate internal users demand for formated data with user input to output data that suites their needs. In many situations users require to pull data, in a specific format, that requires interacting with a REST API. To enhance user experiance and reusability this project provies API that interacts with either local data or data from REST API servers.', 
    proj_techs = 'Python, Pydantic, Click',
    proj_aoa = 'data science application', 
    proj_src_code = 'https://github.com/zombie1864/data_IO_aggregation',
    proj_resources = []
)

proj_3 = Project(
    id = 789,
    proj_name = 'python_DSnA', 
    proj_desc = 'A collection of public data structures and algorithm questions. This project focuses on solving common interview question but also focuses on testing business logic of code using pytest. Testable code ensures solution considers edge cases and unexpected inputs.', 
    proj_purpose = 'To train in algorithmic patterns, testing implementation, and a deep understanding of code design with an emphizes on data manipulation.', 
    proj_techs = 'Python, Pytest', 
    proj_aoa = 'Academic', 
    proj_src_code = 'https://github.com/zombie1864/python_DSnA',
    proj_resources = ['resource 1', 'resource 2', 'resource 3', 'resource 4', 'resource 5']
)


try:
    db.session.add(proj_1)
    db.session.add(proj_2)
    db.session.add(proj_3)
    db.session.commit()
except Exception:
    db.session.rollback()

