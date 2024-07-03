import { useEffect, useState } from "react";
import { viewCart } from "../../API";
import { Link } from "react-router-dom";

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
      <main>
        <h1>Checkout</h1>
        <div className="section-container">
          <section className="my-cart">
            <h2>My Cart</h2>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.img} width="105" alt={product.name} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <input
                        name={product.name}
                        type="number"
                        min="0"
                        max={product.quantity}
                        value="1"
                      />
                    </td>
                    <td>{}</td>
                    <td><button>Delete</button></td>
                  </tr>
                ))}
                <tfoot>
                  <tr>
                    <th></th>
                    <td></td>
                  </tr>
                </tfoot>
              </tbody>
            </table>
          </section>
          <section>
            <h2></h2>
            <dl>
              <dt></dt>
              <dd></dd>
            </dl>
            <div>
              <Link></Link>
              <Link></Link>
            </div>
          </section>
        </div>
      </main>
      <div>
        {/* {cart.map((product) => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <h4>${product.price}</h4>
            <img src={product.img} alt={product.name} />
          </div>
        ))} */}
      </div>
      <div></div>
    </>
  );
}
