import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import Moment from "moment";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function UserDetails() {
   const { userStore } = useStore();
   const { selectedUser: user, openForm, cancelSelectedUser } = userStore;
   if (!user) return <LoadingComponent />;

   return (
      <Card fluid>
         {<Image src={`/assets/placeholder.png`} />}
         <Card.Content>
            <Card.Header>{user.name !== null ? user.name : "N/A"}</Card.Header>
            <Card.Meta>
               <span>{user.email}</span>
            </Card.Meta>
            <Card.Description>Created On: {Moment(user.createDate).format("DD-MM-YYYY")}</Card.Description>
         </Card.Content>
         <Card.Content extra>
            <Button.Group widths="2">
               <Button onClick={() => openForm(user.id)} basic color="blue" content="Edit" />
               <Button onClick={cancelSelectedUser} basic color="grey" content="Cancel" />
            </Button.Group>
         </Card.Content>
      </Card>
   );
}

