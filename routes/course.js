const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

router.use(express.json());

router.get("/api/courses", async(req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.json({ err });
    }
});

router.get("/api/courses/:id", async(req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.json(course);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post("/api/courses", async(req, res) => {
    const myData = new Course({
        title: req.body.title
    });
    myData
        .save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

router.put("/api/courses/:id", async(req, res) => {
    try {
        const updatcourse = await Course.updateOne({ _id: req.params.id }, { $set: { title: req.body.title } });
        res.json(updatcourse);
    } catch (err) {
        res.json({ err });
    }
});

router.delete("/api/courses/:id", async(req, res) => {
    try {
        const removecourse = await Course.remove({ _id: req.params.id });
        res.json(removecourse);
    } catch (err) {
        res.json({ err });
    }
});

module.exports = router;