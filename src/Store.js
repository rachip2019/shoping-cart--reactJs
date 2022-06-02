import React, { useState, useRef } from "react";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";

function Store() {

    const [products, SetProducts] = useState([
        { name: 'item 1', price: 10, quantity: 0 },
        { name: 'item 2', price: 38, quantity: 0 },
        { name: 'item 3', price: 33, quantity: 0 },
        { name: 'item 4', price: 12, quantity: 0 },
        { name: 'item 5', price: 15, quantity: 0 },
        { name: 'item 6', price: 75, quantity: 0 },
        { name: 'item 7', price: 100, quantity: 0 },
        { name: 'item 8', price: 58, quantity: 0 },
        { name: 'item 9', price: 50, quantity: 0 },
        { name: 'item 10', price: 22, quantity: 0 },
        { name: 'item 11', price: 20, quantity: 0 },
    ]);

    const shoppingCartRef = useRef();

    const addProductToCart = (index) => {
        shoppingCartRef.current.addProductToCart(index);
    }

    return (
        <div>
            <h1>Welcome to the store!</h1>
            <div className="product-list">
                {products.map((product, index) => (
                    <Product key={index} product={product} addProduct={() => addProductToCart(index)}
                    ></Product>
                ))}
            </div>
            <ShoppingCart ref={shoppingCartRef} products={products}></ShoppingCart>
        </div>
    )
}

export default Store;
