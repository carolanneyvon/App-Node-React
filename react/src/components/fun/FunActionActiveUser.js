import { useState, useEffect } from "react";
import { useApi } from "../hook/useApi";
import { ENUM } from "../../config/enum.config.js";

const FunActionActiveUser = (props) => {
  const [toogle, setToogle] = useState(null);
  const [active, setActive] = useState(null);
  const [active_class, setActiveClass] = useState("");

  // ComponentDidMount only
  useEffect(() => {
    setActiveClass(props.user.active ? "btn-primary" : "btn-secondary");
    setActive(props.user.active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleButton = () => {
    setActive((value) => !value);
    setActiveClass((value) =>
      !value || value === "btn-primary" ? "btn-secondary" : "btn-primary"
    );
    setToogle((value) => !value);
  };

  // Custom hook useApi
  // eslint-disable-next-line
  const [data, setData, effectCallback /*, pending, error*/] = useApi(
    `/users/${props.user.id}`,
    { active: active },
    "put"
  );
  useEffect(() => {
    if (toogle !== null) {
      // do componentDidUpdate only
      effectCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toogle]);

  return (
    props.user.role === ENUM.user.role.dealer && (
      <button className={"btn ms-2 " + active_class} onClick={toggleButton}>
        {active ? "Actif" : "Inactif"}
      </button>
    )
  );
};

export default FunActionActiveUser;
