const jwt = require('jsonwebtoken');

const jwtAuthWithNext = (req,res,next) =>{

    const full_token = req.headers['authorization'];//keyword
    console.log(full_token);

    var ary=full_token.split(" ");

    let actualToken=ary[1];
    let isTokenValid;
    try{
     isTokenValid = jwt.verify(actualToken,process.env.SEC_KEY);
    }
    catch(err)
    {
      res.json({status:false,msg:"Token expired"});
        return;
    }
    if(isTokenValid)
      {
        console.log("*********************************************");
        const obj = jwt.decode(ary[1]);
        //console.log(obj);
        req.query.email = obj.result.email;
        

        next();
      
      }
    else{
        res.json({status:false,msg:"unauthorized"});
        return;
    }
}

module.exports=jwtAuthWithNext;
