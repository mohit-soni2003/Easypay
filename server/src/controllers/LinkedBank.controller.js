const { linkBankAccountService } = require("../services/linkedAccount.service");

const linkBankAccountController = async (req, res) => {
    try {
        const { userId, coreBankAccountId, bankId } = req.body;

        const linkedAccount = await linkBankAccountService({
            userId,
            coreBankAccountId,
            bankId
        });

        return res.status(201).json({
            success: true,
            message: "Bank account linked successfully",
            data: linkedAccount
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    linkBankAccountController
};