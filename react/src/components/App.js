import "../App.css";
import Nav from "./Nav";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FunLogin from "./login/FunLogin";
import AdminRoute from "./routes/admin.route";
import TraderRoute from "./routes/trader.route";
import BossRoute from "./routes/boss.route";
import NotFound from "./NotFound";

// Axios default api config values
axios.defaults.baseURL = "http://localhost:3001/api";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const App = () => {
  const [currentUser, setCurrentUser] = useState("");
  // eslint-disable-next-line
  const [userConnected, setUserConnected] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    setCurrentUser(currentUser);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("currentUser", currentUser);
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUserConnected(user);
      setUserRole(user.role);
      setIsConnected(true);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const admin = "Administrateur";
  const boss = "Patron";
  const dealer = "Commercial";
  const role = userRole;

  const role_view = () => {
    if (isConnected) {
      if (role === admin) {
        return <Route path="/*" element={<AdminRoute role={role} />} />;
      }
      if (role === boss) {
        return <Route path="/*" element={<BossRoute role={role} />} />;
      }
      if (role === dealer) {
        return <Route path="/*" element={<TraderRoute role={role} />} />;
      }
    }
  };

  return (
    <div className="App">
      <header>
        <Nav
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          setUserConnected={setUserConnected}
          role={role}
        />
      </header>
      {console.log("isConnected", isConnected)}
      {!isConnected ? (
        <main className="container mt-2">
          <Routes>
            <Route
              path="/*"
              element={
                <FunLogin
                  setIsConnected={setIsConnected}
                  setUserConnected={setUserConnected}
                />
              }
            />
          </Routes>
        </main>
      ) : (
        <main className="container mt-2">
          <Routes>
            {role_view()}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      )}
      <footer className="mt-4"></footer>
    </div>
  );
};

export default App;
