import SignIn from "../SignIn/SignIn";
import Contacts from "../Contacts/Contacts";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { setCurrentUser, loggedIn } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {IStore, IUser} from "../../types/types"
import "./App.css";

const  App:React.FC= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state:IStore) => state.login.isLoggedIn);

  const handleSignIn= (email:string, password:string) => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((result:IUser[]) => {
        if (result) {
          let resUser;
          resUser = result.find((user) => {
            if (user.email === email && user.password === password) {
              return true;
            }
            return false;
          });
          console.log(resUser);
          if (resUser) {
            dispatch(setCurrentUser(resUser));
            dispatch(loggedIn(true));
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(resUser));
            navigate("/contacts");
          } else {
            throw new Error("Неверно заполнено email или пароль");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Routes>
      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <Contacts></Contacts>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          isLoggedIn ? (
            <Navigate to="/contacts" />
          ) : (
            <SignIn onSubmit={handleSignIn}></SignIn>
          )
        }
      />
    </Routes>
  );
}

export default App;
