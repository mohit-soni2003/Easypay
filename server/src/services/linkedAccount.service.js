const {
    createLinkedAccount,
    getPrimaryAccountByUserId,
    getLinkedAccountByUserAndAccount
} = require("../repositories/linkedBank.repo");

const {
    getAccountById
} = require("../repositories/coreBankAccount.repo");


const linkBankAccountService = async ({
    userId,
    coreBankAccountId
}) => {

    try {

        const existingAccount =
            await getLinkedAccountByUserAndAccount(
                userId,
                coreBankAccountId
            );

        if (existingAccount) {
            throw new Error("Account already linked");
        }


        const coreAccount =
            await getAccountById(coreBankAccountId);


        if (!coreAccount) {
            throw new Error("Core bank account not found");
        }


        // get bank id from core account
        const bankId = coreAccount.bankId;


        const accountNumber =
            coreAccount.accountNumberEncrypted;


        const lastFour =
            accountNumber.slice(-4);


        const maskedAccountNumber =
            `XXXXXX${lastFour}`;


        const primaryAccount =
            await getPrimaryAccountByUserId(userId);


        const linkedAccount =
            await createLinkedAccount({

                userId,

                coreBankAccountId,

                bankId,

                maskedAccountNumber,

                isPrimary: !primaryAccount

            });


        return linkedAccount;


    } catch (error) {

        throw new Error(error.message);

    }

};


module.exports = {
    linkBankAccountService
};