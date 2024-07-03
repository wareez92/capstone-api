import StarRating from "./StarRating";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  if (product.quantity === 0) {
    return (
      <div key={product.id}>
        <img src={product.img} />

        <h1>{product.name}</h1>
        <h3>${product.price}</h3>
        <h4>Out of stock</h4>
        <section>
          <button>Heart</button>
        </section>
      </div>
    );
  }
  return (
    <div key={product.id}>
      <Link to={`/products/${product.id}`} key={product.id}>
        <img src={product.img} />
      </Link>
      <h1>{product.name}</h1>

      <h3>${product.price}</h3>
      <StarRating />

      <h3> Only {product.quantity} left in stock! </h3>

      <section>
        <button>Heart</button>
      </section>
    </div>
  );
}
