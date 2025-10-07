
const express = require('express');
const bodyParser = require('body-parser');
require('./db'); 
const simulateRouter = require('./routes/simulate');
const scenariosRouter = require('./routes/scenarios');
const reportRouter = require('./routes/report');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors()); 
app.use(bodyParser.json());

app.use('/simulate', simulateRouter);
app.use('/scenarios', scenariosRouter);
app.use('/report', reportRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
