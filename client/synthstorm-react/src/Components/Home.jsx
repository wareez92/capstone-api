import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import Login from "./Login";
import { fetchAllProducts } from "../../API";

export default function Home({user}) {
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
  // get value from options element
  // sort based on price highest or lowest
  // setFilteredProducts

  // o----RETURN----o

  return (
    <>
      <Login />
      <div>
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

        {filteredProducts.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  );
}
