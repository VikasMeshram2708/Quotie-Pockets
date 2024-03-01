import express from "express";
// import ContactSchema from "../models/contact.model";
import { ContactController } from "../controller/contact.controller";

import { ContactRegisteredController } from "../controller/contact.registered.controller";
import { QuotieController } from "../controller/quotie.controller";
const router = express.Router();

router.post("/contact-us", ContactController);
router.post("/create-new-quotie", QuotieController);
router.get("/get-contact-registered-email", ContactRegisteredController);

export default router;
