import onHeaders from "on-headers";

const responseLogger = (req, res, next) => {
  
  const originalSend = res.send;

  onHeaders(res, () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log(`Status: ${res.statusCode}`);
  });

  res.send = function (body) {
    console.log("Response Body:", body);
    return originalSend.call(this, body);
  };

  next();
};

export default responseLogger;
