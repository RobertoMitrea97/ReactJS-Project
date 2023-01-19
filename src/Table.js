import "./App.css";
import useFetch from "./Loader";

function Product() {
  const { data: product, loading, error, refetch } = useFetch(
    "http://localhost/api/products"
  );

  if (loading) return <h1> LOADING...</h1>;

  if (error) console.log(error);

  return (
    <div className="App">
      <h1>
        {product?.data} : {product?.name}
      </h1>
     {console.log(product?.data.data)} 
      <button onClick={refetch}> Refetch</button>
    </div>
  );
}

export default Product;