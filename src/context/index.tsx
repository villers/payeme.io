import React, { createContext, useReducer } from "react";

export type IUser = {
  email: string | null;
  uid: string;
};

type Index = {
  authUser: IUser | null;
};

type Action = {
  type: string;
  payload: IUser | null;
};

type Dispatch = (action: Action) => void;

const initialState: Index = {
  authUser: null,
};

const stateReducer = (state: Index, action: Action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        authUser: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

type StateContextProviderProps = { children: React.ReactNode };
const StateContext = createContext<{ state: Index; dispatch: Dispatch } | undefined>(undefined);
const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

const useStateContext = () => {
  const context = React.useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { StateContextProvider, useStateContext };
