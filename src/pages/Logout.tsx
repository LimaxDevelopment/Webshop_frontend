import React, { useEffect } from "react";
import { useAuth } from "../contexts/Auth.context";
import { Link, Navigate } from "react-router-dom";

export default function Logout() {
  interface AuthContextValues {
    isAuthed: boolean;
    logout: any;
  }
  const { isAuthed, logout } = useAuth() as AuthContextValues;

  useEffect(() => {
    logout();
  }, [logout]);

  if (isAuthed) {
    return (
      <div className="container bg-dark text-light">
        <div className="row">
          <div className="col-12">
            <h1>Logging out...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-dark text-light">
      <div className="row">
        <div className="col-12">
          <h1>You were successfully logged out</h1>
          <button className="btn btn-warning">
            <Link to="/">Back to home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
