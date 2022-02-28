const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const usersRouter = require("./routes/users");
app.use("/auth", usersRouter);

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
	});
});
