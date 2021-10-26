import { Router } from "express";
import { getAllUniversities, getUniversityById, createUniversity, updateUniversity, deleteUniversity } from "../controllers/universities";
const router = Router();

router.get('/universities', getAllUniversities); // get all universities
router.get('/universities/:id', getUniversityById); // get university by id

router.post('/universities', createUniversity); // create university
router.put('/universities/:id', updateUniversity); // update university
router.delete('/universities/:id', deleteUniversity); // delete university

export default router;