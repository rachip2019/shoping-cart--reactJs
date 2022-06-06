import { useImperativeHandle, useState, Ref, forwardRef } from 'react';
import * as React from 'react';
import { ProductModel } from './models';

interface ShoppingCartProps {
    products: ProductModel[]
}

const ShoppingCart = forwardRef(({ products }: ShoppingCartProps, ref: Ref<{ addProductToCart: (index: number) => void }>) => {
    const [totalProducts, SetTotalProducts] = useState(0);
    const [totalAmount, SetTotalAmount] = useState(0);
    const [amountBeforeDiscount, SetAmountBeforeDiscount] = useState(0);


    useImperativeHandle(ref, () => ({
        addProductToCart
    }));

    const addProductToCart = (index: number) => {
        products[index + 1].quantity += 1;
        calcTotalAmount();
    }

    const calcTotalAmount = () => {
        const totalProds = (products.reduce((total, currentItem) => total = total + currentItem.quantity, 0));
        totalProducts = totalProds;
        const totalAmt = (products.reduce((total, currentItem) =>
            total = total + currentItem.quantity * currentItem.price, 0));
        if (totalProds > 10) {
            SetAmountBeforeDiscount(totalAmt);
            SetTotalAmount(amountBeforeDiscount * (100 - totalProds) / 100)
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
