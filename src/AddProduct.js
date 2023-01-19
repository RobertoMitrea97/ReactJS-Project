import './Login.css';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class AddProduct extends Component {

    constructor(props){
        super(props)
        this.state = {
          currentView: "logIn",
          name:'',
          email:'',
          password:'',
          password_confirmation:'',
          code:'',
          errorList:[],
          isOk: false
         
        }
    
        this.handleName= this.handleName.bind(this);
        this.handleCategory_Id= this.handleCategory_Id.bind(this);
        this.handleDescription= this.handleDescription.bind(this);
        this.handleQuantity= this.handleQuantity.bind(this);
        this.handlePrice= this.handlePrice.bind(this);
        this.handleStatus= this.handleStatus.bind(this);
        
       
    
    
      }


      handleCategory_Id=(e)=>{
        e.persist();
        this.setState({category_Id : e.target.value });
    
      }
      handleName=(e)=>{
        e.persist();
        this.setState({name: e.target.value });
    
      }
      handleDescription=(e)=>{
        e.persist();
        this.setState({description : e.target.value });
    
      }
      handleQuantity = (e) => {
        e.persist();
        this.setState({quantity : e.target.value });
      }
      handlePrice=(e)=>{
        e.persist();
        this.setState({price : e.target.value });
    
      }
      handleStatus = (e) => {
        e.persist();
        this.setState({status : e.target.value });
      }

      submitProduct = (e) =>{
        
        e.preventDefault();
       const showdata = {
        category_Id : this.state.category_Id,
        name : this.state.name,
        description : this.state.description,
        quantity : this.state.quantity,
        price : this.state.price,
        status : this.state.status
        };
        
        axios.get('/sanctum/csrf-cookie').then(res =>{
          axios.post('api/product',showdata).then((response) => {
           
         
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
            this.setState({ isOk: true });
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


    render() {
      
      if (this.state.isOk) {
      
        return <Redirect to = {{ pathname: "/Products" }} />;
      }
 
        
            return (
                <section id="entry-page">
                <form onSubmit={this.submitProduct} >
                  <h2>Add</h2>
                  <fieldset>
                    <legend>Product</legend>
                    <ul>
                    <li>
                        <label htmlFor="category_Id">Category_Id</label>
                        <input  type="text" id="category_Id" name="category_Id" required onChange={this.handleCategory_Id} value={this.state.category_Id}/>
                      </li>
                      <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required onChange={this.handleName} value={this.state.name}/>
                      </li>
                      <li>
                        <label htmlFor="password">Description</label>
                        <input type="text" id="description" name="description" required onChange={this.handleDescription} value={this.state.description}/>
                      </li> 
                      <li>
                      <label htmlFor="quantity">Quantity</label>
                        <input  type="text" id="quantity" name="quantity" required onChange={this.handleQuantity} value={this.state.quantity}/>
                      </li>
                      <li>
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" name="price" required onChange={this.handlePrice} value={this.state.price}/>
                      </li>
                      <li>
                        <label htmlFor="status">Status</label>
                        <input type="text" id="status" name="status" required onChange={this.handleStatus} value={this.state.status}/>
                      </li> 
                      <br/>
                      
                    </ul>
                  </fieldset>
                  <button id ="buttonRegister">Submit</button>
                  
                </form>
                </section>
              ) 
        
      }
    }
    
    export default AddProduct;