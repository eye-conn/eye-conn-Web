// eslint-disable-next-line
import { BrowserRouter, Switch } from "react-router-dom";
import  { useState, useEffect } from "react";
import axios from "axios";

import Home from "./Components/Home";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Signup from "./Components/Signup";
import { Backdrop, CircularProgress } from "@mui/material";
import Account from "./Components/Account";
// import Updatedetails from "./Components/Updatedetails";
// import "./App.css";
// import Travelledger from "./Components/Travelledger";
// import Topup from "./Components/Topup/Topup";
// import PaymentStatus from "./Components/PaymentStatus";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .post(`${process.env.REACT_APP_HOST}/verifyToken`,{token:token})
      .then((response) => {
        setUserSession(response.data.token, response.data.username, response.data.name);
        setAuthLoading(false);
        setAuth(true);
        // socket.emit("test","hi");
        // setTimeout(()=>{socket.emit("test","1");setTimeout(()=>{socket.emit("test","2");setTimeout(()=>{socket.emit("test","3");setTimeout(()=>{socket.emit("test","4");setTimeout(()=>{socket.emit("test","5");},500);},500);},500);},500);},500);
      })
      .catch((error) => {
        if (error?.response?.status === 401 ) removeUserSession();
        setAuthLoading(false);
        setAuth(false);
      });
      return () => {
        // socket.disconnect({token: getToken()});
      }
  }, []);

  if (authLoading && getToken()) {
// return <div className="loadclass"><span className="loader-11"></span></div>;
return <>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={authLoading}
>
  <CircularProgress color="inherit" />
</Backdrop>
</>; }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar  auth={auth} 
          setAuth={setAuth}
          setAuthLoading={setAuthLoading}
           />
          {/* <Footer /> */}
          <div className="content">
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <PrivateRoute
                exact
                path="/"
                component={Home}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />
              {/* <Route path="/home" component={Home} /> */}
         
              <PublicRoute
                path="/home"
                component={Login}
              />
              <PublicRoute
                path="/login"
                component={Login}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />
              <PublicRoute
                path="/signup"
                component={Signup}
                // socket={socket}
              />
              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />
              <PrivateRoute
                path="/account"
                component={Account}
                setAuth={setAuth}
                setAuthLoading={setAuthLoading}
                // socket={socket}
              />
              </Switch>
          </div>
        </div>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
