import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../helpers/OLXApi";

const Home = () => {
  const api = useApi();
  const [stateList, setStateList] = useState("");
  const [categories, setCategories] = useState("");

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };

    getStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };

    getCategories();
  }, []);

  return (
    <>
      <div className="bg-gray-200 py-5 border-b-2 border-solid border-gray-300">
        <div className=" max-w-screen-lg m-auto ">
          <div className="bg-Verde rounded-md shadow-lg flex py-5 px-4">
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
                {stateList &&
                  stateList.map((i, k) => (
                    <option key={k} value={i.name}>
                      {i.name}
                    </option>
                  ))}
              </select>
              <button className="bg-blue-400 h-10 px-5 text-white rounded-md hover:bg-blue-500 transition duration-150">
                Pesquisar
              </button>
            </form>
          </div>
          <div className="bg-gray-200 flex flex-wrap mt-5 ">
            {categories &&
              categories.map((i, k) => (
                <Link
                  key={k}
                  to={`/ads?cat=${i.slug}`}
                  className="w-3/12 flex items-center mb-5 h-12 hover:text-gray-500"
                >
                  <img src={i.img} alt={i.name} className="mr-2" />
                  <span>{i.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 max-w-screen-lg m-auto ">
        <h1>...</h1>
      </div>
    </>
  );
};

export default Home;
