import React, { useState } from "react";
import useApi from "../helpers/OLXApi";

const Home = () => {
  const api = useApi();

  return (
    <>
      <div className="bg-gray-200 py-5 border-b-2 border-solid border-gray-300">
        <div className="bg-gray-100 max-w-screen-lg m-auto ">
          <div className="bg-Verde rounded-md shadow-lg flex py-5 px-3">
            <form method="GET" action="ads" className="flex flex-1 ">
              <input
                type="text"
                name="q"
                placeholder="O que você procura?"
                className="flex-1 h-10 outline-none mr-5 text-lg px-3 rounded-md"
              />
              <select
                name="state"
                className=" h-10 outline-none text-lg mr-5 rounded-md w-24 "
              >
                <option></option>
              </select>
              <button className="bg-blue-400 h-10 px-5 text-white rounded-md hover:bg-blue-500 transition duration-150 ">
                Pesquisar
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
      <div className="bg-gray-100 max-w-screen-lg m-auto ">
        <h1>...</h1>
      </div>
    </>
  );
};

export default Home;
