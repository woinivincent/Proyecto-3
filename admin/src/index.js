import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthAdminProvider from "./Context/AuthAdminContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthAdminProvider>
            <App />
        </AuthAdminProvider>
    </React.StrictMode>
);
