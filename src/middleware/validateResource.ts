import {Request, Response, NextFunction} from 'Express'
import {AnyZodObject} from 'zod'

const valiate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) =>{
  try{
    schema.parse({
      body: req.body,
      query: req.params,
      params: req.params
    })
    next()
  }catch(e: any){
    return res.status(400).send(e.errors)
  }
}

export default valiate