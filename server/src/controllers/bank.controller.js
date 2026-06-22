const {
    createBank,
    getAllActiveBanks,
    getAllBanks,
    getBankById,
    updateBank,
    changeBankStatus,
    deleteBank,
    searchBanks
} = require("../services/bank.service");


const getAllActiveBanksController = async (req, res) => {
    try {
        const banks = await getAllActiveBanks();

        return res.status(200).json({
            success: true,
            message: "Active banks fetched successfully",
            data: banks
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const searchBanksController = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const banks = await searchBanks(query);

        return res.status(200).json({
            success: true,
            message: "Banks search completed successfully",
            data: banks
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllActiveBanksController,
    searchBanksController
};