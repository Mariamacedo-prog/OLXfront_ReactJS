import React, { useState } from "react";
import useApi from "../helpers/OLXApi";
import { doLogin } from "../helpers/AuthHandler";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPssword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState("");

  const api = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const json = await api.login(email, password);

    if (json.error) {
      setErrors(json.error);
    } else {
      doLogin(json.token, rememberPassword);
      window.location.href = "/";
    }
  };

  return (
    <div class="bg-gray-100 max-w-screen-lg m-auto ">
      <h1 class="text-4xl font-bold p-3.5">Login</h1>
      <div>
        <form
          class="bg-white rounded shadow-2xl p-3.5 border-2 border-gray-300"
          onSubmit={handleSubmit}
        >
          <label class="flex items-center p-3.5 max-w-screen-sm">
            <div class="w-48 pr-5 font-bold text-lg text-right">E-mail</div>
            <div class="flex-1">
              <input
                class="w-full text-lg p-1 border-solid border-2 border-gray-300 rounded outline-none focus:border-gray-400 transition delay-150 duration-300"
                type="email"
                disabled={disabled}
              />
            </div>
          </label>

          <label class="flex items-center p-3.5 max-w-screen-sm">
            <div class="w-48 pr-5 font-bold text-lg text-right">Senha</div>
            <div class="flex-1">
              <input
                class="w-full text-lg p-1 border-solid border-2 border-gray-300 rounded outline-none focus:border-gray-400 transition delay-150 duration-300"
                type="password"
                disabled={disabled}
              />
            </div>
          </label>

          <label class="flex items-center p-3.5 max-w-screen-sm">
            <div class="w-48 pr-5 font-bold text-lg text-right">
              Lembrar senha
            </div>
            <div class="flex-1">
              <input type="checkbox" disabled={disabled} />
            </div>
          </label>

          <label class="flex items-center p-3.5 max-w-screen-sm">
            <div class="w-48 pr-5 font-bold text-lg text-right"></div>
            <div class="flex-1">
              <button
                class="px-2 py-1 rounded text-lg bg-blue-600 text-white transition duration-200 hover:bg-blue-700 "
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
