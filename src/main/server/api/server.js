import express from 'express';
import path from 'path';
import router from '../routes/servRoutes.js';
import { port, pathToDirFile } from "../configs/var.js";

const __dirname = path.resolve();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, pathToDirFile.staticFiles));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.resolve(__dirname, pathToDirFile.staticFiles)));
app.use(router);

app.listen(port.PORT, () => {
    console.log(`Server listening at http://localhost:${port.PORT}`);
})

