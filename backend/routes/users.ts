import { Router, Request, Response, NextFunction } from 'express'
import data from '@data/data.json'
import { User } from '@types'
import { ObjectSchema, string, object } from 'yup'

const validateSchema: ObjectSchema<User> = object({
    email: string().email().defined(),
    number: string().optional(),
})

const validate = (schema: ObjectSchema<User>) => (req: Request, res: Response, next: NextFunction) => {
    const { email, number } = req.query
    schema.validate({ email, number })
        .then(() => next())
        .catch((err) => res.status(400).send(err.message))
}

const router = Router()

router.get('/', validate(validateSchema), (req: Request, res: Response) => {
    let { query: { number, email } } = req

    if(number !== undefined) {
      if((number as string).length > 6){
        number = (number as string).replace('-', '')
      }
    }

    setTimeout(() => {
        const result = data.filter((obj: User) => {
          if (!number) return obj.email === email

          return obj.email === email && obj.number === number
        })
    
        res.json(result)
      }, 5000)
})

export default router;