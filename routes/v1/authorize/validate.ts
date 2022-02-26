import { Request, Response } from 'express';
import { oauth2Client } from '../../../utils/googleclient';
const validate = async(req:Request, res:Response) => {
  const { access_token, id_token } = req.headers;
  if(!access_token) return res.status(400).json({
    message: "access_token required",
    status: 400,
    data: {}
  })
  if(!id_token) return res.status(400).json({
    message: "id_token is required",
    status: 400,
    data: {}
  })

  //Validate id_token
  const ticket = await oauth2Client.verifyIdToken({
    idToken: id_token as string
  }).catch(err => {
    return undefined
  })
  const idtokenvalid = async() => {
    const item = ticket?.getPayload()
    if(!item) return idtokeninvalid()
    const now = new Date()
    const exp = new Date(item.exp * 1000)
    if(now > exp) return idtokeninvalid()
    return res.status(200).json({
      message: "Success retrieve info from id_token",
      status: 200,
      data: {
        ...item
      }
    })
  }
  const idtokeninvalid = async() => {
    const item = await oauth2Client.getTokenInfo(access_token as string).catch(err => {
      return undefined
    })
    if(!item) return res.status(400).json({
      message: "Invalid access_token",
      status: 400,
      data: {}
    })
    const now = new Date()
    const exp = new Date(item.expiry_date * 1000)
    if(now > exp) return res.status(400).json({
      message: "access_token is expired",
      status: 400,
      data: {}
    })
    return res.status(200).json({
      message: "Success retrieve info from access_token",
      status: 200,
      data: {
        ...item
      }
    })
  }
  if(ticket) return idtokenvalid()
  return idtokeninvalid() 
}
export default validate