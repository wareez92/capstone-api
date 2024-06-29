export default function ProductCard({ product }) {

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
