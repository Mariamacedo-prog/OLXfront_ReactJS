import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useApi from "../helpers/OLXApi";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import Modal from "../components/partials/Modal";

const MyAccont = () => {
  const fileField = useRef();
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState("");

  const [adStatus, setAdStatus] = useState("true");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);

  const [userInformation, setUserInformation] = useState({});
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const api = useApi();

  useEffect(() => {
    const getUserInformation = async () => {
      const info = await api.userInfo();
      setUserInformation(info);
    };

    getUserInformation();
  }, []);
  console.log(userInformation);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };

    getStates();
  }, []);

  const handleUserInfo = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");

    const json = await api.updateUserInfo(name, email, state, password);

    if (json.error) {
      setErrors(json.error);
    } else {
      history.push("/");
    }
    setDisabled(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");
    let errors = [];

    if (errors.length === 0) {
      const fData = new FormData();

      if (title !== "") {
        fData.append("title", title);
      }
      if (price !== "") {
        fData.append("price", price);
      }
      if (adStatus !== "true") {
        fData.append("status", adStatus);
      }

      if (category !== "") {
        fData.append("cat", category);
      }

      fData.append("priceneg", priceNegotiable);

      if (description !== "") {
        fData.append("desc", description);
      }

      if (fileField.current.files.length > 0) {
        for (let i = 0; i < fileField.current.files.length; i++) {
          fData.append("img", fileField.current.files[i]);
        }
      }

      const json = await api.updateAd(fData, editIndex);

      if (!json.error) {
        history.push(`/`);
        return;
      } else {
        setErrors(json.error);
      }
    } else {
      setErrors(errors.join("\n"));
    }

    setDisabled(false);
  };

  const handleNegotiable = (e) => {
    if (e.target.value === "Sim") {
      setPriceNegotiable(true);
    } else {
      setPriceNegotiable(false);
    }
  };

  const priceMask = createNumberMask({
    prefix: "R$ ",
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ".",
    allowDecimal: true,
    decimalSymbol: ",",
  });

  //Style do tailwind geral da page
  const inputStyle =
    "w-full text-sm p-1 border-solid border-2 border-gray-300 rounded outline-none focus:border-gray-400 transition delay-150 duration-300";

  return (
    <div className="bg-gray-100 max-w-screen-lg m-auto ">
      <div>
        {errors && (
          <div className="my-2.5 p-2.5 border-solid border-red-700 border-2 bg-red-300 ">
            {errors}
          </div>
        )}
        <h1 className="text-2xl font-bold py-3.5">Atualização de cadastro:</h1>

        <form
          className="bg-white rounded shadow-2xl p-3.5 border-2 border-gray-300"
          onSubmit={handleUserInfo}
        >
          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg  text-left sm:text-right">
              Nome:{" "}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="name"
                disabled={disabled}
                className={inputStyle}
                defaultValue={userInformation.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>

          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg  text-left sm:text-right">
              Email:
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="email"
                disabled={disabled}
                className={inputStyle}
                defaultValue={userInformation.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg  text-left sm:text-right">
              Estado atual {userInformation.state}:
            </div>
            <select
              name="state"
              className="w-20 text-lg p-1 border-solid border-2 border-gray-300 rounded outline-none focus:border-gray-400 transition delay-150 duration-300"
              defaultValue={userInformation.state}
              onChange={(e) => setState(e.target.value)}
            >
              <option></option>
              {stateList &&
                stateList.map((i, k) => (
                  <option key={k} value={i._id}>
                    {i.name}
                  </option>
                ))}
            </select>
          </label>

          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg  text-left sm:text-right">
              Nova senha:
            </div>
            <div className="flex-1">
              <input
                className={inputStyle}
                type="password"
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>

          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="sm:w-48 pr-5 font-bold text-lg  text-left sm:text-right"></div>
            <div className="flex-1  w-full">
              <button
                className="px-2 py-1 rounded  w-full sm:w-48 text-lg bg-blue-600 text-white transition duration-200 hover:bg-blue-700 "
                disabled={disabled}
              >
                Atualizar informações
              </button>
            </div>
          </label>
        </form>

        <h2 className="text-2xl font-bold py-3.5">Seus anúncios:</h2>
        <div className="flex flex-wrap">
          {userInformation.ads &&
            userInformation.ads.map(
              (i, k) =>
                i._doc.status !== "false" && (
                  <div key={k}>
                    <div className=" w-40 flex flex-col border-white bg-white border-solid border-2 m-2 p-3 rounded transition delay-100 duration-100">
                      <h1 className="font-bold text-sm">{i._doc.title}</h1>
                      {i._doc.images.length > 0 ? (
                        i._doc.images.map(
                          (i, k) =>
                            i.default === true && (
                              <img
                                key={k}
                                src={`http://localhost:3001/media/${i.url}`}
                                className="w-full rounded"
                                alt=""
                              />
                            )
                        )
                      ) : (
                        <img
                          src="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
                          className="w-full rounded"
                          alt=""
                        />
                      )}
                      <div onClick={() => setIsOpen(true)} className="flex">
                        <button
                          onClick={() =>
                            setEditIndex((editIndex) =>
                              editIndex === i._doc._id ? null : i._doc._id
                            )
                          }
                          className=" flex-1 my-2 px-1 py-1 rounded text-sm bg-blue-600 text-white transition duration-200 hover:bg-blue-700 "
                        >
                          Editar
                        </button>
                      </div>
                    </div>

                    {editIndex === i._doc._id && (
                      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        <form
                          className="bg-white rounded shadow-2xl sm:p-3.5 border-2 border-gray-300"
                          onSubmit={handleSubmit}
                        >
                          <label className="flex flex-col w-full sm:flex-row sm:items-center sm:p-3.5 max-w-screen-sm">
                            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
                              Título
                            </div>
                            <div className="flex-1">
                              <input
                                className={inputStyle}
                                type="text"
                                disabled={disabled}
                                value={title === "" ? i._doc.title : title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </div>
                          </label>

                          <label className="flex flex-col w-full sm:flex-row sm:items-center sm:p-3.5 max-w-screen-sm">
                            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
                              Categoria
                            </div>
                            <div className="flex-1">
                              <select
                                className={inputStyle}
                                disabled={disabled}
                                value={category === "" ? i.category : category}
                                onChange={(e) => setCategory(e.target.value)}
                              >
                                {categories &&
                                  categories.map((i, k) => (
                                    <option key={k} value={i.slug}>
                                      {i.name}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </label>

                          <label className="flex flex-col w-full sm:flex-row sm:items-center sm:p-3.5 max-w-screen-sm">
                            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
                              Preço
                            </div>
                            <div className="flex-1">
                              <MaskedInput
                                mask={priceMask}
                                className={inputStyle}
                                placeholder="R$ "
                                disabled={disabled || priceNegotiable === true}
                                defaultValue={i._doc.price}
                                onChange={(e) => setPrice(e.target.value)}
                              />
                            </div>
                          </label>

                          <label className="flex flex-col w-full sm:flex-row sm:items-center sm:p-3.5 max-w-screen-sm">
                            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
                              Preço negociável
                            </div>
                            <div className="flex-1">
                              <input
                                type="radio"
                                name="priceNeg"
                                value="Sim"
                                onClick={handleNegotiable}
                              />{" "}
                              Sim
                              <input
                                type="radio"
                                name="priceNeg"
                                value="Não"
                                onClick={handleNegotiable}
                              />{" "}
                              Não
                            </div>
                          </label>

                          <label className="flex flex-col w-full sm:flex-row sm:items-center sm:p-3.5 max-w-screen-sm">
                            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
                              Descrição
                            </div>
                            <div className="flex-1">
                              <textarea
                                className={`${inputStyle} h-32 resize-none`}
                                disabled={disabled}
                                value={
                                  description === ""
                                    ? i._doc.description
                                    : description
                                }
                                onChange={(e) => setDescription(e.target.value)}
                              ></textarea>
                            </div>
                          </label>

                          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
                            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
                              Imagens(1 ou mais)
                            </div>
                            <div className="flex-1">
                              <input
                                type="file"
                                disabled={disabled}
                                ref={fileField}
                                multiple
                              />
                            </div>
                          </label>

                          <label className="flex p-3.5 ">
                            <div className="flex px-2 rounded text-base bg-red-600 text-white transition duration-200 hover:bg-red-700 ">
                              Inativar Anúncio
                              <div className="flex-1">
                                <input
                                  type="checkbox"
                                  className="ml-3"
                                  disabled={disabled}
                                  onChange={() => setAdStatus("false")}
                                />
                              </div>
                            </div>
                          </label>

                          <label className="flex flex-col w-full sm:flex-row sm:items-center p-2 max-w-screen-sm">
                            <div className="sm:w-48 pr-5 font-bold text-lg text-left sm:text-right"></div>
                            <div className="flex-1 w-full">
                              <button
                                className="px-2 py-1 w-full sm:w-48 rounded text-lg bg-blue-600 text-white transition duration-200 hover:bg-blue-700 "
                                disabled={disabled}
                              >
                                Atualizar anúncio
                              </button>
                            </div>
                          </label>
                        </form>
                      </Modal>
                    )}
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default MyAccont;
