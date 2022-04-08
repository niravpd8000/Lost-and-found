/**
 *  file: apis.js
 *  author: Nirav Pravinbhai Dhameliya <ndj585@uregina.ca>
 *  version: 0.1
 *  date-created: March-21-2022
 *  last-modified: April-08-2022
 */

export const API = {
    SIGN_UP: "auth/signup",
    SIGN_IN: "auth/signin",
    GET_ITEM_LIST: "lostItem/list",
    GET_MY_ITEM_LISTING: "lostItem/list/currentUser",
    GET_CLAIMED_ITEM_LISTING: "lostItem/claimed",
    CREATE_ITEM: "lostItem/create",
    CLAIM_ITEM: "lostItem/claim",
    CLAIM_ITEM_RESPONSE: "lostItem/claim/response",
    CLAIM_ITEM_SUCCESS: "lostItem/claimed/success",
    GET_CLAIM_ITEM_BY_ID: "lostItem/claimed/getById",
    SEARCH_ITEM: "lostItem/search"
}