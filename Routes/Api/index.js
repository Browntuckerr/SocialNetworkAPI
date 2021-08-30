const router = require ("express").Router;
const thoughtRoutes = require("./thoughtroutes");
const userRoutes = require("./userroutes");

router.use("/thought", thoughtRoutes);
router.use("users", userRoutes);

module.exportss = router;