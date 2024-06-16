import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./config/router.config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store,{persistor} from "./config/store.config"
import { LoadingComponent } from "./components/common";

const htmlRoot: HTMLElement=document.getElementById('root') as HTMLElement;

const RootElement=ReactDOM.createRoot(htmlRoot)

RootElement.render(
  <React.StrictMode>
   <Provider store ={store}>
    <PersistGate loading={<LoadingComponent/>} persistor={persistor}>
   <BrowserRouter>
  <RouterConfig/>
   </BrowserRouter>
   </PersistGate>
   </Provider>
</React.StrictMode>
)
