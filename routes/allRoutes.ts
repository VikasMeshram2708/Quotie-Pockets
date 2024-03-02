import express from "express";
// import ContactSchema from "../models/contact.model";
import { ContactController } from "../controller/contact.controller";
import { QuotieController } from "../controller/quotie.controller";
import { UserController } from "../controller/user.controller";

const router = express.Router();

router.post("/create-user", UserController);
router.post("/contact-us", ContactController);
router.post("/create-quotie", QuotieController);

export default router;
