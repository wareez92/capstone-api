import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { fetchSingleProduct } from "../API";

export default function Product() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

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

  if (loading) return <h3>Loading...</h3>;
  if (!product) return <h3>404: Product not found</h3>;

  return (
    <>
      <div>
        <ProductCard key={product.id} product={product} />
      </div>
    </>
  );
}
