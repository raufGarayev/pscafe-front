import { useContext, useEffect, useState } from 'react'
import Layout from './components/layout'
import Login from './pages/login';
import { AuthContext } from './context/authContext';
import { axiosInstance } from './services/api';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const token = localStorage.getItem("psToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          setUser(res.data);
          setLoading(false);
          setLoggedIn(true);
        } else {
          localStorage.removeItem("psToken");
          setLoggedIn(false);
          setLoading(false);
        }
      } catch (error: any) {
        localStorage.removeItem("psToken");
          setLoggedIn(false);
          setLoading(false);
      }
    };
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);



  return loading ? (
    <div>loading</div>
  ) : loggedIn ? (
    <>
      <Layout />
    </>
  ) : (
    <Login />
  );
}

export default App