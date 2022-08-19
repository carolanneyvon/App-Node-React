import FunActions from "../../fun/FunActions";
import { useApi } from "../../hook/useApi";
import FunActionActiveUser from "../../fun/FunActionActiveUser.js";
import { ENUM } from "../../../config/enum.config.js";

const UserRow = (props) => {
  const id = props.user.id;
  const login_role = "Administrateur"; //hack without role from login
  const api_path = `/users/${id}`;

  // eslint-disable-next-line
  const [user, setUser, apiDelete /*, pending, error*/] = useApi(
    api_path,
    {},
    "delete"
  );

  const onDelete = () => {
    apiDelete();
    const users_copy = [...props.users];
    users_copy.splice(props.index, 1);
    props.setUsers(users_copy);
    console.log(users_copy);
  };

  return (
    <tr>
      <td>{props.user.id}</td>
      <td>{props.user.lastname}</td>
      <td>{props.user.firstname}</td>
      <td>{props.user.role}</td>
      <td>{props.user.active}</td>
      <td>
        <FunActions role={props.role} id={id} onDelete={onDelete} />
        {login_role === ENUM.user.role.admin && (
          <FunActionActiveUser user={props.user} />
        )}
      </td>
    </tr>
  );
};

export default UserRow;
