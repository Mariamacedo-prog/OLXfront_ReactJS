import Cookie from "js-cookie";
import qs from "qs";

const BASEAPI = "http://alunos.b7web.com.br:501";

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

const apiFetchPut = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookie.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "PUT",
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
const apiFetchFile = async (endpoint, body) => {
  if (!body.token) {
    let token = Cookie.get("token");
    if (token) {
      body.append("token", token);
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    body,
  });

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
  register: async (name, stateLoc, email, password) => {
    const json = await apiFetchPost("/user/singup", {
      name,
      state: stateLoc,
      email,
      password,
    });

    return json;
  },
  getStates: async () => {
    const json = await apiFetchGet("/states");

    return json.states;
  },
  getCategories: async () => {
    const json = await apiFetchGet("/categories");

    return json.categories;
  },
  getAds: async (options) => {
    const json = await apiFetchGet("/ad/list", options);

    return json;
  },
  getAd: async (id, other = false) => {
    const json = await apiFetchGet("/ad/item", { id, other });

    return json;
  },
  addAd: async (fData) => {
    const json = await apiFetchFile("/ad/add", fData);

    return json;
  },
  userInfo: async (token) => {
    const json = await apiFetchGet("/user/me", token);

    return json;
  },
  updateUserInfo: async (name, email, state, password) => {
    let newInfo = {};
    if (name !== "") {
      newInfo.name = name;
    }
    if (email !== "") {
      newInfo.email = email;
    }
    if (state !== "") {
      newInfo.state = state;
    }
    if (password !== "") {
      newInfo.password = password;
    }

    const json = await apiFetchPut("/user/me", newInfo);

    return json;
  },
  updateAd: async (fData, editIndex) => {
    const json = await apiFetchFile(`/ad/${editIndex}`, fData);

    return json;
  },
};

export default () => OLXApi;
