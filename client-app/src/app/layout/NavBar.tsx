import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Container, Dropdown, Menu } from "semantic-ui-react";

import { useStore } from "../stores/store";

export default observer(function NavBar() {
   const { userStore, accountStore:{ user, logout } } = useStore();

   return (
      <Menu inverted fixed="top">
         <Container>
            <Menu.Item header>
               <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
               Exam App
            </Menu.Item>
            <Menu.Item name="Dashboard" />
            <Menu.Item>
               <Button
                  onClick={() => {
                     userStore.openForm();
                  }}
                  positive
                  content="Create User"
               />
            </Menu.Item>
            <Menu.Item position="right">
               <Dropdown pointing="top left" text={user?.name}>
                  <Dropdown.Menu>
                     <Dropdown.Item onClick={logout} text="Logout" icon="power" />
                  </Dropdown.Menu>
               </Dropdown>
            </Menu.Item>
         </Container>
      </Menu>
   );
})
