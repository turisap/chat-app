import * as types from "./types";

/**
 * Sets a given user object to the state
 * @param user
 * @returns {{type: string, user: *}}
 */
export const setUser = (user) => ({
    type : types.SET_USER,
    user
});