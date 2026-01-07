import {body, validationResult, matchedData} from "express-validator"

export const validateUser=[
 body('username')
    .trim()
    .notEmpty().withMessage('username cannot be empty'),

    body("email")
    .trim()
    .isEmail().withMessage('enter a valid email'),
    
     body('password')
       .notEmpty().withMessage('password cannot be empty')
       .bail()
       .isLength({min:8}).withMessage('password must have at least 8 letters'),

       (req,res,next)=>{
         
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

 req.validatedData = matchedData(req)
 next()
       }
]


