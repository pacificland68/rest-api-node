import {get} from 'lodash'
import {Request, Response, NextFunction} from 'express'
import { verifyJwt } from '../utils/jwt.utils'
import { reIssueAccessToken } from '../service/session.service'

const deserializaUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/,"")

    console.log("accessToken", accessToken);

    const refreshToken = get(req, "headers.x-refresh")

    if(!accessToken){
        return next()
    }

    const {decoded, expired} = verifyJwt(accessToken)
    console.log("decoded2", decoded);

    if(decoded){
        res.locals.user = decoded
        return next()
    }

    if(expired && refreshToken){
        const newAccessToken = await reIssueAccessToken({refreshToken})
        if(newAccessToken){
            res.setHeader('x-access-token', newAccessToken)
        }

        const result = verifyJwt(newAccessToken)

        res.locals.user = result.decoded
        return next()
    }
    

    return next()
}

export default deserializaUser