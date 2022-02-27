import { Request, Response } from "express";
import userData from "../../../schemas/user-data";
import { oauth2Client } from "../../../utils/googleclient";
import { nanoid } from "nanoid";
const createBookmark = async (req: Request, res: Response) => {
	const { access_token } = req.headers;
	const { bookmarkname, bookmarkdescription, bookmarkurl } = req.body;
	if (!access_token || !bookmarkdescription || !bookmarkname || !bookmarkurl)
		return res.status(400).json({
			message: "invalid parameters",
			status: 400,
			data: {},
		});
	const item = await oauth2Client
		.getTokenInfo(access_token as string)
		.catch((err) => {
			return undefined;
		});
	if (item === undefined)
		return res.status(400).json({
			message: "Invalid access_token",
			status: 400,
			data: {},
		});
	const currentDate = new Date();
	const tokenExpiry = new Date(item.expiry_date * 1000);
	if (currentDate > tokenExpiry)
		return res.status(400).json({
			message: "Invalid access_token",
			status: 400,
			data: {},
		});
	const userid = item.sub;
	await userData
		.findOneAndUpdate(
			{
				userid: userid,
			},
			{
				userid: userid,
				$push: {
					bookmarks: {
						bookmarkid: nanoid(15),
						bookmarkname: bookmarkname,
						bookmarkdescription: bookmarkdescription,
						bookmarkurl: bookmarkurl,
					},
				},
			},
			{
				upsert: true,
			}
		)
		.catch((err) => {
			return res.status(500).json({
				message: "Internal server error",
				status: 500,
				data: err,
			});
		});

	const userQuery = await userData.find({ userid: userid }).catch((err) => {
		return undefined;
	});
	if (userQuery === undefined)
		return res.status(500).json({
			message: "Internal server error",
			status: 500,
			data: {},
		});
	return res.status(200).json({
		message: "success",
		status: 200,
		data: {
			userData: userQuery[0],
		},
	});
};
export default createBookmark;
