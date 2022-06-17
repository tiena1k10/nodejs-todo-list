
const { createCustomError } = require('../middleware/custom-error');
const asyncWrapper = require("../middleware/async");
const taskModel = require('../models/task-model');
const getAllTask = asyncWrapper(async (req, res, next) => {
    const tasks = await taskModel.find({})
    res.status(200).json({ status: "success", data: { tasks } });

})
const createTask = asyncWrapper(async (req, res, next) => {
    const task = await taskModel.create({
        name: req.body.name,
    });
    res.status(200).json({ task });

});
const updateTask = asyncWrapper(async (req, res, next) => {
    const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if (task) return res.status(200).json({ task });
    return next(createCustomError(`no task with id : ${req.params.id}`, 404));
});
const deleteTask = asyncWrapper(async (req, res, next) => {
    const task = await taskModel.findByIdAndDelete(req.params.id)
    if (task) return res.status(200).json({ task });
    return (createCustomError(`no task with id : ${req.params.id}`, 404));
});
const getTask = asyncWrapper(async (req, res, next) => {
    const task = await taskModel.findById(req.params.id)
    if (task) return res.status(200).json({ task });
    return next(createCustomError(`no task with id : ${req.params.id}`, 404));
});

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}

