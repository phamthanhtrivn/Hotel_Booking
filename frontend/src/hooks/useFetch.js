import { useState } from "react";

export const useFetch = (baseUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, options = {}, customHeaders = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(baseUrl + url, {
        headers: { "Content-Type": "application/json", ...customHeaders },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Network response was not ok");
      }
      return await response.json();
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  const get = (url, headers = {}) => request(url, { method: "GET" }, headers);
  const post = (url, data, headers = {}) =>
    request(url, { method: "POST", body: JSON.stringify(data) }, headers);
  const put = (url, data, headers = {}) =>
    request(url, { method: "PUT", body: JSON.stringify(data) }, headers);
  const del = (url, headers = {}) => request(url, { method: "DELETE" }, headers);

  return { isLoading, error, get, post, put, del };
};
