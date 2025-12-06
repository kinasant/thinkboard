import express  from "express"
import { getAllNotes,updateNode,deleteNode,createNode,getNote } from "../controllers/notesController.js";
const router = express.Router();
router.get("/",getAllNotes);
router.post("/",createNode);
router.delete("/:id",deleteNode);
router.put("/:id",updateNode);
router.get("/:id",getNote)

export default router;
 