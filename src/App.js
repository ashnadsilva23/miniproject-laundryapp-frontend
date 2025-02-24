import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import AddUser from './components/Users/AddUser';
import ViewUsers from './components/Admin/ViewUsers';
import SearchUser from './components/Admin/SearchUser';
import About from './components/Admin/About';
import Contact from './components/Admin/Contact';
import AddService from './components/Admin/AddService';
import ServiceView from './components/Admin/ServiceView';
import SearchService from './components/Admin/SearchService';
import AdminDashbboard from './components/Admin/AdminDashbboard';
import UpdateUser from './components/Admin/UpdateUser';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome styles
import Dashboard from './components/Users/Dashboard';
import RequestService from './components/Users/RequestService';
import AddProduct from './components/Admin/AddProduct';
import ViewProduct from './components/Admin/ViewProduct';
import ViewMyRequest from './components/Users/ViewMyRequest';
import UpdateService from './components/Admin/UpdateService';
import UpdateProduct from './components/Admin/UpdateProduct';
import ViewRequest from './components/Admin/ViewRequest';
import Login from './components/Admin/Login';
import Home from './components/Home';
import AddComplaints from './components/Users/AddComplaints';
import ViewAllComplaints from './components/Admin/ViewAllComplaints';
import DemoPayment from './components/Users/DemoPayment';
import ViewmyComplaints from './components/Users/ViewmyComplaints';
import StripePaymentGateway from './components/StripePaymentGateway/StripePaymentGateway';
import RequestDetails from './components/Users/RequestDetails';
import Delivery from './components/Users/Delivery';
import DeliveryTable from './components/Admin/DeliveryTable';



function App() {
  return (
    <div> 
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route/>
        <Route path='/reg' element={<AddUser/>}/>
        <Route path='/viewallusers' element={<ViewUsers/>}/>
        <Route path='/searchusers' element={<SearchUser/>}/>
        <Route path='/addservices' element={<AddService/>}/>
        <Route path='/viewallservices' element={<ServiceView/>}/>
        <Route path='/searchservices' element={<SearchService/>}/>
        {/* <Route path='/searchproducts' element={<SearchService/>}/> */}
        <Route path='/updateuser/:id' element={<UpdateUser/>} />
        <Route path='/updateservice/:id' element={<UpdateService/>}/>
        <Route path='/updateproducts/:id' element={<UpdateProduct/>}/>
        <Route path='/admindashboard' element={<AdminDashbboard />}/>
        <Route path='/userdashboard' element={<Dashboard />}/>
        <Route path='/requestservice' element={<RequestService />}/>
        <Route path='/addproducts' element={<AddProduct />}/>
        <Route path='/viewallproducts' element={<ViewProduct />}/>
        <Route path='/viewmyrequests' element={<ViewMyRequest />}/>
        <Route path='/viewallrequests' element={<ViewRequest />}/>
        <Route path="/add-complaint/:requestId" element={<AddComplaints />} />
        <Route path="/viewallcomplaints" element={<ViewAllComplaints />} />
        <Route path="/viewmycomplaints" element={<ViewmyComplaints />} />
        <Route path="/delivery/:requestId" element={<Delivery/>} />
        <Route path="/demopayment" element={<DemoPayment/>} />
        <Route path="/pay" element={<StripePaymentGateway/>} />
        <Route path="/request-details/:requestId" element={<RequestDetails/>} />
        <Route path="/viewalldelivery" element={<DeliveryTable/>} />




        

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;