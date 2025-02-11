const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const provinceRoutes = require("./app/routes/province.route");
const districtRoutes = require("./app/routes/district.route");
const wardRoutes = require("./app/routes/ward.route");
const volunteerRoutes = require("./app/routes/volunteer.route");
const orgRoutes = require("./app/routes/org.route");
const addressRoutes = require("./app/routes/address.route");
const eventRoutes = require("./app/routes/event.route");
const enrollRoutes = require("./app/routes/enroll.route");
const accountRoutes = require("./app/routes/account.route");
const roleRoutes = require("./app/routes/role.route");

app.use(cors());
app.use(express.json());

app.use("/provinces", provinceRoutes);
app.use("/districts", districtRoutes);
app.use("/wards", wardRoutes);
app.use("/volunteers", volunteerRoutes);
app.use("/orgs", orgRoutes);
app.use("/addresses", addressRoutes);
app.use("/events", eventRoutes);
app.use("/enrolls", enrollRoutes);
app.use("/accounts", accountRoutes);
app.use("/roles", roleRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
