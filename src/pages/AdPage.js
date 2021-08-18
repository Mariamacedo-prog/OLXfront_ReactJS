import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import AdItem from "../components/partials/AdItem";
import "react-slideshow-image/dist/styles.css";
import useApi from "../helpers/OLXApi";

const AdPage = () => {
  const api = useApi();
  const [loadding, setLoadding] = useState(true);
  const [adInfo, setAdInfo] = useState({});
  const { id } = useParams();

  const formatDate = (date) => {
    let cDate = new Date(date);

    let monthName = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    let cDay = cDate.getDate();
    let cmonth = cDate.getMonth();
    let cYear = cDate.getFullYear();

    return `${cDay} de ${monthName[cmonth]} de ${cYear}`;
  };

  useEffect(() => {
    const getAdItem = async (id) => {
      const json = await api.getAd(id, true);
      setAdInfo(json);
      setLoadding(false);
    };
    getAdItem(id);
  }, []);

  return (
    <>
      {adInfo.category && (
        <div className="max-w-screen-lg m-auto flex mt-5 ">
          <p className="font-bold text-sm sm:text-base px-6 sm:px-0">
            Você está aqui:
            <Link to="/" className="hover:text-blue-700">
              {" "}
              Home
            </Link>{" "}
            /{" "}
            <Link
              to={`/ads?state=${adInfo.stateName}`}
              className="hover:text-blue-700"
            >
              {adInfo.stateName}
            </Link>{" "}
            /{" "}
            <Link
              to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}
              className="hover:text-blue-700"
            >
              {adInfo.category.name}{" "}
            </Link>
            / {adInfo.title}
          </p>
        </div>
      )}

      <div className="bg-gray-100 max-w-screen-lg m-auto flex mt-5 sm:flex-row flex-col">
        <div className="flex-1  m-auto sm:m-0 sm:mr-3">
          <div className="bg-white mb-3 shadow-new rounded flex w-80 sm:w-full sm:flex-row flex-col">
            <div className="w-80 h-80 ">
              {loadding && <div className="h-72 bg-gray-300"></div>}

              {adInfo.images && (
                <Slide>
                  {adInfo.images.map((img, k) => (
                    <div
                      key={k}
                      className="flex items-center justify-center h-80 bg-cover"
                    >
                      <img src={img} alt="" />
                    </div>
                  ))}
                </Slide>
              )}
            </div>

            <div className=" sm:p-4 flex-1 p-6 ">
              <div>
                {loadding && <div className="h-6 mb-3 bg-gray-300"></div>}
                {adInfo.title && (
                  <h2 className="text-2xl font-bold mt-2">{adInfo.title}</h2>
                )}
                {adInfo.dateCreated && (
                  <small className="text-gray-400">
                    Criado em {formatDate(adInfo.dateCreated)}
                  </small>
                )}
              </div>
              <div>
                {loadding && <div className="h-28 bg-gray-300"></div>}
                {adInfo.description && (
                  <div className="py-3 border-b-2 border-gray-300 ">
                    {adInfo.description}
                  </div>
                )}
                {adInfo.views && (
                  <small className="text-gray-400">
                    Visualizações: {adInfo.views}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sm:w-60 m-auto sm:m-0 w-80">
          <div className="bg-white mb-3 shadow-new rounded p-3 ">
            {loadding && <div className="h-6 bg-gray-300"></div>}
            {adInfo.priceNegotiable && <div>Preço negociável</div>}
            {!adInfo.priceNegotiable && adInfo.price && (
              <div>
                Preço:
                <span className="block text-lg text-blue-600 font-bold">
                  R$ {adInfo.price}
                </span>
              </div>
            )}
          </div>
          {loadding && <div className="h-20 bg-gray-300"></div>}
          {adInfo.userInfo && (
            <>
              <a
                href={`mailto:${adInfo.userInfo.email}`}
                target="_blank"
                className="flex justify-center bg-blue-600 text-white font-bold mb-3 rounded p-1 hover:bg-blue-700 transition duration-100"
              >
                Fale com o vendedor
              </a>
              <div className="bg-white mb-3 shadow-new rounded p-3">
                <p className="font-bold text-lg">{adInfo.userInfo.name}</p>
                <p className="mt-2">
                  <small className="text-sm text-gray-400 ">
                    E-mail: {adInfo.userInfo.email}
                  </small>
                </p>
                <p className="mt-2">
                  <small className="text-sm text-gray-400  ">
                    Estado: {adInfo.stateName}
                  </small>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-100 max-w-screen-lg m-auto flex mt-5 ">
        {adInfo.others && (
          <div className="flex-col ">
            <h2 className="text-xl font-bold mx-5">
              Outras ofertas do vendedor
            </h2>

            <div
              className="flex flex-wrap"
              onClick={() => window.location.reload()}
            >
              {adInfo.others.map((i, k) => (
                <AdItem key={k} data={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdPage;
