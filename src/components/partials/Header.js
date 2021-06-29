import React from "react";
import { Link } from "react-router-dom";

import { isLogged } from "../../helpers/AuthHandler";

const Header = () => {
  let logged = isLogged();

  return (
    <div className="h-16 bg-white border-2 border-solid border-gray-300">
      <div className="max-w-screen-lg m-auto flex">
        <div className="flex-1 flex items-center h-16">
          <Link to="/">
            <span className="text-4xl font-bold color text-red-600">O</span>
            <span className="text-4xl font-bold color text-green-600">L</span>
            <span className="text-4xl font-bold color text-blue-600">X</span>
          </Link>
        </div>
        <nav className="py-2">
          <ul className="flex items-center h-10">
            {logged && (
              <>
                <li className="mx-5 hover:text-gray-600">
                  <Link to="/my-account">Minha Conta</Link>
                </li>
                <li className="mx-5 hover:text-gray-600">
                  <Link to="/logout">Sair</Link>
                </li>

                <li className="mx-5">
                  <Link
                    to="/post-un-ad"
                    className="px-2 py-2 rounded bg-yellow-600 text-white transition duration-200 hover:bg-yellow-700"
                  >
                    Poste um anúncio
                  </Link>
                </li>
              </>
            )}

            {!logged && (
              <>
                <li className="mx-5 hover:text-gray-600">
                  <Link to="/signin">Login</Link>
                </li>
                <li className="mx-5 hover:text-gray-600">
                  <Link to="/singup">Cadastrar</Link>
                </li>
                <li className="mx-5">
                  <Link
                    to="/signin"
                    className="px-2 py-2 rounded bg-yellow-600 text-white transition duration-200 hover:bg-yellow-700"
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
