const { Router } = require("express");

const router = Router();

router.post("/login", require("./userLoginPOST"));

module.exports = router;
