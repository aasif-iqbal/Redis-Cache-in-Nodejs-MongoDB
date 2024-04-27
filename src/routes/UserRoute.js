// blog_app/routes/ArticleRouter.js
import express from "express";
import UserModel from "../models/user.js";

const router = express.Router();

router.get('/test', async(request,response) => {
    response.send('okk');
});

export default router;