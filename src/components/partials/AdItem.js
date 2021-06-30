import React from "react";
import { Link } from "react-router-dom";

export default (props) => {
  let price = "";

  if (props.data.priceNegotiable) {
    price = "Preço negociável";
  } else {
    price = `R$ ${props.data.price}`;
  }

  return (
    <div className="w-3/12">
      <Link
        to={`/ads/${props.data.id}`}
        className="block border-white bg-white border-solid border-2 m-2 p-3 rounded transition delay-100 duration-100 hover:border-gray-300 "
      >
        <div>
          <img
            src={props.data.image}
            alt={props.data.title}
            className="w-full rounded"
          />
        </div>
        <div className="font-bold">{props.data.title}</div>
        <div>{price}</div>
      </Link>
    </div>
  );
};
