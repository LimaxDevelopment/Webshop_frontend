import { getById } from "../api";
import { useCategoryData, useFilterCriteria } from "../components/Products";
import { typesProducts } from "~/types";
import Header from "../components/Header";
import Filter from "../components/Filter";
import ProductCartList from "../components/productCarts/ProductCartList";

const Products = ({ categoryID }: typesProducts) => {
  const { cards, isLoading, error } = useCategoryData(categoryID, getById);
  const { filterCriteria, handlePriceChange } = useFilterCriteria("option1");

  return (
    <div>
      <Header />
      <div className="mt-4 d-md-flex pt-32 bg-black min-h-screen">
        <div className="flex justify-center w-1/4">
          <Filter products={cards} onPriceChange={handlePriceChange} />
        </div>
        <div className="flex justify-center w-3/4">
          <ProductCartList
            products={cards}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
