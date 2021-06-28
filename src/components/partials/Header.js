import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div class="h-16 bg-white border-2 border-solid border-gray-300">
      <div class="max-w-screen-lg m-auto flex">
        <div class="flex-1 flex items-center h-16">
          <Link to="/">
            <span class="text-4xl font-bold color text-red-600">O</span>
            <span class="text-4xl font-bold color text-green-600">L</span>
            <span class="text-4xl font-bold color text-blue-600">X</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
