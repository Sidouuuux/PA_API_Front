import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";


import { toast } from "react-toastify";
import {
  Home,
  Agents,
  Listings,
  Login,
  Signup,
  Forgot,
  Agentt,
  Listing,
  Dashboard,
  UserProfile,
  Messages,
  Password,
  AddLisiting,
  AdminListingList,
  AdminAgentsList,
  AgentListing,
} from "./pages";

const App = () => {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/agents" component={Agents} />
        <Route exact path="/listing" component={Listings} />
        <Route exact path="/agent/:id" component={Agentt} />
        <Route exact path="/property/:id" component={Listing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} setAuth={setAuth}/>
        <Route exact path="/forgot-password" component={Forgot} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/change-password" component={Password} />
        <Route path="/add-listing/:id?" component={AddLisiting} />
        <Route path="/add-listing/:id?" component={AddLisiting} />
        <Route exact path="/all-listing" component={AdminListingList} />
        <Route exact path="/all-agents" component={AdminAgentsList} />
        <Route exact path="/mylisting" component={AgentListing} />
      </Switch>
    </Router>
  );
};

export default App;