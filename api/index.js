const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

const userRoutes = require("../src/routes/userRoutes");
app.use("/users", userRoutes);

const dataObatRoutes = require("../src/routes/dataObatRoutes");
app.use("/obat", dataObatRoutes);

const piketRoute = require('../src/routes/piketRoute');
app.use('/piket', piketRoute);

const pasienRoute = require('../src/routes/pasienRoute');
app.use('/pasien', pasienRoute);

const absenRoute = require('../src/routes/absenRoute');
app.use('/absen', absenRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});