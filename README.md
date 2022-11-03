# Component Design Approach 

Components seperates the view and business logic following principles of seperation of concerns. This allows the business logic of the component to handle state changes and manipulation of data while the view layer deals with rendering the data. 

https://dev.to/tomekbuszewski/high-level-view-and-logic-separation-in-react-39n0

# Getting Started
To begin using projectZip - simply download the src code, then cd into `backend/`. 
From there, if you have not created a virtual env - please do so by typing in 
terminal `python3 -m venv venv`. Once a `venv/` has been made activate it with 
`source venv/bin/activate`. Install all dependencies with 
`pip install -r requirements.txt`. Now you can run the backend by simply running 
the command `python3 app.py`. This will activate the backend server to run. 

Finally to avtivate the frontend be sure to be in the root dir and type `npm start`, 
which will start the frontend server on localHost:3000. 