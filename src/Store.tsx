import { useState, useEffect } from "react";
import * as React from 'react'
import Product from './Product';
import ShoppingCart from './ShoppingCart';
import { ProductModel, SelectedProduct } from "./models";


const Store = () => {
    
    const products: ProductModel[] = [
        { id: 1, name: 'item 1', price: 10 },
        { id: 2, name: 'item 2', price: 38 },
        { id: 3, name: 'item 3', price: 33 },
        { id: 4, name: 'item 4', price: 12 },
        { id: 5, name: 'item 5', price: 15 },
        { id: 6, name: 'item 6', price: 75 },
        { id: 7, name: 'item 7', price: 100 },
        { id: 8, name: 'item 8', price: 58 },
        { id: 9, name: 'item 9', price: 50 },
        { id: 10, name: 'item 10', price: 22 },
        { id: 11, name: 'item 11', price: 20 }
    ];

    const [selectedProducts, SetSelectedProducts] = useState<Record<number, SelectedProduct>>({});


    const addProductToCart = (product: ProductModel) => {
        const newProduct = selectedProducts[product.id] || {name: product.name, price: product.price, quantity: 0};
        SetSelectedProducts({...selectedProducts, [product.id]: {...newProduct, quantity: newProduct.quantity+1}});
    }

    return (
        <div>
            <h1>Welcome to the store!</h1>
            <div className="product-list">
                {products.map((product) => (
                    <Product key={product.id} product={product} addProduct={() => addProductToCart(product)}
                    ></Product>
                ))}
            </div>
            <ShoppingCart selectedProducts={selectedProducts}></ShoppingCart>
        </div>
    )
}

export default Store;
