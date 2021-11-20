const { Router } = require("express");

const router = Router();

router.post("", require("./postPOST"));

module.exports = router;
