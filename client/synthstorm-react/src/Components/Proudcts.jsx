import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import Login from "./Login";
import { fetchAllProducts } from "../../API";
import Nav from "./Nav";

export default function Products({ user }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // --- getProducts ---

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchAllProducts();
      setProducts(products);
      setFilteredProducts(products);
    };
    getProducts();
  }, []);
  console.log(products);

  // --- InputChange ---

  const onInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredProducts);
  };
  // onSortChange

  const onSortChange = (event) => {
    const sortValue = event.target.value;
    console.log(sortValue);
    const currentProducts = [...filteredProducts];
    if (sortValue === "highest") {
      currentProducts.sort((a, b) => b.price - a.price);
    } else {
      currentProducts.sort((a, b) => a.price - b.price);
    }
    setFilteredProducts(currentProducts);
  };


  // o----RETURN----o

  return (
    <>
      <main id="main-account">
        <label key={products.id}>Quick Search </label>
        <input onChange={onInputChange} />

        {/* ~~~ Sort by price ~~~ */}

        <form key={products.id}>
          <label>Sort Items</label>
          <select onChange={onSortChange}>
            <option value="highest">Highest to lowest price</option>
            <option value="lowest">Lowest to highest price</option>
          </select>
        </form>

        {/*  */}
        <div className="card-container" >
          {filteredProducts.map((product) => (
            <div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
