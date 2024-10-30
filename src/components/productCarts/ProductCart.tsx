import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth.context";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import { typesProductCart } from "~/types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const addToOrderItems = (newItem: any, existingItems: any) => {
  const updatedItems = [...existingItems, newItem];
  return updatedItems;
};

const ProductCart = ({
  productID,
  person,
  picture,
  productName,
  color,
  size,
  price,
  brand,
}: typesProductCart) => {
  interface AuthContextValues {
    isAuthed: boolean;
  }
  const { isAuthed } = useAuth() as AuthContextValues;

  const [orderItems, setOrderItems] = useState([]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const storedOrderItems = JSON.parse(localStorage.getItem("orderItems"));
    if (storedOrderItems) {
      setOrderItems(storedOrderItems);
    }
  }, []);

  const handleAddToBag = () => {
    const newOrderItem = {
      productID,
      person,
      picture,
      productName,
      color,
      size,
      price,
      brand,
    };
    const updatedOrderItems = addToOrderItems(newOrderItem, orderItems);
    setOrderItems(updatedOrderItems);
    localStorage.setItem("orderItems", JSON.stringify(updatedOrderItems));
  };

  return (
    <Card
      className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 ease-in-out rounded"
      style={{ maxHeight: isExpanded ? "500px" : "300px" }}
    >
      <CardContent className="p-0">
        <div
          className="cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="relative w-full h-60">
            <img
              src={`/src/images/${picture}`}
              alt="Product Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex justify-between items-center text-white">
            <h3 className="text-sm font-semibold">{productName}</h3>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="p-4 border-t">
            <RadioGroup
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="flex flex-wrap gap-2 mb-4 text-white"
            >
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <div key={size}>
                  <RadioGroupItem
                    value={size}
                    id={`size-${size}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`size-${size}`}
                    className="flex items-center justify-center rounded-md border-2 border-muted bg-popover px-3 py-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button
              className="w-full bg-warning"
              onClick={handleAddToBag}
              disabled={!selectedSize}
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
            </Button>
          </div>
        )}
      </CardContent>

      {/*<div className="card border-dark mb-3" style={{ width: "18rem" }}>
        <img src={`/src/images/${picture}`} />
        <div className="card-body">
          <h1 className="card-title font-bold">{productName}</h1>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">BRAND: {brand}</li>
          <li className="list-group-item">COLOR: {color}</li>
          <li className="list-group-item">PERSON: {person}</li>
          <li className="list-group-item">SIZE: {size}</li>
        </ul>
        <div className="card-body row">
          <div className="col-8">
            {isAuthed ? (
              <button
                className="btn btn-dark"
                onClick={handleAddToBag}
                style={{ color: "white", textDecoration: "none" }}
              >
                Add to bag
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="btn btn-dark"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Add to bag
                </button>
              </Link>
            )}
          </div>
          <div className="col-4">
            <p>€{price}</p>
          </div>
        </div>
      </div>*/}
    </Card>
  );
};

export default ProductCart;
