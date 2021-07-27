import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../helpers/OLXApi";
import AdItem from "../components/partials/AdItem";

const Ads = () => {
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
        <div className=" max-w-screen-lg m-auto flex">
          <div className="w-60 mr-1">
            <form method="GET">
              <input type="text" name="q" />

              <div>Estado:</div>
              <select name="state">
                <option></option>
                {stateList &&
                  stateList.map((i, k) => (
                    <option key={k} value={i.name}>
                      {i.name}
                    </option>
                  ))}
              </select>

              <div>
                Categoria:
                <ul>
                  {categories &&
                    categories.map((i, k) => (
                      <li key={k}>
                        <img src={i.img} alt={i.name} />
                        <span>{i.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </form>
          </div>
          <div className="flex-1">...</div>
        </div>
      </div>
    </>
  );
};

export default Ads;
