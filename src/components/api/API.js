import API_URL from "./apiURL";

export const API = {};
API.get = (endpoint) => callFetch(endpoint, "GET", null);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE", null);

const getAuthHeader = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  } catch {
    return {};
  }
};

const callFetch = async (endpoint, method, record) => {
  const isFormData = record instanceof FormData;
  const authHeader = getAuthHeader();
  // Build request object
  let requestObj = { method: method };
  if (record) {
    if (isFormData) {
      requestObj = {
        ...requestObj,
        headers: { ...authHeader },
        body: record,
      };
    } else {
      requestObj = {
        ...requestObj,
        headers: { "Content-type": "application/json", ...authHeader },
        body: JSON.stringify(record),
      };
    }
  } else {
    requestObj = { ...requestObj, headers: { ...authHeader } };
  }

  // Call Fetch
  try {
    let result = null;
    const endpointAddress = API_URL + endpoint;
    const response = await fetch(endpointAddress, requestObj);
    if (response.status !== 204) result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true, result: result }
      : {
          isSuccess: false,
          message: `Error recovering records: status code ${response.status}`,
        };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export default API;
