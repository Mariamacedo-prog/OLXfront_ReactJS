import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 class="text-6xl">Home</h1>
      Almost before we knew it, we had left the ground.
      <Link to="/about">Sobre</Link>
    </div>
  );
};

export default Home;
