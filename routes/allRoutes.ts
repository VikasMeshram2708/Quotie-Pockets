import express, { Request, Response } from "express";
// import ContactSchema from "../models/contact.model";
import { ContactCollection, ContactSchema } from "../models/contact.model";
import { client } from "../utils/ConnectToDb";

const router = express.Router();

router.post("/contact-us", async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    // Sanitize the incomding data.
    // Check if the email already exist or not
    const emailExist = await ContactCollection.findOne({
      email,
    });

    if (emailExist) throw new Error("Email already in use.");
    ContactSchema.parse({ name, email, message });
    const result = await ContactCollection.insertOne({
      name,
      email,
      message,
    });
    res.json({
      success: true,
      result,
    });
  } catch (e) {
    const errorMessage = e as Error;
    res.json({
      message: `Something went wrong : ${errorMessage?.message}`,
    });
  }
});

export default router;
