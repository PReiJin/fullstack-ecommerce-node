
export const validateActiveHandler = (user, res) => {
  if (user.active == false){
    return res.status(403).json({message: 'user is unactive'})
  }
}