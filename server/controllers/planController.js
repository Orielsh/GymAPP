const planService = require("../services/planService");

const getAllPlans = async (req, res) => {
    try {
        const allPlans = await planService.getAllPlans();
        return res.status(200).json({
            success: true,
            data: allPlans,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed fetch plans list",
        });
    }
};

const createPlan = async (req, res) => {
    try {
        const newPlan = await planService.createPlan(req.synthBody);
        return res.status(200).json({
            success: true,
            data: newPlan,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed create plan",
        });
    }
};

const patchPlan = async (req, res) => {
    try {
        const { id: plan_id } = req.params;
        const updatePlan = await planService.updatePlan(plan_id, req.synthBody);
        return res.status(200).json({
            success: true,
            data: updatePlan,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to update plan",
        });
    }
};

const softDeletePlan = async (req, res) => {
    try {
      const id = req.params.id;
      const deleted = await planService.softDelete(id);
      return res.status(200).json({
        success: true,
        data: deleted,
      });
    }
    catch (err) {
      // return an error message
      return res.status(err.status || 500).json({
        success: false,
        message: err.message ?? "Conuldn't delete plan",
      });
    }
  };

module.exports = {
    getAllPlans,
    createPlan,
    patchPlan,
    softDeletePlan,
}