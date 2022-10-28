import React from "react";
import { Grid } from "semantic-ui-react";
import { User } from "../../../app/models/user";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";
import UserList from "./UserList";

interface Props {
    users: User[],
    selectedUser: User | undefined;
    selectUser: (id: number) => void;
    cancelSelectUser: () => void;
    editMode: boolean;
    openForm: (id: number) => void;
    closeForm: () => void;
    createOrEdit: (user: User) => void;
    deleteUser: (id: number) => void;
    suspendUser: (suspend: boolean, id:number) => void;
    submitting:boolean,
}

export default function UserDashboard({ users, selectedUser,
    selectUser, cancelSelectUser, editMode, openForm, closeForm, createOrEdit, deleteUser, suspendUser, submitting }: Props) {
    return (
        <Grid>
           <Grid.Column width='10'>
                <UserList users={users}
                    selectUser={selectUser}
                    deleteUser={deleteUser}
                    suspendUser={suspendUser}
                    submitting={submitting}
                />
            </Grid.Column>
             <Grid.Column width='6'>
                {selectedUser && !editMode &&
                    <UserDetails
                        user={selectedUser}
                        cancelSelectUser={cancelSelectUser}
                        openForm={openForm} />
                }
                {editMode &&
                     <UserForm 
                     closeForm={closeForm} 
                     user={selectedUser} 
                     createOrEdit={createOrEdit}
                     submitting={submitting} />
                    }

            </Grid.Column> 
        </Grid>
    )
}