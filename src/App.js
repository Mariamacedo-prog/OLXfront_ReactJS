import React from "react";
import { connect } from "react-redux";

const App = (props) => {
  return (
    <div className="App">
      <p class="m-8 ">hello world</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    user: dispatch.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
