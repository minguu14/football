import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
const mapScript = document.createElement("script");
const geoScript = document.createElement("script");

mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
  import.meta.env.VITE_CLIENT_ID
}`;
geoScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
  import.meta.env.VITE_CLIENT_ID
}&submodules=geocoder`;
geoScript.type = "text/javascript";

document.head.appendChild(mapScript);
document.head.appendChild(geoScript);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
