const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

// middleware
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

// routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const dataObatRoutes = require("./routes/dataObatRoutes");
app.use("/obat", dataObatRoutes);

const piketRoute = require('./routes/piketRoute');
app.use('/piket', piketRoute);

const pasienRoute = require('./routes/pasienRoute');
app.use('/pasien', pasienRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});