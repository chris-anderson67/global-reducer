import React, { ReactElement, useContext } from 'react';

export type GlobalReducerState<StateT> = {[id: string]: StateT};

export type GlobalReducerFn<StateT, ActionT> = (state: GlobalReducerState<StateT>, action: ActionT) => GlobalReducerState<StateT>

export type GlobalReducerContext<StateT, ActionT> = React.Context<GlobalContextContent<StateT, ActionT>>;

type GlobalContextContent<StateT, ActionT> = {
  state: {[id: string]: StateT},
  dispatch: React.Dispatch<ActionT>
};

export function useGlobalReducerContext<StateT, ActionT>(context: GlobalReducerContext<StateT, ActionT>): [GlobalReducerState<StateT>, React.Dispatch<ActionT>] {
  const {state, dispatch} = useContext(context);
  return [state, dispatch];
}

export function createGlobalReducerContext<StateT, ActionT>(reducer: GlobalReducerFn<StateT, ActionT>): GlobalReducerContext<StateT, ActionT> {
  const emptyContext: GlobalContextContent<StateT, ActionT> = {
    state: {},
    dispatch: () => {}
  };
  return React.createContext(emptyContext);
}

export interface GlobalReducerContextProviderProps {
  contexts: Array<{
    context: GlobalReducerContext<any, any>, 
    state: GlobalReducerState<any>, 
    dispatch: React.Dispatch<any>
  }>;
  children: ReactElement;
}

export const GlobalReducerContextProvider = ({contexts, children}: GlobalReducerContextProviderProps) =>   
  contexts.reduce(
    (el, {context, state, dispatch}) => 
        <context.Provider value={{state, dispatch}}>
          {el}
        </context.Provider>, 
    children
  );