import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import UserDashboard from "../../features/users/dashboard/UserDashboard";
import ModalContainer from "../dialogs/ModalContainer";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
   const { commonStore, accountStore } = useStore();
 
   useEffect(() => {
      if (commonStore.token) {
         accountStore.getUser().finally(() => commonStore.setAppLoaded());
      } else {
         commonStore.setAppLoaded();
      }
   }, [commonStore, accountStore]);

   if (!commonStore.appLoaded) return <LoadingComponent content="Loading app..." />;

   return (
      <>
         <ToastContainer position="bottom-right" hideProgressBar />
         <ModalContainer />
         <Route exact path="/" component={HomePage} />

         <Route
            path={"/(.+)"}
            render={() => (
               <>
                  <NavBar />
                  <Container style={{ marginTop: "7em" }}>
                     <Switch>
                        <Route exact path="/users" component={UserDashboard} />
                     </Switch>
                  </Container>
               </>
            )}
         />
      </>
   );
}

export default observer(App);
