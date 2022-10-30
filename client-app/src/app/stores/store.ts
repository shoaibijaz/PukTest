import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    userStore: UserStore,
    commonStore: CommonStore,
    accountStore: AccountStore,
    modalStore: ModalStore,
}

export const store: Store = {
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    accountStore: new AccountStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}