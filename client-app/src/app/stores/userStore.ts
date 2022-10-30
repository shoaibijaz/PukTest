import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User } from "../models/user";

export default class UserStore {
    userRegistry = new Map<number, User>();
    selectedUser: User | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    responseErrors =[]

    constructor() {
        makeAutoObservable(this)
    }

    get getUsers() {
        return Array.from(this.userRegistry.values()).sort(a => a.id);
    }

    loadUsers = async () => {
        try {
            const activities = await agent.Users.list();
            activities.forEach(user => {
                this.userRegistry.set(user.id, user);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectUser = (id: number) => {
        this.selectedUser = this.userRegistry.get(id);
    }

    cancelSelectedUser = () => {
        this.selectedUser = undefined;
    }

    openForm = (id?: number) => {
        id ? this.selectUser(id) : this.cancelSelectedUser();
        this.editMode = true;
        this.responseErrors = [];
    }

    closeForm = () => {
        this.editMode = false;
    }

    createUser = async (user: User) => {
        this.loading = true;

        try {

            const result = await agent.Users.create(user);

            runInAction(() => {
                if (result.isSuccess) {
                    this.responseErrors = [];
                    user.id = result.value;
                    this.userRegistry.set(user.id, user);
                    this.selectedUser = user;
                    this.editMode = false;
                }
                else{
                    this.responseErrors = result.errors??[];
                    console.log(this.responseErrors, result.errors)
                }

                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateUser = async (user: User) => {
        this.loading = true;
        try {
            const result = await agent.Users.update(user);
            runInAction(() => {
                if (result.isSuccess) {
                    this.responseErrors= [];
                    this.userRegistry.set(user.id, user);
                    this.selectedUser = user;
                    this.editMode = false;
                } else{
                    this.responseErrors = result.errors??[];
                    console.log(this.responseErrors, result.errors)
                }
                
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteUser = async (id: number) => {
        this.loading = true;
        try {
            const result = await agent.Users.delete(id);
            runInAction(() => {
                if (result.isSuccess) this.userRegistry.delete(id);
                if (this.selectedUser?.id === id) this.cancelSelectedUser();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}