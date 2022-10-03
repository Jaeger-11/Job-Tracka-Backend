const express = require("express");
const router = express.Router();
const {
    getAllApplications,
    getApplication,
    createApplication,
    editApplication,
    deleteApplication,
    showStatistics,
} = require("../controllers/applicationControllers");

router.get( "/", getAllApplications );
router.get("/showstats", showStatistics);
router.get( "/:id", getApplication);
router.post("/", createApplication);
router.patch("/:id", editApplication);
router.delete("/:id", deleteApplication);

module.exports = router