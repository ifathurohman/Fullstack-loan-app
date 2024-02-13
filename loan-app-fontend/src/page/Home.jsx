import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDeatils } from "../redux/actions/userAction";
import Hero from "../component/Hero";
import Footer from "../component/Footer";
import About from "../component/About";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserDeatils());
  }, [dispatch]);

  return (
    <>
      <div className="mx-auto">
        <div className="py-20">
          <Hero />
        </div>
        <About />
        <Footer />
      </div>
    </>
  );
};

export default Home;
