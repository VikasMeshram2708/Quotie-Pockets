import express from "express";
// import ContactSchema from "../models/contact.model";
import { ContactController } from "../controller/contact.controller";

const router = express.Router();

router.post("/contact-us", ContactController);

export default router;
