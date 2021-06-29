import Cookie from "js-cookie";
import qs from "qs";

const BASEAPI = "http://localhost:3001";

const apiFetchPost = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookie.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};
const apiFetchGet = async (endpoint, body = []) => {
  if (!body.token) {
    let token = Cookie.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const OLXApi = {
  login: async (email, password) => {
    const json = await apiFetchPost("/user/singin", { email, password });

    return json;
  },
};

export default () => OLXApi;
