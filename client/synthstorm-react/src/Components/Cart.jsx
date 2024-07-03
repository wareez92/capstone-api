import { useEffect, useState } from "react";
import { viewCart } from "../../API";

export default function Cart({ user }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const viewCartItems = async () => {
      try {
        const cartItems = await viewCart(user.id);
        if (cartItems) {
          setCart(cartItems);
          console.log("Cart Items:", cartItems);
        }
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    viewCartItems();
  }, []);

  return (
    <>
      <div>
        {cart.map((product) => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <h4>${product.price}</h4>
            <img src={product.img} alt={product.name} />
          </div>
        ))}
      </div>
    </>
  );
}
