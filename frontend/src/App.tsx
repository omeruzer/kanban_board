import React from "react";
import Home from "./pages/Home";
import { Theme } from "@radix-ui/themes";
import { TaskProvider } from "./context/TaskContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <TaskProvider>
        <Theme>
          <Home />
        </Theme>
      </TaskProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
