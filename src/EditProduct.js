import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditProduct(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [productInput, setproduct] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const id = props.data;
        axios.get(`/api/product/${id}`).then( res => {

            if(res.data.status === 200)
            {
                setproduct(res.data.product);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/products');
            }
        });

    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setproduct({...productInput, [e.target.name]: e.target.value });
    }

    const updateproduct = (e) => {
        e.preventDefault();
        
        const product_id = props.match.params.id;
        // const data = productInput;
        const data = {
            name: productInput.name,
            course: productInput.course,
            email: productInput.email,
            phone: productInput.phone,
        }

        axios.put(`/api/update-product/${product_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/products');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/products');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading ..</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                               
                                    
                            
                            </div>
                            <div className="card-body">
                            
                                
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditProduct;