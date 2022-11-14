import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import miroutes from "./config/routes";
import AuthProvider from "./providers/authProvider";
import "./App.scss";

export default function App() {
  return (
    /* Siempre que naveguemos en el sistema se validara
    si estamos logueados */
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {miroutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.layout>
                  <route.component />
                </route.layout>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
