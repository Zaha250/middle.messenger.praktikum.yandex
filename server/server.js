const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname, '../dist');

app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log(`Server ready on http://localhost:${PORT}`);
})