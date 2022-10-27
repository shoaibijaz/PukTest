import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { User } from "../../../app/models/user";

interface Props {
   user: User | undefined;
   closeForm: () => void;
   createOrEdit: (user: User) => void;
}

export default function UserForm({ user: selectedUser, closeForm, createOrEdit }: Props) {
    
   const initialState = selectedUser ?? {
      id: 0,
      name: "",
      email: "",
      password: "",
      lastLogin: new Date(),
      createDate: new Date(),
      suspended: false
   };

   const [user, setUser] = useState(initialState);

   function handleSubmit() {
      createOrEdit(user);
   }

   function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const { name, value } = event.target;
      setUser({ ...user, [name]: value });
   }

   return (
      <Segment clearing>
         <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input placeholder="Name" value={user.name} name="name" onChange={handleInputChange} />
            <Form.Input placeholder="Email" value={user.email} name="email" onChange={handleInputChange} />

            {user.id <=0 &&
            <Form.Input placeholder="Password" value={user.password} name="password" onChange={handleInputChange} />
            }

            <Button floated="right" positive type="submit" content="Submit" />
            <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
         </Form>
      </Segment>
   );
}
