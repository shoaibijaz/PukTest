import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import UserDashboard from "../../features/users/dashboard/UserDashboard";
import { User } from "../models/user";
import NavBar from "./NavBar";

function App() {
   const [users, setUsers] = useState<User[]>([]);
   const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
   const [editMode, setEditMode] = useState(false);

   useEffect(() => {
      axios.get("https://localhost:7099/api/User").then(response => {
         setUsers(response.data);
      });
   }, []);

   function handleSelectUser(id: number) {
      setSelectedUser(users.find(x => x.id === id));
   }

   function handleCancelSelectUser() {
      setSelectedUser(undefined);
   }

   function handleFormOpen(id?: number) {
      id ? handleSelectUser(id) : handleCancelSelectUser();
      setEditMode(true);
   }

   function handleFormClose() {
      setEditMode(false);
   }

   function handleCreateOrEditUser(user: User) {
      user.id
          ? setUsers([...users.filter(x => x.id !== user.id), user])
          : setUsers([...users, { ...user, id: Math.random() }]);
      setEditMode(false);
      setSelectedUser(user);
   }

   function handleDeleteUser(id: number) {
      setUsers([...users.filter(x => x.id !== id)]);
   }

   function handleSuspendUser(suspend:boolean, id: number) {
      setUsers([...users.filter(x => x.id !== id)]);
   }


   return (
      <Fragment>
         <NavBar openForm={handleFormOpen} />
         <Container style={{ marginTop: "7em" }}>
            <UserDashboard
               users={users}
               selectedUser={selectedUser}
               selectUser={handleSelectUser}
               cancelSelectUser={handleCancelSelectUser}
               editMode={editMode}
               openForm={handleFormOpen}
               closeForm={handleFormClose}
               createOrEdit={handleCreateOrEditUser}
               deleteUser={handleDeleteUser}
               suspendUser={handleSuspendUser}
            />
         </Container>
      </Fragment>
   );
}

export default App;
