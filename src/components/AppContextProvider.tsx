import { createContext, useState } from 'react';

export interface AppState {
  projectId?: string;
}

const setState = () => {};

const AppContext = createContext<[state: AppState, setState: (value: AppState) => void]>([{}, setState]);

const AppContextProvider = (props) => {
  const [state, setState] = useState<AppState>({});
  return <AppContext.Provider value={[state, setState]}>{props.children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
