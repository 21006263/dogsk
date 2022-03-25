import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import DogDetail from './components/DogDetail';
import LandingPage from './components/Landing'
import Home from './components/Home';
import DogForm from './components/DogForm';

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
      

        

