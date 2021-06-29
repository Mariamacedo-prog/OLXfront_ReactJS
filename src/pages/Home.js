import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 max-w-screen-lg m-auto ">
      <h1 className="text-6xl">Home</h1>
      Almost before we knew it, we had left the ground.
      <Link to="/about">Sobre</Link>
    </div>
  );
};

export default Home;
