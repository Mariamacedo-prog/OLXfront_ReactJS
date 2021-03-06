import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../helpers/OLXApi";
import AdItem from "../components/partials/AdItem";

const Home = () => {
  const api = useApi();
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);

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

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 8,
      });
      setAdList(json.ads);
    };
    getRecentAds();
  }, []);

  return (
    <>
      <div className="bg-gray-200 py-5 border-b-2 border-solid border-gray-300">
        <div className=" max-w-screen-lg m-auto ">
          <div className="bg-Verde rounded-md shadow-lg flex py-5 px-4">
            <form
              method="GET"
              action="/ads"
              className="flex flex-1 flex-col sm:flex-row"
            >
              <input
                type="text"
                name="q"
                placeholder="O que você procura?"
                className="flex-1 h-10 outline-none sm:mb-0 sm:mr-5 text-lg sm:px-3 rounded-md mb-3 p-1"
              />
              <select
                name="state"
                className=" h-10 outline-none text-lg mr-5 rounded-md sm:w-24 sm:mb-0 w-full mb-3 "
              >
                <option></option>
                {stateList &&
                  stateList.map((i, k) => (
                    <option key={k} value={i.name}>
                      {i.name}
                    </option>
                  ))}
              </select>
              <button type="submit" className="bg-blue-400 h-10 px-5 text-white rounded-md hover:bg-blue-500 transition duration-150">
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
                  className="sm:w-3/12 w-6/12 flex items-center mb-5 h-12 hover:text-gray-500"
                >
                  <img src={i.img} alt={i.name} className="m-2 " />
                  <span>{i.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 max-w-screen-lg m-auto ">
        <h2 className="text-2xl font-bold py-3.5 mx-2">Anúncios recentes</h2>
        <div className="flex flex-wrap ">
          {adList && adList.map((i, k) => <AdItem key={k} data={i} />)}
        </div>
        <Link to="/ads" className="font-bold m-3 inline-block ">
          Ver todos
        </Link>
        <p className="m-2 sm:text-base text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets.
        </p>
      </div>
    </>
  );
};

export default Home;
