import React, { useState, useEffect } from "react";
import useApi from "../helpers/OLXApi";
import { doLogin } from "../helpers/AuthHandler";

const SignUp = () => {
  const [name, setName] = useState("");
  const [stateLoc, setStateLoc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [stateList, setStateList] = useState("");

  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState("");

  const api = useApi();

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };

    getStates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");

    if (password !== confirmPassword) {
      setErrors("Senhas não batem.");
      setDisabled(false);
      return;
    }

    const json = await api.register(name, stateLoc, email, password);

    if (json.error) {
      setErrors(json.error);
    } else {
      doLogin(json.token);
      window.location.href = "/";
    }

    setDisabled(false);
  };

  //Style do tailwind geral da page
  const inputStyle =
    "w-full text-lg p-1 border-solid border-2 border-gray-300 rounded outline-none focus:border-gray-400 transition delay-150 duration-300";

  return (
    <div className="bg-gray-100 max-w-screen-lg m-auto ">
      <h1 className="text-4xl font-bold p-3.5">Cadastro</h1>
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
          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
              Nome completo
            </div>
            <div className="flex-1">
              <input
                className={inputStyle}
                type="text"
                disabled={disabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
              Estado
            </div>
            <div className="flex-1">
              <select
                value={stateLoc}
                onChange={(e) => setStateLoc(e.target.value)}
                required
              >
                <option></option>
                {stateList &&
                  stateList.map((i, key) => (
                    <option key={key} value={i._id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>
          </label>

          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
              E-mail
            </div>
            <div className="flex-1">
              <input
                className={inputStyle}
                type="email"
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
              Senha
            </div>
            <div className="flex-1">
              <input
                className={inputStyle}
                type="password"
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="flex flex-col w-full sm:flex-row sm:items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-left sm:text-right">
              Confirmar senha
            </div>
            <div className="flex-1">
              <input
                className={inputStyle}
                type="password"
                disabled={disabled}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="flex flex-col sm:flex-row items-center p-3.5 max-w-screen-sm">
            <div className="sm:w-48 pr-5 font-bold text-lg sm:text-right"></div>
            <div className="flex-1 w-full">
              <button
                className="px-2 w-full sm:w-48 py-1 rounded text-lg bg-blue-600 text-white transition duration-200 hover:bg-blue-700 "
                disabled={disabled}
              >
                Fazer Cadastro
              </button>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
