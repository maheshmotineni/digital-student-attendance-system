const axios = require("axios");

exports.verifyFace = async (imageBase64) => {
  try {
    const response = await axios.post(
      "http://localhost:6000/verify",
      { image: imageBase64 }
    );

    return response.data;
  } catch (error) {
    console.log("Face Service Error:", error.message);
    return { verified: false };
  }
};