import React, { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import UserDashboard from "../../features/users/dashboard/UserDashboard";
import agent from "../api/agent";
import { User } from "../models/user";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
   const [users, setUsers] = useState<User[]>([]);
   const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
   const [editMode, setEditMode] = useState(false);
   const [loading, setLoading] = useState(true);
   const [submitting, setSubmitting] = useState(false);

   useEffect(() => {
      agent.Users.list().then(response => {
         setUsers(response);
         setLoading(false);
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
       setSubmitting(true);
        if (user.id) {
            agent.Users.update(user).then(() => {
            //   setActivities([...activities.filter(x => x.id !== activity.id), activity])
            //   setSelectedActivity(activity);
            //   setEditMode(false);
            //   setSubmitting(false);
            })
          } else {
            agent.Users.create(user).then(() => {
              setUsers([...users, user])
              setSelectedUser(user);
              setEditMode(false);
              setSubmitting(false);
            })
          }
   }

   function handleDeleteUser(id: number) {
      setSubmitting(true);
        agent.Users.delete(id).then(() => {
          setUsers([...users.filter(x => x.id !== id)]);
          setSubmitting(false);
        })
   }

   function handleSuspendUser(suspend:boolean, id: number) {
      setUsers([...users.filter(x => x.id !== id)]);
   }

 if (loading) return <LoadingComponent content='Loading app' />
 
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
               submitting={submitting}
            />
         </Container>
      </Fragment>
   );
}

export default App;
