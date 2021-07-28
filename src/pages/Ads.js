import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useApi from "../helpers/OLXApi";

const Ads = () => {
  const api = useApi();

  const useQueryString = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQueryString();

  const [q, setQ] = useState(query.get("q") != null ? query.get("q") : "");
  const [cat, setCat] = useState(
    query.get("cat") != null ? query.get("cat") : ""
  );
  const [state, setState] = useState(
    query.get("state") != null ? query.get("state") : ""
  );

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
              <input
                type="text"
                name="q"
                placeholder="O que você procura?"
                className="w-full h-10 px-4 rounded border-Verde border-2 outline-none"
                value={q}
              />

              <div className="my-2.5">Estado:</div>
              <select
                name="state"
                value={state}
                className="w-full h-10 px-4 rounded border-Verde border-2 outline-none "
              >
                <option></option>
                {stateList &&
                  stateList.map((i, k) => (
                    <option key={k} value={i.name}>
                      {i.name}
                    </option>
                  ))}
              </select>

              <div className="my-2.5">Categoria:</div>
              <ul>
                {categories &&
                  categories.map((i, k) => (
                    <li
                      key={k}
                      className={
                        cat === i.slug
                          ? "flex items-center cursor-pointer bg-Verde text-white w-full h-10 px-4 rounded"
                          : "flex items-center cursor-pointer hover:bg-Verde hover:text-white w-full h-10 px-4 rounded"
                      }
                    >
                      <img src={i.img} alt={i.name} className="w-6 h-6 mr-2" />
                      <span>{i.name}</span>
                    </li>
                  ))}
              </ul>
            </form>
          </div>
          <div className="flex-1">...</div>
        </div>
      </div>
    </>
  );
};

export default Ads;
