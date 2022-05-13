const express = require("express");
const router = express();
const stateController = require("../../controler/statesController");

router
    .route("/")
    .get(stateController.getStates);

router
    .route("/:state")
    .get(stateController.getState);

router
    .route("/:state/capital")
    .get(stateController.getCap);

router
    .route("/:state/nickname")
    .get(stateController.getNic);

router
    .route("/:state/population")
    .get(stateController.getPop);

router
    .route("/:state/admission")
    .get(stateController.getAd);

router
    .route("/:state/funfact")
    .get(stateController.getFact)
    .post(stateController.addFact)
    .delete(stateController.deleteFact)
    .patch(stateController.updateFact);

module.exports = router;