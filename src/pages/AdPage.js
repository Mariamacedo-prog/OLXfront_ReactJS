import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
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
    <div className="bg-gray-100 max-w-screen-lg m-auto flex mt-5">
      <div className="flex-1 mr-3">
        <div className="bg-white mb-3 shadow-new rounded flex">
          <div className="w-80 h-80">
            {loadding && <div className="h-72 bg-gray-300"></div>}

            {adInfo.images && (
              <Slide>
                {adInfo.images.map((img, k) => (
                  <div
                    key={k}
                    clasName="flex items-center justify-center h-80 bg-cover"
                  >
                    <img src={img} alt="" />
                  </div>
                ))}
              </Slide>
            )}
          </div>

          <div className=" p-4 flex-1">
            <div>
              {loadding && <div className="h-6 mb-3 bg-gray-300"></div>}
              {adInfo.title && (
                <h2 className="text-2xl font-bold mt-2">{adInfo.title}</h2>
              )}
              {adInfo.dateCreated && (
                <small className="text-gray-400">
                  {" "}
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

      <div className="w-60">
        <div className="bg-white mb-3 shadow-new rounded p-3">
          {loadding && <div className="h-6 bg-gray-300"></div>}
        </div>
        <div className="bg-white mb-3 shadow-new rounded p-3">
          {loadding && <div className="h-20 bg-gray-300"></div>}
        </div>
      </div>
    </div>
  );
};

export default AdPage;