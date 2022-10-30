import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default observer(function UserDashboard() {
   const { userStore } = useStore();
   const { selectedUser, editMode, loadUsers, userRegistry } = userStore;

   useEffect(() => {
       loadUsers();
    }, [userRegistry.size, loadUsers])
  
    if (userStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

   return (
      <Grid>
         <Grid.Column width="10">
            <UserList />
         </Grid.Column>
         <Grid.Column width="6">
            {selectedUser && !editMode && <UserDetails />}
            {editMode && <UserForm />}
         </Grid.Column>
      </Grid>
   );
});
