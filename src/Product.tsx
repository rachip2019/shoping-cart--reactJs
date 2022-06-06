import * as React from 'react'

interface ProductProps {
    product: any
    addProduct: () => void;
}

const Product = ({ product, addProduct }: ProductProps) => {
    return (
        <div className="product">
            <br></br>
            <span className="bold">{product.name}</span>
            <br></br><br></br>
            <span>price: {product.price}</span>
            <br></br><br></br>
            <span className="pointer" onClick={addProduct}>add to cart</span>
        </div>
    )
}

export default Product;
