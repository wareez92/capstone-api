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
    <div key={product.id}>
      <img src={product.img} />
      <div>
        <h1>{product.name}</h1>
        <FaHeart />
      </div>
      <h3>${product.price}</h3>

      <h3>
        <IoIosPricetag />
        Only {product.quantity} left in stock!{" "}
      </h3>
      <p>{product.details}</p>
      <section></section>
    </div>
  );
}
