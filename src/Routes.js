import React from "react";
import { Switch } from "react-router-dom";
import RouteHandler from "./components/RouteHandler";

import About from "./pages/About";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdPage from "./pages/AdPage";
import NotFound from "./pages/NotFound";
import MyAccont from "./pages/MyAccont";
import AddAd from "./pages/AddAd";

import Ads from "./pages/Ads";
export default () => {
  return (
    <Switch>
      <RouteHandler exact path="/">
        <Home />
      </RouteHandler>
      <RouteHandler exact path="/about">
        <About />
      </RouteHandler>
      <RouteHandler exact path="/signin">
        <SignIn />
      </RouteHandler>
      <RouteHandler exact path="/signup">
        <SignUp />
      </RouteHandler>
      <RouteHandler exact path="/ad/:id">
        <AdPage />
      </RouteHandler>

      <RouteHandler private exact path="/post-an-ad">
        <AddAd />
      </RouteHandler>

      <RouteHandler path="/ads">
        <Ads />
      </RouteHandler>

      <RouteHandler private exact path="/my-account">
        <MyAccont />
      </RouteHandler>

      <RouteHandler>
        <NotFound />
      </RouteHandler>
    </Switch>
  );
};
