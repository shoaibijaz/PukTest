import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Segment, Item, Button, Label } from "semantic-ui-react";
import Moment from "moment";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityList() {
   const { userStore } = useStore();
   const { deleteUser, getUsers, loading } = userStore;

   const [target, setTarget] = useState("");

   function handleUserDelete(e: SyntheticEvent<HTMLButtonElement>, id: number) {
      setTarget(e.currentTarget.name);
      deleteUser(id);
   }

   return (
      <Segment>
         <Item.Group divided>
            {getUsers.map(user => (
               <Item key={user.id}>
                  <Item.Content>
                     <Item.Header as="a">
                        {user.name !== null ? user.name : "N/A"}
                        <span style={{ marginLeft: "10px" }}>
                           {user.suspended && (
                              <Label color="red" size="mini">
                                 Suspended
                              </Label>
                           )}
                           {!user.suspended && (
                              <Label color="teal" size="mini">
                                 Active
                              </Label>
                           )}
                        </span>
                     </Item.Header>
                     <Item.Meta>{user.email}</Item.Meta>
                     <Item.Description>
                        <div>
                           <small>Created On: {Moment(user.createDate).format("DD-MM-YYYY")}</small>
                        </div>
                     </Item.Description>
                     <Item.Extra>
                        <Button
                           name={user.id}
                           loading={loading && target === user.id.toString()}
                           onClick={e => handleUserDelete(e, user.id)}
                           floated="right"
                           content="Delete"
                           color="red"
                           size="small"
                        />

                        <Button onClick={() => userStore.selectUser(user.id)} size="small" floated="right" content="Edit" color="blue" />
                     </Item.Extra>
                  </Item.Content>
               </Item>
            ))}
         </Item.Group>
      </Segment>
   );
});
