
import './App.css';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import AddUser from './component/AddUser';
import Home from "./Home"

function App() {
  return (
  <>
<Router>
  <Routes>
    <Route path='/' exact  element={<Home/>} />
    <Route path='/add-user'  element={<AddUser/>} />
    <Route path='/add-user/:id'  element={<AddUser/>} />
  </Routes>
</Router>
  </>
  );
}

export default App;
