import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';

import router from './routes/index.js';

const app = express();
app.use(cors());
app.use(json());

app.use(router);

const port=process.env.PORT || 4000;

app.listen(port, () => {
    console.log(chalk.bold.green("Abrindo servidor na porta 4000"))
});