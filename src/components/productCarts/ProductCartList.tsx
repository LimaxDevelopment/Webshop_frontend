import { typesProduct, productCartListProps } from "~/types";
import ProductCart from "./ProductCart";
import AsyncData from "../AsyncData";

const ProductCartList = ({
  products,
  isLoading,
  error,
}: productCartListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <AsyncData loading={isLoading} error={error}>
        {products.map((item: typesProduct, index: number) => (
          <ProductCart
            key={index}
            productID={item.productID}
            person={item.person}
            picture={item.picture}
            productName={item.productName}
            color={item.color}
            size={item.size}
            price={item.price}
            brand={item.brand}
          />
        ))}
      </AsyncData>
    </div>
  );
};

export default ProductCartList;
