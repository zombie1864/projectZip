import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import TaskPage from './pages/TaskPage';

function App() {
  /**
  @description: Contains the application logic of the app. Using react-router-dom, a 3rd party library, user can switch between pages. Plz read more abt react-router-dom
  **/
  return (
    <div className="App">
      <Router>
        <table>
          <tr>
            <td className="first-col">
              <NavBar/>
            </td>
            <td className="sec-col">
              {/* switched between pages - App() is the spa */}
              <Switch> 
                <Route path='/' exact component={HomePage}/>
                <Route path='/projects' component={ProjectsPage}/>
                <Route path='/task' component={TaskPage}/>
              </Switch>
            </td>
          </tr>
        </table>
      </Router>
    </div>
  );
}

export default App;