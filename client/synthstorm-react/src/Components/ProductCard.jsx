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
        <section>
        </section>
      </div>
    );

      

  }
  return (
    <div key={product.id}>
      <Link to={`/products/${product.id}`} key={product.id}>
        <img src={product.img} />
      </Link>
      <div>
        <h1>{product.name}</h1>
        <FaHeart />
      </div>
      <h3>${product.price}</h3>
      <StarRating />

      <h3>
        <IoIosPricetag color="green" />
        Only {product.quantity} left in stock!{" "}
      </h3>

      <section></section>
    </div>
  );
}
