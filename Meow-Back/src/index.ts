import { createApp } from "./createApp";

const app = createApp();

const port = 3001;

app.listen(port, () => {
	console.log(`Running on Port ${port}`);
});
