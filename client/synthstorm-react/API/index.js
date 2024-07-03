// fetchAll

const fetchAllProducts = async () => {
  try {
    const response = await fetch(`/api/product`);
    const result = await response.json();
    if (result.error) throw result.error;
    return result;
  } catch (ex) {
    console.error("Uh oh, trouble fetching products!", ex);
  }
};

// fetchSingle

const fetchSingleProduct = async (productId) => {
  try {
    const response = await fetch(`/api/product/${productId}`);
    const result = await response.json();
    if (result.error) throw result.error;
    return result;
  } catch (ex) {
    console.error("Uh oh, trouble fetching product!", ex);
  }
};

// addToCart

const addToCart = async (userId, productId) => {
  try {
    const response = await fetch(`/api/users/${userId}/cart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem(`token`),
      },
    });
    const result = await response.json();
    if (result.error) throw result.error;
    return result;
  } catch (ex) {
    console.error(`Sorry couldn't add to cart`, ex);
  }
};

// viewCart

const viewCart = async (userId) => {
  const token = window.localStorage.getItem(`token`);

  try {
    const response = await fetch(`/api/users/${userId}/cart`, {
      headers: {
        authorization: token,
      },
    });
    const result = await response.json();
    if (result.error) throw result.error;
    console.log(result);
    return result;
  } catch (ex) {
    console.error(`Sorry couldn't add to cart`, ex);
  }
};
export { fetchAllProducts, fetchSingleProduct, addToCart, viewCart };
