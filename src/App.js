import PyProjects from './components/PyProjects'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavBar from './components/NavBar';

function App() {
  /**
  @description: Contains the application logic of the app. Using react-router-dom, a 3rd party library, user can switch between pages. Plz read more abt react-router-dom
  **/
  return (
    <div className="App">
      <h1>Ipython</h1>
      <PyProjects/>
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/'/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
