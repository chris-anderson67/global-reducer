import React, { useContext } from 'react';
export function useGlobalReducerContext(context) {
    var _a = useContext(context), state = _a.state, dispatch = _a.dispatch;
    return [state, dispatch];
}
export function createGlobalReducerContext(reducer) {
    var emptyContext = {
        state: {},
        dispatch: function () { }
    };
    return React.createContext(emptyContext);
}
export var GlobalReducerContextProvider = function (_a) {
    var contexts = _a.contexts, children = _a.children;
    return contexts.reduce(function (el, _a) {
        var context = _a.context, state = _a.state, dispatch = _a.dispatch;
        return React.createElement(context.Provider, { value: { state: state, dispatch: dispatch } }, el);
    }, children);
};
