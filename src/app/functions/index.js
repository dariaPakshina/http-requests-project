// prettier-ignore

const functions = require("firebase-functions");
const cors = require("cors")({origin: true});

// Example of an HTTP Cloud Function
exports.getData = functions.https.onRequest((req, res) => {
  // Enable CORS for this endpoint
  cors(req, res, () => {
    // Your function logic here
    res.status(200).send("CORS enabled response");
  });
});
