import React from "react";
import { Segment, Item, Button } from "semantic-ui-react";
import Moment from "moment";
import { User } from "../../../app/models/user";

interface Props {
   users: User[];
   selectUser: (id: number) => void;
   deleteUser: (id: number) => void;
   suspendUser: (suspend: boolean, id: number) => void;
}

export default function UserList({ users, selectUser, deleteUser, suspendUser }: Props) {
   return (
      <Segment>
         <Item.Group divided>
            {users.map(user => (
               <Item key={user.id}>
                  <Item.Content>
                     <Item.Header as="a">
                        {user.name !== null ? user.name : "N/A"}
                       <span style={{ marginLeft: '10px' }}>
                       {user.suspended && <a className="ui red mini label">Suspended</a>}
                        {<a className="ui teal mini label">Active</a>}
                       </span>
                     </Item.Header>
                     <Item.Meta>{user.email}</Item.Meta>
                     <Item.Description>
                        <div>
                           <small>Created On: {Moment(user.createDate).format("DD-MM-YYYY")}</small>
                        </div>
                     </Item.Description>
                     <Item.Extra>
                        <Button onClick={() => deleteUser(user.id)} size="small" floated="right" content="Delete" color="red" />
                        <Button onClick={() => selectUser(user.id)} size="small" floated="right" content="Edit" color="blue" />
                        <Button onClick={() => selectUser(user.id)} size="small" floated="right" content="Change Password" color="blue" />

                        {user.suspended && <Button onClick={() => suspendUser(false, user.id)} size="small" floated="right" content="Activate" color="green" />}
                        {<Button onClick={() => suspendUser(true, user.id)} size="small" floated="right" content="Suspend" color="yellow" />}
                        <Button onClick={() => selectUser(user.id)} size="small" floated="right" content="View" color="blue" />
                     </Item.Extra>
                  </Item.Content>
               </Item>
            ))}
         </Item.Group>
      </Segment>
   );
}
