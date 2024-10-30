import { LogOut, User } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Link } from "react-router-dom";

export function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-dark text-warning rounded" data-cy="user">
          {localStorage.getItem("userName")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-dark text-light">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/Profile" data-cy="headerlink_profilepage">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <Link to="/logout" data-cy="headerlink_logout">
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
