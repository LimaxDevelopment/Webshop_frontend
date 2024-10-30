import useSWR from "swr";
import { getAll } from "../api";
import { Link } from "react-router-dom";
import { typesProduct } from "~/types";
import Header from "../components/Header";

const clothes = {
  1: "hoodies",
  2: "shirts",
  3: "trousers",
  4: "accessories",
};

const Home = () => {
  const { data: products = [] } = useSWR("products", getAll);

  const findProductByCategoryID = (categoryID: number) =>
    products.find((p: typesProduct) => p.categoryID === categoryID);

  return (
    <div>
      <Header />
      <div className="relative w-screen pt-28">
        <img
          src="/src/images/homeImg.jpg"
          className="card-img"
          style={{ height: "600px", objectFit: "cover" }}
        />
        <div className="flex card-img-overlay justify-center items-center">
          <h1 className="text-warning uppercase fw-bold fst-italic fs-1">
            Welcome to LiMax
          </h1>
        </div>
      </div>
      <div className="text-center">
        <h1 className="uppercase fw-bold fs-1 pt-5 pb-2">Overview</h1>
        <p className="fw-bold">______</p>
        <h3 className="fs-3 pt-4">Must Have Items</h3>
      </div>
      <div className="flex justify-center items-center py-5">
        <div className="col-md-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.entries(clothes).map(([key, item]) => {
              const product = findProductByCategoryID(Number(key));
              return (
                <Link key={key} to={`/${item}`} data-cy={`link_${item}_page`}>
                  <div
                    className="card border-warning border-2 mx-5"
                    style={{ width: "16rem" }}
                  >
                    <img
                      src={product ? `/src/images/${product.picture}` : ""}
                      alt={product?.productName || item}
                    />
                    <div className="bg-warning">
                      <h2 className="text-center m-3">
                        {product?.productName || ""}
                      </h2>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
