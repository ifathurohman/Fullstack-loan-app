import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./component/Header";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import SignIn from "./page/Signin";
import SignUp from "./page/SignUp";
import LoanHistory from "./page/LoanHistory";
import Admin from "./page/Admin";

import { useDispatch } from "react-redux";
import { setUserDeatils } from "./redux/actions/userAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserDeatils());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/loan-history" element={<LoanHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
