const express = require("express");
const router = express.Router();
const employeruserController = require("../controllers/employerController");
const authMiddleware = require("../middlewares/auth");

router.post("/register", employeruserController.register);
router.post("/login", employeruserController.login);
router.post("/logout", employeruserController.logout);
router.get(
  "/employer-Data",
  authMiddleware,
  employeruserController.getEmployerData
);
router.get(
  "/getEmployer/:companyName",
  employeruserController.getEmployerByCompanyName
);

// Adding the updateEmployer route
router.put(
  "/updateemployer",
  authMiddleware,
  employeruserController.updateEmployer
);

// Adding the verifyPin route
router.post("/verifyPin", authMiddleware, employeruserController.verifyPin);

module.exports = router;
