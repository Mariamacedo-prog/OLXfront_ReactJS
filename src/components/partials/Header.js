import React from "react";
import { Link } from "react-router-dom";

import { isLogged } from "../../helpers/AuthHandler";

const Header = () => {
  let logged = isLogged();

  return (
    <div class="h-16 bg-white border-2 border-solid border-gray-300">
      <div class="max-w-screen-lg m-auto flex">
        <div class="flex-1 flex items-center h-16">
          <Link to="/">
            <span class="text-4xl font-bold color text-red-600">O</span>
            <span class="text-4xl font-bold color text-green-600">L</span>
            <span class="text-4xl font-bold color text-blue-600">X</span>
          </Link>
        </div>
        <nav class="py-2">
          <ul class="flex items-center h-10">
            {logged && (
              <>
                <li class="mx-5 hover:text-gray-600">
                  <Link to="/my-account">Minha Conta</Link>
                </li>
                <li class="mx-5 hover:text-gray-600">
                  <Link to="/logout">Sair</Link>
                </li>

                <li class="mx-5">
                  <Link
                    to="/post-un-ad"
                    class="px-2 py-2 rounded bg-yellow-600 text-white transition duration-200 hover:bg-yellow-700"
                  >
                    Poste um anúncio
                  </Link>
                </li>
              </>
            )}

            {!logged && (
              <>
                <li class="mx-5 hover:text-gray-600">
                  <Link to="/signin">Login</Link>
                </li>
                <li class="mx-5 hover:text-gray-600">
                  <Link to="/singup">Cadastrar</Link>
                </li>
                <li class="mx-5">
                  <Link
                    to="/signin"
                    class="px-2 py-2 rounded bg-yellow-600 text-white transition duration-200 hover:bg-yellow-700"
                  >
                    Poste um anúncio
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
