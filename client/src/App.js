import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import DogDetail from './Components/DogDetail';
import LandingPage from './Components/Landing'
import Home from './Components/Home';
import DogForm from './DogForm/index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
         <Route path="/newDog" component={DogForm} />
        <Route path="/dogDetail/:id" component={DogDetail} /> 
      </Switch>

    </BrowserRouter>
  );
}


export default App;
      

        

