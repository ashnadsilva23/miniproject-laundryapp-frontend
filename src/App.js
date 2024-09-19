import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './components/AddUser';
import LoginUser from './components/LoginUser';
import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminLogin/>}/>
        <Route path='/adduser' element={<AddUser/>}/>
        <Route path='/userlogin' element={<LoginUser/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
