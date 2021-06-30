import React, { useState } from "react";
import useApi from "../helpers/OLXApi";
import { doLogin } from "../helpers/AuthHandler";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState("");

  const api = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");
    const json = await api.login(email, password);

    if (json.error) {
      setErrors(json.error);
    } else {
      doLogin(json.token, rememberPassword);
      window.location.href = "/";
    }
    setDisabled(false);
  };

  //Style do tailwind geral da page
  const inputStyle =
    "w-full text-lg p-1 border-solid border-2 border-gray-300 rounded outline-none focus:border-gray-400 transition delay-150 duration-300";

  return (
    <div className="bg-gray-100 max-w-screen-lg m-auto ">
      <h1 className="text-4xl font-bold p-3.5">Login</h1>
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
            <div className="w-48 pr-5 font-bold text-lg text-right">E-mail</div>
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

          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right">Senha</div>
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

          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right">
              Lembrar senha
            </div>
            <div className="flex-1">
              <input
                type="checkbox"
                disabled={disabled}
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
              />
            </div>
          </label>

          <label className="flex items-center p-3.5 max-w-screen-sm">
            <div className="w-48 pr-5 font-bold text-lg text-right"></div>
            <div className="flex-1">
              <button
                className="px-2 py-1 rounded text-lg bg-blue-600 text-white transition duration-200 hover:bg-blue-700 "
                disabled={disabled}
              >
                Fazer Login
              </button>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
