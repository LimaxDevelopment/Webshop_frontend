import { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import OrderItemsList from "../components/productCarts/OrderItemsList";
import useSWRMutation from "swr/mutation";
import { post } from "../api";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const userID = localStorage.getItem("userId");

const cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  let orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];
  useEffect(() => {
    const totalPrice = orderItems.reduce((accumulator: any, item: any) => {
      return accumulator + item["price"];
    }, 0);
    setTotalAmount(totalPrice.toFixed(2));
  }, []);

  const shipping = () => {
    if (totalAmount == 0) {
      return 0;
    } else if (totalAmount < 50) {
      return 20;
    }
    return 0;
  };
  const extra = shipping();
  const price = (Number(totalAmount) + Number(extra)).toFixed(2);

  const { trigger: placeOrderItem } = useSWRMutation("orders/orderItem", post);

  const { trigger: placeOrder } = useSWRMutation("orders", post);

  const checkout = useCallback(async () => {
    const orderID = await placeOrder({ userID });
    orderItems.forEach(async (orderItem: any) => {
      await placeOrderItem(orderID, orderItem.productID);
    });
    localStorage.removeItem(orderItems);
    alert("Congrats you order has been completed!");
  }, [placeOrder]);

  //Datum vandaag
  const today = new Date();

  // Datum van morgen
  const startPeriode = new Date();
  startPeriode.setDate(today.getDate() + 1);

  // Datum 2 dagen later
  const endPeriode = new Date();
  endPeriode.setDate(today.getDate() + 3);

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 justify-center">
            <div className="mt-5">
              <OrderItemsList allOrderItems={orderItems} />
            </div>
          </div>
          <div className="col-3 mt-5 mr-3">
            <div className="p-3 shadow text-white bg-dark">
              <h2 className="mb-5 font-bold fs-4">The Total Amount Of Order</h2>
              <div className="flex justify-between">
                <p>Product cost</p>
                <p>
                  €<span>{totalAmount}</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p>Shipping (Free from €50)</p>
                <p>
                  €<span>{extra}</span>
                </p>
              </div>
              <hr />
              <div className="flex justify-between font-bold mt-2 mb-3">
                <p>The total amount of order</p>
                <p>
                  €<span id="total_cart_amt">{price}</span>
                </p>
              </div>
              <button
                className="btn btn-warning text-uppercase"
                onClick={checkout}
              >
                Checkout
              </button>
            </div>

            <div className="mt-3 shadow p-3 text-white bg-dark">
              <div className="pt-3">
                <div className="mb-4 font-bold fs-4">
                  Expected delivery date
                </div>
                <p>
                  {months[startPeriode.getMonth()]} {startPeriode.getDate()}
                  {startPeriode.getDate() == 1 ? "st " : "th "}
                  {startPeriode.getFullYear()} - {months[endPeriode.getMonth()]}{" "}
                  {endPeriode.getDate()}
                  {endPeriode.getDate() == 1 ? "st " : "th "}
                  {endPeriode.getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;
