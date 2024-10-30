import { useCallback, useState } from "react";
import { IoRemove, IoAdd, IoTrashOutline } from "react-icons/io5";

interface typesOrderItem {
  orderItems: any;
  orderItemID: number;
  picture: string;
  productName: string;
  brand: string;
  color: string;
  person: string;
  size: string;
  price: number;
}

const OrderItem = ({
  orderItems,
  orderItemID,
  picture,
  productName,
  brand,
  color,
  person,
  size,
  price,
}: typesOrderItem) => {
  const handleDelete = () => {
    orderItems.splice(orderItemID, 1);
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  };

  return (
    <div className="col-lg-8 mx-auto mb-5 shadow">
      <div className="card p-4">
        <div className="row">
          <div className="col-md-5 mx-auto flex justify-center items-center card-header shadow">
            <img src={`/src/images/${picture}`} className="img-fluid" />
          </div>

          <div className="col-md-7 flex mx-auto px-4 mt-2 justify-start items-start">
            <div className="row">
              <div className="col-12 card-title">
                <h1 className="mb-4 font-bold fs-5">{productName}</h1>
                <p className="mb-3">BRAND: {brand}</p>
                <p className="mb-3">PERSON: {person}</p>
                <p className="mb-3">COLOR: {color}</p>
                <p className="mb-3">SIZE: {size}</p>
              </div>
              <div className="row">
                <div className="col-8 flex justify-between mt-14">
                  <button onClick={handleDelete}>
                    <IoTrashOutline />
                    REMOVE
                  </button>
                </div>
                <div className="col-4 flex justify-end items-end mt-14">
                  <h3>
                    €<span id="itemvalue">{price}</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
