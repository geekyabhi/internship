import './App.css';
import {BrowserRouter as Router,Switch,Route} from'react-router-dom'
import Data from './components/data'
import Login from './components/login'
import Register from './components/register'

function App() {
  return (
    <Router>
        <Switch>
          <Route path='/data'><Data></Data></Route>
          <Route path='/login'><Login></Login></Route>
          <Route path='/register'><Register></Register></Route>
        </Switch>
    </Router>
  );
}

export default App;
