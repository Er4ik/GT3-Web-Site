import { Router } from "express";
import { respIndex, respSign, respButTick, authorize } from "../controllers/responses.js"
import { pages } from "../configs/var.js";

const router = Router();

router.get(pages.main, respIndex);
router.get(pages.signPage, respSign);
router.get(pages.buyTicket, respButTick);

router.post(pages.auth, authorize)

export default router;