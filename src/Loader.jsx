import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap";
import "./Table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function ProductTable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost/api/products")
      .then((response) => {
        setData(response.data);
        //console.log(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const refetch = () => {
    setLoading(true);
    axios
      .get("http://localhost/api/products")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteStudent = (e, id) => {
    e.preventDefault();
    
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/product/${id}`).then(res=>{
      swal("Deleted!",""+res.data.message,"success");
      thisClicked.closest("tr").remove();
    });
  }

 
  if (loading) return <h1> LOADING...</h1>;

  if (error) console.log(error);

  return (
    <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            
      <table className="table table-bordered table-striped table-dark">
      <thead>
        <tr>
        <th>Id</th>
        <th>Category</th>
        <th>Name</th>
        <th>Description</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Status</th>
        <th>Edit</th>
        <th>Delete</th>
        </tr>
      </thead>
        {<tbody>
            {data?.data.data.map((data , index) => {
             return (<tr  key={index}>{ }
               <td>{data.id}</td>
               <td>{data.category_id}</td>
               <td>{data.name}</td>
               <td>{data.description}</td>
               <td>{data.quantity}</td>
               <td>{data.price}</td>
               <td>{data.status}</td>
               <td>
               <Link to={`/EditProduct/${data.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button"  onClick={(e) => deleteStudent(e, data.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
              </tr>  
             )
            })
            }
            </tbody>
        }
      </table>
     
                        </div>
                    </div>
                </div>
            </div>
        
     {console.log(data?.data.data)} 
      <button onClick={refetch}> Refetch</button>
    </div>
  );
}

export default ProductTable;