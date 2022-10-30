import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Container, Divider, Form, Header, Message } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
   
   const { accountStore, modalStore } = useStore();

   const initialState =  {
      email: "",
      password: "",
      displayName: "",
      username: "",
  };

   const [user, setUser] = useState(initialState);

   function handleSubmit() {
      accountStore.login(user);
   }

   function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const { name, value } = event.target;
      updateUserEntity(name, value);
   }

   function updateUserEntity(name: string, value: any) {
      setUser({ ...user, [name]: value });
   }

   return (
      <Container>
         <Header as="h2">Login</Header>

         <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Input required={true} type="mail" placeholder="Email" value={user.email} name="email" onChange={handleInputChange} />
            <Form.Input required={true} type="password" placeholder="Password" value={user.password} name="password" onChange={handleInputChange} />
            <Divider />
            <Button onClick={() => modalStore.closeModal()} floated="right" type="button" content="Close" style={{ marginBottom: 12 }} />
            <Button loading={accountStore.making} floated="right" positive type="submit" content="Submit" />
         </Form>

         {accountStore.accountErrors.length > 0 && <Message error header="There was some errors with your submission" list={accountStore.accountErrors} />}

      </Container>
   );
});
