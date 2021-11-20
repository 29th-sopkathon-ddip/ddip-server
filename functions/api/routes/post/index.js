const { Router } = require("express");

const router = Router();

router.post("", require("./postPOST"));
router.get("", require("./postGET"));

module.exports = router;
