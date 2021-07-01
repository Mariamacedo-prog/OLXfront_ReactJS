import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../helpers/OLXApi";

const AdPage = () => {
  const api = useApi();
  const [loadding, setLoadding] = useState(true);
  const { id } = useParams();

  return (
    <div className="bg-gray-100 max-w-screen-lg m-auto flex mt-5">
      <div className="flex-1 mr-3">
        <div className="bg-white mb-3 shadow-new rounded">
          <div>{loadding && <div className="h-72 bg-gray-300"></div>}</div>
          <div className=" p-4">
            <div>
              {loadding && <div className="h-6 mb-3 bg-gray-300"></div>}
            </div>
            <div>{loadding && <div className="h-28 bg-gray-300"></div>}</div>
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
