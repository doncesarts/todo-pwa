import React from "react";
import { Switch, withRouter, Route } from "react-router-dom";
import Loadable from "react-loadable";

const loadingComponent = () => <div>Loading</div>;

const Profile = Loadable({
    loader: () =>
      import(/* webpackChunkName: "Profile" */ "../components/Profile"),
    loading: loadingComponent
  });
  
  const List = Loadable({
    loader: () =>
      import(/* webpackChunkName: "List" */ "../components/List"),
    loading: loadingComponent
  });

  const Routes = () => {
    return (
      <Switch>
        <Route component={Profile} exact path="/profile" />
        <Route component={List} exact path="/" />
      </Switch>
    );
  };
  
  export default withRouter(Routes);
  