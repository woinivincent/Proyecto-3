import React, { useState } from "react";
import ProductList from "../../Components/ProductList/ProductList";


const Products = () => {
 

  return (
    <main className="main__products">
      <section className="container-products">
      
        <ProductList />
        
      </section>
    </main>
  );
};

export default Products;