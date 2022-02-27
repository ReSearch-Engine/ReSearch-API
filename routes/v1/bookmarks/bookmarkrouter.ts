import express from "express"
const bookmarkrouter = express.Router()

import listbookmarks from "./listuserbookmarks"
import listbookmarkcontent from "./listbookmarkcontent"
import createbookmark from "./createbookmark"
import deletebookmark from "./deletebookmark"
import createGroup from "./creategroup"
import deleteGroup from "./deletegroup"

/**
 * @url /v1/bookmarks/
 * @method GET
 * 
 */
bookmarkrouter.get("/" , listbookmarks)
/**
 * @url /v1/bookmarks/
 * @method GET
 * 
 */
bookmarkrouter.get("/:bookmarkgroupid/:bookmarkid", listbookmarkcontent)

/**
 * @url /v1/bookmarks/createbookmark
 * @method POST
 * @description This will create a bookmark
 * @param {string} groupid - ID of the bookmark group. This is put as a query string
 * @param {string} access_token - The access_token from google. This is put in the headers
 * @param {string} name - The name of the bookmark. This is put in the body
 * @param {string} url - The url of the bookmark. This is put in the body
 * @returns {object} - The bookmark info
 */
bookmarkrouter.post("/createbookmark", createbookmark)
/**
 * @url /v1/bookmarks/
 * @method DELETE
 * 
 */
bookmarkrouter.delete("/deletebookmark", deletebookmark)

/**
 * @url /v1/bookmarks/creategroup
 * @method POST
 * @description This will create a bookmark group
 * @param {string} access_token - The access_token from google. This is put in the headers
 * @param {string} group_name - The name of the bookmark group. This is put as a query string
 * @returns {object} - The bookmark group info
 * 
 */
bookmarkrouter.post("/creategroup", createGroup)
/**
 * @url /v1/bookmarks/deletegroup
 * @method DELETE
 * @description This will delete a bookmark group
 * @param {string} access_token - The access_token from google. This is put in the headers
 * @param {string} groupid - ID of the bookmark group. This is put as a query string
 * @returns {object} - The bookmark group info
 */
bookmarkrouter.delete("/deletegroup", deleteGroup)

export default bookmarkrouter

