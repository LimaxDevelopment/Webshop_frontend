import Loader from "./Loader";
import Error from "./Error";
import React from "react";

export default function AsyncData({ loading, error, children }) {
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Error error={error} />
      {children}
    </>
  );
}
