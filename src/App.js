import MyComp from './components/MyComp';

function App() {
  /**
  @description: Contains the application logic of the app. Using react-router-dom, a 3rd party library, user can switch between pages. Plz read more abt react-router-dom
  **/
  return (
    <div className="App">
      <MyComp title={1}/>
      <MyComp/>
    </div>
  );
}

export default App;

