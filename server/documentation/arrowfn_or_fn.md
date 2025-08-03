const changePassword = async function(req,res,next) {
  const {oldPassword, newPassword} = req.body;  //requirements in order to change the password

  if(!oldPassword || !newPassword) {
    return next(new AppError('Token is invalid or expired, Please try again', 400)); 
  }
};

---

const resetPassword = async (req,res,next) => {
    const {resetToken} = req.params;
    const{password} = req.body;
 
