import React, { useState, useRef, useEffect } from "react";
import useApi from "../helpers/OLXApi";
import { doLogin } from "../helpers/AuthHandler";

const AddAd = () => {
  const fileField = useRef();
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [price, setPrice] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState("");

  const api = useApi();

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };

    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");
    /* const json = await api.login(email, password);

    if (json.error) {
      setErrors(json.error);
    } else {
      doLogin(json.token, rememberPassword);
      window.location.href = "/";
    }*/
    setDisabled(false);
  };

  //Style do tailwind geral da page
  const inputStyle =
    "w-full text-lg p-1 border-solid border-2 border-gray-300 rounded outline-none focus:border-gray-400 transition delay-150 duration-300";

  return (
    <div className="bg-gray-100 max-w-screen-lg m-auto ">
      <h1 className="text-4xl font-bold p-3.5">Adicionar anúncio</h1>
      <div>
        {errors && (
          <div className="my-2.5 p-2.5 border-solid border-red-700 border-2 bg-red-300 ">
            {errors}
          </div>
        )}
        <form
          className="bg-white rounded shadow-2xl p-3.5 border-2 border-gray-300"
          onSubmit={handleSubmit}
        >
          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right">Título</div>
            <div className="flex-1">
              <input
                className={inputStyle}
                type="email"
                disabled={disabled}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right">
              Categoria
            </div>
            <div className="flex-1">
              <select
                className={inputStyle}
                disabled={disabled}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option></option>
                {categories &&
                  categories.map((i) => (
                    <option k={i._id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>

          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right">Preço</div>
            <div>...</div>
          </label>

          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right">
              Preço negociável
            </div>
            <div className="flex-1">
              <input
                type="checkbox"
                disabled={disabled}
                checked={priceNegotiable}
                onChange={() => setPriceNegotiable(!priceNegotiable)}
              />
            </div>
          </label>

          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right">
              Descrição
            </div>
            <div className="flex-1">
              <textarea
                className={`${inputStyle} h-40 resize-none`}
                disabled={disabled}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </label>

          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right">
              Imagens(1 ou mais)
            </div>
            <div className="flex-1">
              <input type="file" disabled={disabled} ref={fileField} multiple />
            </div>
          </label>

          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right"></div>
            <div className="flex-1">
              <button
                className="px-2 py-1 rounded text-lg bg-blue-600 text-white transition duration-200 hover:bg-blue-700 "
                disabled={disabled}
              >
                Adicionar anúncio
              </button>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
};

export default AddAd;
