import express from "express"
import urlModel from "../models/url.model.js"
import { nanoid } from "nanoid"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { checkUrl } from "../utils/checkUrl.js";


const router = express.Router();

router.post('/shorten', asyncHandler(async (req, res) => {

    console.log("shorten url has been hit");


    const { originalUrl } = req.body;
    if (!originalUrl) throw new ApiError(400, "URL not found");

    if (!checkUrl(originalUrl)) throw new ApiError(404, "URL format is incorrect")

    let allreadyExist = await urlModel.findOne({
        originalUrl: originalUrl
    })

    if (allreadyExist) {
        res.status(200)
            .json(
                new ApiResponse(200, allreadyExist, "Short URL allready exist")
            )
    }

    let shortId;
    let exists = true;

    while (exists) {
        shortId = nanoid(7);
        exists = await urlModel.findOne({ shortId });
    }

    const newUrl = await urlModel.create({
        originalUrl,
        shortId
    })

    if (!newUrl) throw new ApiError(400, "Error creating short url");

    res.status(200)
        .json(
            new ApiResponse(200, newUrl, "Short URL created successfully")
        )
}))

router.get('/:id', asyncHandler(async (req, res) => {

    const { id } = req.params;
    if (!id) throw new ApiError(400, "incorrect url");

    const url = await urlModel.findOne({ shortId: id });
    if (!url) throw new ApiError(404, "URL does not exist");

    url.clicks += 1;

    await url.save();

    res.redirect(url.originalUrl)


}))

router.get("/", (req, res) => {
    res.send("server alive");
});

export default router