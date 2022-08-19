import { useState, useEffect } from "react";
import axios from "axios";

export const useApi = (api_path, data_body, method = "get") => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const effectCallback = () => {
    if (api_path && !pending) {
      setPending(true);
      axios[method](api_path, data_body)
        .then((response) => {
          console.log(`useApi.${method}(${api_path}) response: `, response);
          setData(response.data);
        })
        .catch((error) => setError(error))
        .then(() => setPending(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return [data, setData, effectCallback, pending, error];
};

export const useApiEffect = (api_path, data_body, method = "get") => {
  const [data, setData, effectCallback, pending, error] = useApi(
    api_path,
    data_body,
    method
  );
  // componentDidMount equivalent
  useEffect(
    () => effectCallback(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [data, setData, pending, error];
};
