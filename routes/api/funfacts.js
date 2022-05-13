const express = require("express");
const router = express();
const stateController = require("../../controler/statesController");

router
    .route("/")
    .get(stateController.getState)
    .post(stateController.addFact)
    .delete(stateController.deleteFact)
    .patch(stateController.updateFact);

module.exports = router;