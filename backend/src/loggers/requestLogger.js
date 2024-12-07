// requestLogger.js
const requestLogger = (req, res, next) => {
  console.log(`\n----- Incoming Request -----`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.originalUrl}`);
  console.log(`Headers:`, req.headers);

  // Log body if it exists
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`Body:`, req.body);
  } else {
    console.log("Body: None");
  }

  // Log query parameters if they exist
  if (Object.keys(req.query).length > 0) {
    console.log(`Query:`, req.query);
  } else {
    console.log("Query: None");
  }

  // Log file if uploaded (Multer or similar middleware should parse it)
  if (req.file) {
    console.log(`File:`, req.file);
  }

  console.log(`----------------------------\n`);
  next(); // Proceed to the next middleware or route handler
};

export default requestLogger;
