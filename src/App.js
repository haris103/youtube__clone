import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import HomeScreen from "./components/Screens/HomeScreen/HomeScreen";
import LoginScreen from "./components/Screens/LoginScreen/LoginScreen";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Switch, Redirect } from "react-router-dom";
import "./_app.scss";
import NotFound from "./components/NotFound/notFound";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Watchscreen from "./components/Screens/Watchscreen/Watchscreen";
import SearchScreen from "./components/Screens/SearchScreen";
import SubscriptionScreen from "./components/Screens/SubscriptionScreen/SubscriptionScreen";

const Layout = ({ children }) => {
  const [sidebar, setToggle] = useState(false);
  const handleToggle = () => {
    // setToggle((value) => !value);
    setToggle(!sidebar);
  };
  return (
    <>
      <Header handleToggle={handleToggle} />
      <div className="app__container ">
        <Sidebar sidebar={sidebar} handleToggle={handleToggle} />
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
    </>
  );
};

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.authh);
  const history = useHistory();

  // For Protected Route
  useEffect(() => {
    if (!loading && !accessToken) {
      history.push("/auth");
    }
  }, [accessToken, loading, history]);
  return (
    <>
      {/* <Router> */}
      <Switch>
        <Route path="/" exact>
          <Layout>
            <HomeScreen />
          </Layout>
        </Route>
        <Route path="/search/:query" exact>
          <Layout>
            <SearchScreen />
          </Layout>
        </Route>
        <Route path="/auth" exact>
          <LoginScreen />
        </Route>
        {/* <Route path="/not-found">
          <NotFound />
        </Route> */}
        <Route path="/watch/:id" exact>
          <Layout>
            <Watchscreen />
          </Layout>
        </Route>
        <Route path="/feed/subscriptions" exact>
          <Layout>
            <SubscriptionScreen />
          </Layout>
        </Route>
        <Route>
          <Redirect to="/" exact />
        </Route>

        {/* <Redirect to="/" exact /> */}
        {/* <Redirect to="/home" /> */}
      </Switch>
      {/* </Router> */}
    </>
  );
};

export default App;
