export interface AuthContextValues {
  isAuthed: boolean;
}

export interface typesProduct {
  productID: number;
  categoryID: number;
  person: string;
  type: string;
  picture: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  brand: string;
}

export interface typesProducts {
  categoryID: number;
}

export interface productCartListProps {
  products: typesProduct[];
  isLoading: boolean;
  error: string | null;
}

export interface typesProductCart {
  productID: number;
  person: string;
  picture: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  brand: string;
}
