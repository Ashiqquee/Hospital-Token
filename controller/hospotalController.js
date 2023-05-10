const Hospital = require('../model/hospitalModel');
const cloudinary = require("cloudinary").v2;
const mime = require("mime-types");
require('dotenv').config({ path: '../../.env' });


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

module.exports = {
    loadAddHospital: async (req, res) => {
        try {
            res.render('../views/admin/addHospital.ejs')
        } catch (error) {
            console.log(error);
        }
    },

    insertHospital: async (req, res) => {
        try {
            const { hospitalName, city, phone, email, address } = req.body;
            const arrImages = [];
            if (req.files) {
                for await (const file of req.files) {
                    const mimeType = mime.lookup(file.originalname);
                    if (mimeType && mimeType.includes("image/")) {
                        const result = await cloudinary.uploader.upload(file.path);
                        arrImages.push(result.secure_url);
                    } else {
                        res.json({ status: false, err: "image" })
                    }
                }
            } else {
                res.json({ status: false, err: "file" })
            }

            const hospital = new Hospital({
                hospitalName: hospitalName,
                city: city,
                hospitalImage: arrImages,
                address: address,
                phone: phone,
                email: email,
            });

            const hospitalDetails = await hospital.save();
            if (hospitalDetails) {
                res.redirect('/admin/hospitalData');
            }

        } catch (error) {
            console.log(error);
        }
    }

}