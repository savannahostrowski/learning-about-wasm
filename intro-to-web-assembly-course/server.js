const express = require('express');
const app = express();

// // Don't do this in prod :) It's dangertown!!!
app.use(express.static('./'))

app.listen(3000, () => console.log('Server is running on port 3000'));