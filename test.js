const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTQ2OTkxMTEsImV4cCI6MTY1NDk1ODMxMX0.9Zqo1aXlGwe_6x929gkssKfvmZQ71IwpK3jdV6cmMBQ";

jwt.verify(token, "SECRETSTRING", async (err, decodedToken) => {
    console.log(decodedToken);
});