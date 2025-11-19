const express = require('express');
const app = express();
const inventarisRoutes = require('./routes/inventaris');

app.use(express.json());
app.use('/inventaris', inventarisRoutes);

app.listen(1414, () => {
    console.log('Server berjalan di http://localhost:3000');
});
