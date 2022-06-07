import { useState, useEffect } from 'react';
import * as React from 'react';
import { SelectedProduct } from './models';

interface ShoppingCartProps {
    selectedProducts: Record<number, SelectedProduct>
}

const ShoppingCart = ({ selectedProducts }: ShoppingCartProps) => {
    const [totalProducts, SetTotalProducts] = useState(0);
    const [totalAmount, SetTotalAmount] = useState(0);
    const [amountBeforeDiscount, SetAmountBeforeDiscount] = useState(0);

    useEffect(() => {
        calcTotalAmount();
    }, []);

    function sumTotal() {
        var sum = 0;
        for(var index in selectedProducts) {
            sum += (selectedProducts[index].price * selectedProducts[index].quantity); 
        }
        return sum;
    }

    const calcTotalAmount = () => {
        const totalProds = Object.keys(selectedProducts).length? totalProducts + 1: 0;
        totalProducts = totalProds;
        const totalAmt = sumTotal();
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
