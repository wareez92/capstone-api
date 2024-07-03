import StarRating from "./StarRating";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosPricetag } from "react-icons/io";
import SingleProductPage from "./SingleProductPage";

export default function ProductCard({ product }) {
  if (product.quantity === 0) {
    return (
      <div key={product.id}>
        <img src={product.img} />

        <h1>{product.name}</h1>
        <h3>${product.price}</h3>
        <h4>Out of stock</h4>
        <section></section>
      </div>
    );
  }
  return (
    <div className="product-card" key={product.id}>
      <Link to={`/products/${product.id}`} key={product.id}>
        <img className="product-image" src={product.img} />
      </Link>
      <div className="name-heart">
        <h1>{product.name}</h1>
        <FaHeart className="heart" />
      </div>
      <div className="product-info"> 
        <h3>${product.price}</h3>
        <h3 className="stock">
          Only {product.quantity} left in stock!{" "}
          <IoIosPricetag color="green" />
        </h3>
        <StarRating />

      </div>
    </div>
  );
}
