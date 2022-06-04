import axios from "axios";
import i18n from "i18next";
import Toast from "./Toast";

const getErrorMessage = (err) => {
  const errorStatuses = [401, 403, 404, 500];
  if (errorStatuses.includes(err.response?.status)) {
    switch (err.response.status) {
      case 401:
        return i18n.t("errors.noAuthenticated");
      case 403:
        return i18n.t("errors.noPermission");
      case 404:
        return i18n.t("errors.notFound");
      case 500:
        return i18n.t("error.serverError");
      default:
    }
  }
  if (err.response?.data?.msg) {
    return err.response?.data.msg;
  } else if (err.response?.data?.error) {
    return err.response?.data.error;
  }
  return err;
};

const SERVER = "http://localhost:8818/";

const headers = {
  "Access-Control-Allow-Origin": "*",
};

export const waxios = {
  get: (name, url, handleThen = () => null, handleCatch = () => null, params = {}) =>
    axios
      .get(SERVER + url, { headers: { ...headers }, params: params })
      .then((response) => {
        handleThen(response.data);
        return response.data;
      })
      .catch((err) => {
        handleCatch(err);
        const message = `${name}: ${getErrorMessage(err)}`;
        new Toast({ message, type: "danger" });
      }),
  post: (name, url, data, handleThen = () => null, handleCatch = () => null, withoutToast = false) =>
    axios
      .post(SERVER + url, data, { headers: { ...headers } })
      .then((response) => {
        handleThen(response.data);
        return response.data;
      })
      .catch((err) => {
        handleCatch(err);
        if (!withoutToast) {
          const message = `${name}: ${getErrorMessage(err)}`;
          new Toast({ message, type: "danger" });
        }
      }),
  put: (name, url, data, handleThen = () => null, handleCatch = () => null) =>
    axios
      .put(SERVER + url, data, { headers: { ...headers } })
      .then((response) => {
        handleThen(response.data);
        return response.data;
      })
      .catch((err) => {
        handleCatch(err);
        const message = `${name}: ${getErrorMessage(err)}`;
        new Toast({ message, type: "danger" });
      }),
  delete: (name, url, handleThen = () => null, handleCatch = () => null) =>
    axios
      .delete(SERVER + url, { headers: { ...headers } })
      .then((response) => {
        handleThen(response.data);
        return response.data;
      })
      .catch((err) => {
        handleCatch(err);
        const message = `${name}: ${getErrorMessage(err)}`;
        new Toast({ message, type: "danger" });
      }),
};
