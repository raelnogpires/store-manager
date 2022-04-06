const express = require('express');
require('dotenv').config();
// const productRouter = require('./routers/productRouter');
const saleRouter = require('./routers/saleRouter');
const { errorMiddleware } = require('./middlewares/error');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.use('/products', productRouter);
app.use('/sales', saleRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
