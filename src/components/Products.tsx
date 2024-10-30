import useSWR from "swr";
import { useState } from "react";

export const useCategoryData = (categoryID: number, getById: any) => {
  const {
    data: cards = [],
    isLoading,
    error,
  } = useSWR(`products/category/${categoryID}`, getById);
  return { cards, isLoading, error };
};

export const useFilterCriteria = (initialFilter = "option1") => {
  const [filterCriteria, setFilterCriteria] = useState(initialFilter);

  const handlePriceChange = (newFilterCriteria: any) => {
    setFilterCriteria(newFilterCriteria);
  };

  return { filterCriteria, handlePriceChange };
};
