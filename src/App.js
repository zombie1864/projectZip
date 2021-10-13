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
            <td style={{
              width: '125px',
              maxWidth: '125px'
            }}>
              <NavBar/>
            </td>
            <td style={{
                overflow: 'hidden', 
                padding: '0px 5vw 0px 5vw',
                // the above padding is a possible solution - the idea is that as screen gets wider the padding will auto adjust. The td adjust not the carousel comp 
                // alignContent: 'center',
                // justifyContent: 'center',
               }}>
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