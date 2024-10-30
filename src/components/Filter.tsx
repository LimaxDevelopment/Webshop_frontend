import { useState } from "react";

const Filter = ({ products, onPriceChange }: any) => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const handlePriceChange = (e: any) => {
    setSelectedOption(e.target.value);
    onPriceChange(e.target.value);
  };
  const sortedPrices = products.sort((p1: any, p2: any) => {
    if (selectedOption === "option1") {
      return p1.price - p2.price;
    } else if (selectedOption === "option2") {
      return p2.price - p1.price;
    }
    return 0;
  });

  return (
    <div className="col-md-9 text-white">
      <h3 className="uppercase fw-bold mb-3">Sort By</h3>
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="price1"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={handlePriceChange}
          />
          <label className="form-check-label" htmlFor="price1">
            Price: low to high
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            id="price2"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handlePriceChange}
          />
          <label className="form-check-label" htmlFor="price2">
            Price: high to low
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
