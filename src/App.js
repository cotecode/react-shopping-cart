import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

const App = () => {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  console.log(products);

  const sortProducts = (e) => {
    setSort(e.target.value);
  };

  const filterProducts = (e) => {
    setSize(e.target.value);
    // if (e.target.value === "") {
    //   setSize(e.target.value);
    //   setProducts(data.products);
    // } else {
    //   setSize(e.target.value);
    //   setProducts(
    //     data.products.filter(
    //       (product) => product.availableSizes.indexOf(e.target.value) >= 0
    //     )
    //   );
    // }
  };

  // Filtered size
  useEffect(() => {
    setProducts(
      size === ""
        ? data.products
        : data.products.filter(
            (product) => product.availableSizes.indexOf(size) >= 0
          )
    );
  }, [size]);

  // Filtered price
  useEffect(() => {
    setProducts(
      products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        )
    );
  }, [sort]);

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart!</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
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
