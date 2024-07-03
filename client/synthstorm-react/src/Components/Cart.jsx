import { useEffect, useState } from "react";
import { viewCart } from "../../API";
import { Link } from "react-router-dom";
import { IoIosRemoveCircle } from "react-icons/io";
import Nav from "./Nav";
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
      <Nav />
      <main>
        <h1>Checkout</h1>
        <div className="section-container">
          <section className="my-cart">
            <h2>My Cart</h2>
            <table>
              {/*  */}

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

              {/*  */}

              <tbody>
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.img} width="105" alt={product.name} />
                    </td>
                    <td data-name="Item">{product.name}</td>
                    <td data-name="Price">{product.price}</td>
                    <td data-name="Quantity">
                      <input
                        name={product.name}
                        type="number"
                        step="1"
                        max={product.quantity}
                        min="0"
                        value="1"
                      />
                    </td>
                    <td data-name="Total">{}</td>
                    <td>
                      <button
                        type="button"
                        className="destructive"
                        alt={`remove ${product.name}`}
                      >
                        <IoIosRemoveCircle />
                      </button>
                    </td>
                  </tr>
                ))}

                {/*  */}

                <tfoot>
                  <tr>
                    <th colSpan="4" scope="row">
                      Total :
                    </th>
                    <td id="total">{}</td>
                  </tr>
                </tfoot>
              </tbody>
            </table>
          </section>

          {/*  */}

          <section className="summary">
            <h2>Summary</h2>
            <dl>
              <dt>Number of Items</dt>
              <dd id="itemQty">{}</dd>
            </dl>
            <div>
              <Link to="/orders" className="button primary">
                Proceed to Checkout
              </Link>
              <Link to="/account" className="button secondary">
                Continue Shopping
              </Link>
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
