const Plan = require("../models/Plan");

async function createPlan(plan) {
    const newPlan = new Plan(plan);
    return await newPlan.save();
};

async function getAllPlans() {
    return await Plan.find({isDeleted: false});
};

async function getPlanById(id) {
    return await Plan.findById(id);
};

async function updatePlan(id, updates) {
    return await Plan.findByIdAndUpdate(id, updates, { new: true });
};

async function deletePlan(id) {
    return await Plan.findByIdAndDelete(id);
};

async function softDelete(planId) {
    return await Plan.findByIdAndUpdate(planId, { isDeleted: true });
}

module.exports = {
    createPlan,
    getAllPlans,
    getPlanById,
    updatePlan,
    deletePlan,
    softDelete,
};