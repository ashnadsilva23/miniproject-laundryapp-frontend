import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddUser from './components/AddUser';
import LoginUser from './components/LoginUser';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path='/' element={<LoginUser/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
