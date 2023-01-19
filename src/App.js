import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import OffcanvasExample from './Navbar';
import EntryPage from './Login';
import EditProduct from './EditProduct';
//import LoginForm from './test1';
import axios from 'axios';

import Welcome from './Welcome';
import ProductTable from './Loader';
import AddProduct from './AddProduct';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  }
);



function App() {
 /** const [cats, setCats] = useState();
  const [token, setToken] = useState();
  const [firstRender, setFirstRender] = useState(true);
  
  

  useEffect(() => {
    if (firstRender) {
      fetch('http://localhost/sanctum/csrf-cookie', {
        method: 'get',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        credentials: 'same-origin',
      }).then((response) => {
        // console.log(response);
        fetch('http://localhost/api/login', {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            email: "test3@test.ceva",
            password: "12345678"
          })
        }).then((response_one) => response_one.json())
          .then((data) => {
            // console.log(data);
            fetch('http://localhost/api/categories', {
              method: 'GET',
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + data.data?.token
              },
              credentials: 'same-origin',
            }).then((response_two) => response_two.json())
              .then((data) => {
                console.log(data.data?.data)
              }).catch((e) => { console.log(e) });
          }).catch((e) => { console.log(e) });
      });
    }
  }, []);
*/ 
var Authceva = '';
  if(!localStorage.getItem('auth_token')){
    Authceva = (
       <EntryPage/>    )
  }
  else
  {
    Authceva = (
       <Welcome/>
      
      )

  }

  return (
     
<Router>
    <div className="App">
    <OffcanvasExample/>

        <Switch>
           <Route exact path="/">

           {Authceva}
            </Route>

          <Route path="/Home">
          <Welcome/>
          </Route>

          <Route path="/Products">
          <ProductTable/>
          </Route>

          <Route path="/EditProduct">
          <EditProduct/>
          </Route>

          <Route path="/AddProduct">
          <AddProduct/>
          </Route>

        </Switch>

    </div>
  </Router>
 
     
     
   
    
  );
}

export default App;
