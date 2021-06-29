import React from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";

import Routes from "./Routes";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 ">
        <Header />

        <Routes />

        <Footer />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
