import OrderItem from "./OrderItem";

const OrderItemsList = ({ allOrderItems }: any) => {
  return (
    <div className="col-12">
      <div className="row gap-2">
        {allOrderItems.map((item: any, index: number) => (
          <OrderItem
            key={index}
            orderItems={allOrderItems}
            orderItemID={index}
            picture={item["picture"]}
            productName={item["productName"]}
            brand={item["brand"]}
            color={item["color"]}
            person={item["person"]}
            size={item["size"]}
            price={item["price"]}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderItemsList;
