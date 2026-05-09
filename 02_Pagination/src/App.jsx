import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("https://dummyjson.com/products?limit=500");
        const json = await data.json();
        setProducts(json.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const PAGE_SIZE = 12;
  const TOTAL_PRODUCTS = products.length;
  const PAGE_COUNT = Math.ceil(TOTAL_PRODUCTS / PAGE_SIZE);
  const START = selectedPage * PAGE_SIZE;
  const END = START + PAGE_SIZE;

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <h1 className="heading">Products List</h1>
      {!products.length ? (
        <h1>No Products Found</h1>
      ) : (
        <div className="product-container">
          {products.slice(START, END).map((product) => {
            return (
              <div className="product-card" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <small>{product.title}</small>
              </div>
            );
          })}
        </div>
      )}
      <div className="page-container">
        <button
          className="arrow"
          onClick={() => setSelectedPage((prev) => prev - 1)}
          disabled={selectedPage === 0 ? true : false}
        >
          ⬅️
        </button>
        {[...Array(PAGE_COUNT)].map((_, i) => (
          <button
            key={i}
            className={"page-no" + (selectedPage === i ? " active" : "")}
            onClick={() => setSelectedPage(i)}
          >
            {i}
          </button>
        ))}
        <button
          className="arrow"
          onClick={() => setSelectedPage((prev) => prev + 1)}
          disabled={selectedPage === PAGE_COUNT - 1 ? true : false}
        >
          ➡️
        </button>
      </div>
    </>
  );
}

export default App;
