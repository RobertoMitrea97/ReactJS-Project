import './Login.css';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class EntryPage extends Component {
  
  
  
  constructor(props){
    super(props)
    this.state = {
      currentView: "logIn",
      name:'',
      email:'',
      password:'',
      password_confirmation:'',
      code:'',
      errorList:[]
     
    }

    this.handleName= this.handleName.bind(this);
    this.handleEmail= this.handleEmail.bind(this);
    this.handlePassword= this.handlePassword.bind(this);
    this.submitRegister= this.submitRegister.bind(this);
    this.submitVerification = this.submitVerification.bind(this);
    this.resendVerCode = this.resendVerCode.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.submitReset = this.submitReset.bind(this);
    this.submitChangePW = this.submitChangePW.bind(this);


  }

  changeView = (view) => {
    this.setState({
      currentView: view
    })
  }

  handleName=(e)=>{
    e.persist();
    this.setState({name : e.target.value });

  }
  handleEmail=(e)=>{
    e.persist();
    this.setState({email: e.target.value });

  }
  handlePassword=(e)=>{
    e.persist();
    this.setState({password : e.target.value });

  }
  handleVerification = (e) => {
    e.persist();
    this.setState({code : e.target.value });
  }

  //api request

  submitRegister = (e) => {
   
    document.getElementById('buttonRegister').disabled = false;
    document.getElementById('buttonRegister').innerText = "Register in progres..";

    e.preventDefault();

    const showdata = {
      email : this.state.email,
      name : this.state.name,
      password : this.state.password,
      password_confirmation:this.state.password

    };
    //console.log('data=>'+JSON.stringify(data));
    axios.get('/sanctum/csrf-cookie').then(res =>{
    axios.post('api/register' , showdata).then(response =>{
      document.getElementById('buttonRegister').disabled = false;
      document.getElementById('buttonRegister').innerText = "Submit";
      this.changeView("EmailVer")
      // Success 
      console.log('data=>'+JSON.stringify(showdata));
      console.log(response);
      //alert(response.headers)
      swal({
        title: "Succes!",
        text: " You will be redirected soon"+response.data.message ,
        icon: "success",
        button: "Ok!",
      });
  })
  .catch((error) => {
      // Error 
      if (error.response) {
        swal({
          title: "Succes!",
          text: " "+error.message ,
          icon: "error",
          button: "Ok!",
        });
        document.getElementById('buttonRegister').disabled = false;
        document.getElementById('buttonRegister').innerText = "Login";
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          document.getElementById('buttonRegister').disabled = false;
      document.getElementById('buttonRegister').innerText = "Login";
          alert('3')
          console.log(error.request);
      } else {
          // Something happened in setting up the request and triggered an Error
          document.getElementById('buttonRegister').disabled = false;
          document.getElementById('buttonRegister').innerText = "Login";
          alert('5')
          console.log('Error', error.message);
      }
      console.log(error.config);
  });
    
});
  }

  submitVerification = (e) =>{
    e.preventDefault();
    const showdata = {
      email : this.state.email,
      code : this.state.code
    };
    console.log('data=>'+JSON.stringify(showdata));
    axios.get('/sanctum/csrf-cookie').then(res =>{
    axios.post('api/verify-email' , showdata).then(response =>{
      
      this.changeView("logIn");

      console.log('data=>'+JSON.stringify(showdata));
      console.log(response);
  })
  .catch((error) => {
      // Error 
      if (error.response) {
         
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      } else if (error.request) {
         
          alert('3')
          console.log(error.request);
      } else {
          
          alert('5')
          console.log('Error', error.message);
      }
      console.log(error.config);
      
    });
  });
  }

  resendVerCode = (e) =>{
    e.preventDefault();
    const data = {
      email : this.state.email
    };
    console.log('data=>'+JSON.stringify(data));
    axios.get('/sanctum/csrf-cookie').then(response =>{
    axios.post('api/resend-verify-email' , data).then(res =>{
      swal({
        title: "Succes!",
        text: " " ,
        icon: "success",
        button: "Ok!",
      });

    });
  });
  }

  submitLogin = (e) =>{
    document.getElementById('button1').disabled = true;
    document.getElementById('button1').innerText = "Login in progres...";
    e.preventDefault();
   const showdata = {
      email : this.state.email,
      password : this.state.password
    };
    
    axios.get('/sanctum/csrf-cookie').then(res =>{
      axios.post('api/login',showdata).then((response) => {
       
       localStorage.setItem('auth_token', response.data.data.token);
       localStorage.setItem('auth_user', response.data.data.user);

        document.getElementById('button1').disabled = false;
        document.getElementById('button1').innerText = "Login";
        // Success 
        console.log('data=>'+JSON.stringify(showdata));
        console.log(response);
        
        //alert(response.headers)
        swal({
          title: "Succes!",
          text: " You will be redirected soon"+response.data.data.token ,
          icon: "success",
          button: "Ok!",
        });
        return <Redirect to = "/Home"/>;
    })
    .catch((error) => {
        // Error 
        if (error.response) {
          swal({
            title: "Succes!",
            text: " "+error.response.data.message ,
            icon: "error",
            button: "Ok!",
          });
          document.getElementById('button1').disabled = false;
          document.getElementById('button1').innerText = "Login";
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            document.getElementById('button1').disabled = false;
        document.getElementById('button1').innerText = "Login";
            alert('3')
            console.log(error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            document.getElementById('button1').disabled = false;
            document.getElementById('button1').innerText = "Login";
            alert('5')
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
      
  });
  }

  submitReset = (e) =>{
    document.getElementById('buttonReset').disabled = true;
    document.getElementById('buttonReset').innerText = "Login in progres...";
    e.preventDefault();
   const showdata = {
      email : this.state.email
    };
    
    axios.get('/sanctum/csrf-cookie').then(res =>{
      axios.post('api/forgot-password',showdata).then((response) => {
        document.getElementById('buttonReset').disabled = false;
        document.getElementById('buttonReset').innerText = "Login";
        this.changeView("PWChange");
        // Success 🎉
        console.log('data=>'+JSON.stringify(showdata));
        console.log(response);
        //alert(response.headers)
        swal({
          title: "Succes!",
          text: " You will be redirected soon",//+response.data.message ,
          icon: "success",
          button: "Ok!",
        });
    })
    .catch((error) => {
        // Error 
        if (error.response) {
          swal({
            title: "Succes!",
            text: " ",//+error.response.data.message ,
            icon: "error",
            button: "Ok!",
          });
          document.getElementById('buttonReset').disabled = false;
          document.getElementById('buttonReset').innerText = "Login";
            
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
           
            document.getElementById('buttonReset').disabled = false;
        document.getElementById('buttonReset').innerText = "Login";
            alert('3')
            console.log(error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            document.getElementById('buttonReset').disabled = false;
            document.getElementById('buttonReset').innerText = "Login";
            alert('5')
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
      
  });
    
  }

  submitChangePW = (e) =>{
    const showdata = {
      email : this.state.email,
      password : this.state.password,
      code: this.state.code
    };
    axios.get('/sanctum/csrf-cookie').then(res =>{
      axios.post('api/change-password',showdata).then((response) => {

      });
      
    });
    
  }

  currentView = () => {
    switch(this.state.currentView) {
      case "signUp":
        return (
          <form onSubmit={this.submitRegister}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
              <li>
                  <label htmlFor="username">Username:</label>
                  <input  type="text" id="name" name="name" required onChange={this.handleName} value={this.state.name}/>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required onChange={this.handleEmail} value={this.state.email}/>
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name="password" required onChange={this.handlePassword} value={this.state.password}/>
                </li> 
                <br/>
                
              </ul>
            </fieldset>
            <button id ="buttonRegister">Submit</button>
            <button type="button" onClick={ () => this.changeView("logIn")}>Have an Account?</button>
            
          </form>
        ) 
        break
      case "logIn":
        return (
          <form onSubmit={this.submitLogin}>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required onChange={this.handleEmail} value={this.state.email}/>
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" required onChange={this.handlePassword} value={this.state.password} autoComplete="on"/>
                </li>
                <li>
                  <i/>
                  <a onClick={ () => this.changeView("PWReset")} href="#">Forgot Password?</a>
                </li>
                <li>
                  <i/>
                  <a onClick={ () => this.changeView("EmailVer")} href="#">Email verification</a>
                </li>
              </ul>
            </fieldset>
            <button id ="button1">Login</button>
            <button type="button" onClick={ () => this.changeView("signUp")}>Create an Account</button>
          </form>
        ) 
        break
      case "PWReset":
        return (
          <form onSubmit={this.submitReset}>
          <h2>Reset Password</h2>
          <fieldset>
            <legend>Password Reset</legend>
            <ul>
              <li>
                <em>A reset link will be sent to your inbox!</em>
              </li>
              <li>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required onChange={this.handleEmail} value={this.state.email}/>
              </li>
            </ul>
          </fieldset>
          <button id ="buttonReset">Send Reset Link</button>
          <button type="button" onClick={ () => this.changeView("logIn")}>Go Back</button>
        </form>
        ) 
        break
        case "EmailVer":
        return (
          <form onSubmit={this.submitVerification}>
          <h2>Email verification </h2>
          <fieldset>
            <legend>Please verify your email </legend>
            <ul>
              <li>
                <em>Check your inbox for verification code! {this.state.email}</em>
              </li>
              <li>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required onChange={this.handleEmail} value={this.state.email}/>
              </li>
              <li>
                <label htmlFor="code">Code:</label>
                <input type="text" id="code" required onChange={this.handleVerification} value={this.state.code}/>
              </li>
            </ul>
          </fieldset>
          <button>Submit</button>
          <button onClick={this.resendVerCode}>Resent verification code</button>
          <button type="button" onClick={ () => this.changeView("logIn")}>Go Back </button>
        </form>
        )
        break
        case "PWChange":
        return (
          <form onSubmit={this.submitChangePW}>
          <h2>Email verification </h2>
          <fieldset>
            <legend>Please verify your email </legend>
            <ul>
              <li>
                <em>Check your inbox for verification code! {this.state.email}</em>
              </li>
              <li>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required onChange={this.handleEmail} value={this.state.email}/>
              </li>
              <li>
                <label htmlFor="code">Code:</label>
                <input type="text" id="code" required onChange={this.handleVerification} value={this.state.code}/>
              </li>
              <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" required onChange={this.handlePassword} value={this.state.password} autoComplete="on"/>
                </li>
            </ul>
          </fieldset>
          <button>Submit</button>
          <button type="button" onClick={ () => this.changeView("logIn")} >Login</button>
          <button onClick={this.resendVerCode}>Resent verification code</button>
        </form>
        )
      default:
        break
    }
  }


  render() {
 
    return (
      <section id="entry-page">
        {this.currentView()}
      </section>
    )
  }
}

export default EntryPage;