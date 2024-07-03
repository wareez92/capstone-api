import StarRating from "./StarRating";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";

export default function SingleProductPage({ product }) {
  if (product.quantity === 0) {
    return (
      <div key={product.id}>
        <img src={product.img} />

        <h1>{product.name}</h1>
        <h3>${product.price}</h3>
        <h4>Out of stock</h4>
        <section>
          <FaHeart />
        </section>
      </div>
    );
  }
  return (
    <div className="product-card" key={product.id}>
      <img className="product-image" src={product.img} />
      <div>
        <h1>{product.name}</h1>
        <FaHeart className="heart"/>
      </div>
      <h3 className="stock">
        <IoIosPricetag />
        Only {product.quantity} left in stock!{" "}
      </h3>
      <h3>${product.price}</h3>

      <p>{product.details}</p>
      <section></section>
    </div>
  );
}
