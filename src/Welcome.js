import './Login.css';
import { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Welcome extends Component {
    
    constructor(props){

        super(props)
        this.state={
          btnRedirect: false
        }
       
        this.toTable=this.toTable.bind(this);
        }

        toTable=(e)=>{
            e.preventDefault(); 
            this.setState({ btnRedirect: true });
          
          
            }

    render() {
        if (this.state.btnRedirect) {
      
            return <Redirect to = {{ pathname: "/Products" }} />;
          }
 
        return (
          <section id="entry-page">
            <form>
            <h2>Welcome</h2>
            <fieldset>
            <legend>Hello!</legend>
            </fieldset>
            </form>
          </section>
        )
      }
    }
    
    export default Welcome;