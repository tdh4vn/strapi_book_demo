import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}