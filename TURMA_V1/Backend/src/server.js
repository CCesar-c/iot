const app = require("./app");
const cors = require("cors")
app.use(cors())

app.listen(3331, () => {
    console.log("Server is on")
    console.log("http://localhost:3331/")
});
