import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchSingleProduct } from "../../API";
import { addToCart } from "../../API";

export default function Product({ user }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

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
    console.log(productId, user.id);

    const cartItem = await addToCart(productId, user.id);
    // if (cartItem) {
    //   setCart((prevCart) => [...prevCart, cartItem]);
    //   console.log("Added Item:", cartItem);
    // }
  };

  if (loading) return <h3>Loading...</h3>;
  if (!product) return <h3>404: Product not found</h3>;

  return (
    <>
      <div>
        <ProductCard key={product.id} product={product} />
      </div>
      <div>
        <button onClick={addCart}>Add to Cart</button>
      </div>
    </>
  );
}
