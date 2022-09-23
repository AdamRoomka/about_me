const mongoose = require("mongoose");
const app = require("./app");


const DB =
  "mongodb+srv://register:4j9XxUflxfnuedXi@registracija.sbm39.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Joined to DB...:)");
  });

const port = 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
