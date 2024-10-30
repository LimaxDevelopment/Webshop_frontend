import { ShoppingCart, ShoppingBag } from "lucide-react";

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { Link } from "react-router-dom";

export function OrderButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-dark text-warning uppercase rounded">
          Order
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-dark text-light">
        <DropdownMenuLabel>See your order</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/cart" data-cy="headerlink_cart">
            <DropdownMenuItem>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Order</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
