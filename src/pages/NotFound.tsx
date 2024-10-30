import React from "react";
import { useLocation } from "react-router-dom";
export const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <h1>Pagina niet gevonden</h1>
      <p>Er is geen pagina met als url {pathname}, probeer iets anders.</p>
    </div>
  );
};
