import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const ShoppingCart = forwardRef((props, ref) => {
    const [products, SetProducts] = useState([]);
    const [totalProducts, SetTotalProducts] = useState(0);
    const [totalAmount, SetTotalAmount] = useState(0);
    const [amountBeforeDiscount, SetAmountBeforeDiscount] = useState(0);

    useEffect(() => {
        SetProducts(props.products);
    }, [])

    useImperativeHandle(ref, () => ({
        addProductToCart
    }));

    const addProductToCart = (index) => {
        products[index].quantity += 1;
        SetProducts(products);
        calcTotalAmount();
    }

    const calcTotalAmount = () => {
        const totalProds = (products.reduce((total, currentItem) => total = total + currentItem.quantity, 0));
        SetTotalProducts(totalProds);
        const totalAmt = (products.reduce((total, currentItem) =>
            total = total + currentItem.quantity * currentItem.price, 0));
        if (totalProds >= 10) {
            SetAmountBeforeDiscount(totalAmt);
            SetTotalAmount(totalAmt * (100 - totalProds) / 100)
        } else {
            SetTotalAmount(totalAmt);
        }
    }

    return (
        <div className="shopping-cart">
            <h3>The shopping cart:</h3>
            <table style={{ margin: "auto" }}>
                <tr>
                    <th>product</th>
                    <th>quantity</th>
                    <th>sum</th>
                </tr>
                <tbody>
                    {products.map((product, index) => (
                        product.quantity > 0 ? (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.quantity * product.price}</td>
                            </tr>
                        ) : null
                    ))}
                </tbody>
            </table>
            {totalAmount === 0 && <span>empty</span>}
            <div style={{ marginTop: "30px" }}>
                {amountBeforeDiscount >= 10 &&
                    <div><span>amount before discount: {amountBeforeDiscount}</span><br />
                        <span>discount: {totalProducts}%</span><br /> </div>}
                <span>total amount: {totalAmount}</span>
            </div>

        </div>
    )
});

export default ShoppingCart;