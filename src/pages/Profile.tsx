import { Separator } from "../components/ui/separator";
import { SidebarNav } from "../components/SidebarNav";
import { AccountForm } from "../components/Account";
import useSWR from "swr";
import { getById } from "../api";
import AsyncData from "../components/AsyncData";

const sidebarNavItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Hoodies",
    href: "/Hoodies",
  },
  {
    title: "Shirts",
    href: "/Shirts",
  },
  {
    title: "Trousers",
    href: "/Trousers",
  },
  {
    title: "Accessories",
    href: "/Accessories",
  },
  {
    title: "Add Item",
    href: "/Add_Item",
  },
];

export default function Profile() {
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(`users/${localStorage.getItem("userId")}`, getById);

  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-40 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <AsyncData loading={isLoading} error={error}>
              <AccountForm user={user} />
            </AsyncData>
          </div>
        </div>
      </div>
    </>
  );
}
