<<<<<<< products-component
import React, { useState } from "react";
import Products from "./components/Products";
import data from "./data.json";

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

=======
// feature 1

function App() {
>>>>>>> master
  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart!</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
};

export default App;
