import React, { ReactElement } from 'react';
export declare type GlobalReducerState<StateT> = {
    [id: string]: StateT;
};
export declare type GlobalReducerFn<StateT, ActionT> = (state: GlobalReducerState<StateT>, action: ActionT) => GlobalReducerState<StateT>;
export declare type GlobalReducerContext<StateT, ActionT> = React.Context<GlobalContextContent<StateT, ActionT>>;
declare type GlobalContextContent<StateT, ActionT> = {
    state: {
        [id: string]: StateT;
    };
    dispatch: React.Dispatch<ActionT>;
};
export declare function useGlobalReducerContext<StateT, ActionT>(context: GlobalReducerContext<StateT, ActionT>): [GlobalReducerState<StateT>, React.Dispatch<ActionT>];
export declare function createGlobalReducerContext<StateT, ActionT>(reducer: GlobalReducerFn<StateT, ActionT>): GlobalReducerContext<StateT, ActionT>;
export interface GlobalReducerContextProviderProps {
    contexts: Array<{
        context: GlobalReducerContext<any, any>;
        state: GlobalReducerState<any>;
        dispatch: React.Dispatch<any>;
    }>;
    children: ReactElement;
}
export declare const GlobalReducerContextProvider: ({ contexts, children }: GlobalReducerContextProviderProps) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export {};
