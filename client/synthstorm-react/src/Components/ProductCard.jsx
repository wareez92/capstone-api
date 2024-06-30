export default function ProductCard({ product }) {
    if(product.quantity === 0) {return (
        <div key={product.id}>
      <img src={product.img} />

      <h1>{product.name}</h1>
      <h3>${product.price}</h3>
    <h4>Out of stock</h4>
      <section>
        <button>Heart</button>
      </section>
   </div>
)}
  return (
    <div key={product.id}>
      <img src={product.img} />

      <h1>{product.name}</h1>
      <h3>${product.price}</h3>
      <h3> Only {product.quantity} left in stock! </h3>
      <section>
        <button>Heart</button>
      </section>
    </div>
  );
}
