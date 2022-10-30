import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Dropdown, DropdownProps, Form, Message, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityForm() {
   const { userStore } = useStore();
   const { selectedUser, closeForm, createUser, updateUser, loading, responseErrors } = userStore;

   const initialState = selectedUser ?? {
      id: 0,
      name: "",
      email: "",
      password: "",
      lastLogin: new Date(),
      createDate: new Date(),
      suspended: false,
      token:""
   };

   const [user, setUser] = useState(initialState);
 
   const suspendOptions = [
      { value: false, text: "Active" },
      { value: true, text: "Suspend" },
   ];

   function handleSubmit() {
      user.id ? updateUser(user) : createUser(user);
   }

   function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const { name, value } = event.target;
      updateUserEntity(name, value);
   }

   function updateUserEntity(name: string, value: any) {
      setUser({ ...user, [name]: value });
   }

   const handleChange = (event: React.SyntheticEvent<HTMLElement>, { value, name }: DropdownProps) => {
      updateUserEntity(name, value);
   };

   return (
      <Segment clearing>
         <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
               <Form.Input required={true} placeholder="Name" value={user.name} name="name" onChange={handleInputChange} />

               <Form.Input required={true} type="mail" placeholder="Email" value={user.email} name="email" onChange={handleInputChange} />
               {user.id <= 0 && (
                  <Form.Input required={true} type="password" placeholder="Password" value={user.password} name="password" onChange={handleInputChange} />
               )}
               {
                  <Dropdown
                     name="suspended"
                     placeholder="Select Status..."
                     fluid
                     selection
                     scrolling
                     options={suspendOptions}
                     onChange={handleChange}
                     defaultValue={user.suspended}
                     style={{ marginBottom: "10px" }}
                  />
               }
               <Button loading={loading} floated="right" positive type="submit" content="Submit" />
               <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
            </Form>
         </Segment>

         {responseErrors.length > 0 && <Message error header="There was some errors with your submission" list={responseErrors} />}
      </Segment>
   );
});
