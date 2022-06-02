
function Product(props) {
    const product = props.product;

    return (
        <div className="product">
            <br></br>
            <span className="bold">{product.name}</span>
            <br></br><br></br>
            <span>price: {product.price}</span>
            <br></br><br></br>
            <span className="pointer" onClick={props.addProduct}>add to cart</span>
        </div>
    )
}

export default Product;
