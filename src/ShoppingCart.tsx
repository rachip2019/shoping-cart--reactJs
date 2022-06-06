import { useState, useEffect } from 'react';
import * as React from 'react';
import { SelectedProduct } from './models';

interface ShoppingCartProps {
    selectedProducts: SelectedProduct[]
}

const ShoppingCart = ({ selectedProducts }: ShoppingCartProps) => {
    const [totalProducts, SetTotalProducts] = useState(0);
    const [totalAmount, SetTotalAmount] = useState(0);
    const [amountBeforeDiscount, SetAmountBeforeDiscount] = useState(0);

    useEffect(() => {
        calcTotalAmount();
    }, [selectedProducts]);

    function sum() {
        var sum = 0;
        for(var index in selectedProducts) {
            sum += (selectedProducts[index].price * selectedProducts[index].quantity); 
        }
        return sum;
    }

    const calcTotalAmount = () => {

        const totalProds = Object.keys(selectedProducts).length? totalProducts + 1: 0;
        // const totalAmt = (Object.keys(selectedProducts).reduce((total, item) => total = total + selectedProducts[item].quantity, 0));
        // const totalProds = (selectedProducts.reduce((total, currentItem) => total = total + currentItem.quantity, 0));
        SetTotalProducts(totalProds);
        const totalAmt = sum();
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
                    {Object.entries(selectedProducts).map(([key, product]) => (
                            <tr key={key}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.quantity * product.price}</td>
                            </tr>
                        )
                    )}
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
};

export default ShoppingCart;
