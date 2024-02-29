import express from "express";
// import ContactSchema from "../models/contact.model";
import { ContactController } from "../controller/contact.controller";

import { ContactRegisteredController } from "../controller/contact.registered.controller";
const router = express.Router();

router.post("/contact-us", ContactController);
router.get("/get-contact-registered-email", ContactRegisteredController);

export default router;
