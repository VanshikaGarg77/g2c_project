const jwt = require("jsonwebtoken");

const jwtAuth = (req, res) => {
  const full_token = req.headers["authorization"]; //keyword
  console.log(full_token);

  var ary = full_token.split(" ");

  let actualToken = ary[1];
  let isTokenValid;
  try {
    isTokenValid = jwt.verify(actualToken, process.env.SEC_KEY);
  } catch (err) {
    res.json({ status: false, msg: "Token Expired" });
    return;
  }

  if (isTokenValid) {
    console.log("*********************************************");
    const obj = jwt.decode(ary[1]);
    //req.user = user;
    //next()
    res.json({ status: true, msg: "**Aauthorized", item: obj });
  } else {
    res.json({ status: false, msg: "unauthorized" });
    return;
  }
};

module.exports = jwtAuth;
