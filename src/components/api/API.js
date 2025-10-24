import API_URL from "./apiURL";

export const API = {};
API.get = (endpoint) => callFetch(endpoint, "GET", null);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE", null);

const callFetch = async (endpoint, method, record) => {
  // Build request object
  let requestObj = { method: method };
  if (record)
    requestObj = {
      ...requestObj,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(record),
    };

  // Call Fetch
  try {
    const endpointAddress = API_URL + endpoint;
    const response = await fetch(endpointAddress, requestObj);
    const result = await response.json();
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
