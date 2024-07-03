import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchSingleProduct } from "../../API";
import { addToCart } from "../../API";
import Nav from "./Nav";
import { FaShoppingCart } from "react-icons/fa";
import SingleProductPage from "./SingleProductPage";

export default function Product({ user }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const { productId } = useParams();

  useEffect(() => {
    const getProductByID = async () => {
      const product = await fetchSingleProduct(productId);
      setProduct(product);
      console.log("Fetched product:", product);
      setLoading(false);
    };
    getProductByID();
  }, []);

  const addCart = async () => {
    console.log("product id:", productId, "user id:", user.id);
    const cartItem = await addToCart(user.id, productId);
  };

  if (loading) return <h3>Loading...</h3>;
  if (!product) return <h3>404: Product not found</h3>;

  const priceMultiply = async () => {
    // product.price *= event.target.value;
    product.quantity = product.quantity;
    product.quantity -= event.target.value;
  };

  return (
    <>
      <div>
        <Nav />
        <SingleProductPage key={product.id} product={product} />
      </div>
      <div>
        <button className="add-cart" onClick={addCart}>
          <FaShoppingCart />
          Add to Cart
        </button>
        <label> Quantity : </label>
        <input
          type="number"
          step="1"
          max={product.quantity}
          min="0"
          onChange={priceMultiply}
        />
        <button onClick={() => navigate("/account")}>Continue Shopping</button>
      </div>
    </>
  );
}
