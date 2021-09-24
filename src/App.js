import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Task from './pages/Task';

function App() {
  /**
  @description: Contains the application logic of the app. Using react-router-dom, a 3rd party library, user can switch between pages. Plz read more abt react-router-dom
  **/
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/projects' component={Projects}/>
          <Route path='/task' component={Task}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
