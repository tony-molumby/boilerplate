//needs work!!!!

import {REGISTER_USER} from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}