const planDal = require('../dal/plan.dal');

async function createPlan(plan) {
    return await planDal.createPlan(plan);
}

async function getAllPlans() {
    return await planDal.getAllPlans();
}

async function getPlanById(id) {
    return await planDal.getPlanById(id);
};

async function updatePlan(id, updates) {
    return await planDal.updatePlan(id, updates);
};

async function deletePlan(id) {
    return await planDal.deletePlan(id);
};

async function softDelete(planId){
    return await planDal.softDelete(planId);
}

module.exports = {
    createPlan,
    getAllPlans,
    getPlanById,
    updatePlan,
    deletePlan,
    softDelete,
}