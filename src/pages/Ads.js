import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useApi from "../helpers/OLXApi";
import AdItem from "../components/partials/AdItem";

let timer;

const Ads = () => {
  const api = useApi();
  const history = useHistory();

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
  const [opacity, setOpacity] = useState(100);
  const [loading, setLoading] = useState(true);

  const getAdsList = async () => {
    setLoading(true);

    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: "desc",
        limit: 12,
        q,
        cat,
        state,
      });
      setAdList(json.ads);
    };
    setOpacity(100);
    getRecentAds();

    setLoading(false);
  };

  useEffect(() => {
    const queryString = [];
    if (q) {
      queryString.push(`q=${q}`);
    }
    if (cat) {
      queryString.push(`cat=${cat}`);
    }
    if (state) {
      queryString.push(`state=${state}`);
    }

    history.replace({
      search: `?${queryString.join("&")}`,
    });

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(getAdsList, 2000);
    setOpacity(30);
  }, [q, cat, state, history]);

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
                onChange={(e) => setQ(e.target.value)}
              />

              <div className="my-2.5">Estado:</div>
              <select
                name="state"
                value={state}
                className="w-full h-10 px-4 rounded border-Verde border-2 outline-none "
                onChange={(e) => setState(e.target.value)}
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
                      onClick={() => setCat(i.slug)}
                    >
                      <img src={i.img} alt={i.name} className="w-6 h-6 mr-2" />
                      <span>{i.name}</span>
                    </li>
                  ))}
              </ul>
            </form>
          </div>
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold px-3.5">Resultados:</h2>
            {loading && (
              <div className="text-2xl p-3.5 self-center">Carregando...</div>
            )}
            {!loading && adList.length === 0 && (
              <div className="text-2xl p-3.5 self-center">
                Não encontrado nenhum resultado.
              </div>
            )}
            <div className={`flex flex-wrap opacity-${opacity}`}>
              {adList && adList.map((i, k) => <AdItem key={k} data={i} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ads;
