import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../account/LoginForm";

export default observer(function HomePage() {
   const { accountStore, modalStore } = useStore();
   return (
      <Segment inverted textAlign="center" vertical className="masthead">
         <Container text>
            <Header as="h1" inverted>
               <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
               Test
            </Header>
            {accountStore.isLoggedIn ? (
               <>
                  <Header as="h2" inverted content="Welcome to Dashboard" />
                  <Button as={Link} to="/users" size="huge" inverted>
                     Go to Dashboard!
                  </Button>
               </>
            ) : (
               <>
                     <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                                Login!
                        </Button>
               </>
            )}
         </Container>
      </Segment>
   );
});
