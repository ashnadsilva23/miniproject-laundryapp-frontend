import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddUser from './components/AddUser';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/adduser' element={<AddUser/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
