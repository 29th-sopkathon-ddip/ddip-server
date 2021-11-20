const { Router } = require("express");

const router = Router();

router.post("/", require("./mainPOST"));
router.get("/", require("./mainGET"));


module.exports = router;
