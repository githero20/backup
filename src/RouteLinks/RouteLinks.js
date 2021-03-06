////////////////////////// Route Links ///////////////////////////////////////

export const ForgotPasswordLink = "/forgot-password";
export const botCreatePasswordLink = "/bot/create-password";
export const ResetPasswordLink = "/password/reset/:token";
export const ActivateAccountLink = "/payment/activate";
export const addWithdrawalLink = "/add-bank";
export const EmailActivationLink = "/activate";
export const LoginLink = "/login";
export const SignUpLink = "/sign-up";
export const InviteLink = "/invite/:ref";
export const HomeLink = "/";
export const FaqLink = "/faq";
export const scoreboardLink = "/scoreboard";
export const sbDashboardLink = "/scoreboard/dashboard";
export const directSteadySave = "/direct-steady-save/:userid/:frequency";
export const directInstantSave = "/direct-instant-save/:userid/:type";
export const BlogLink = "/blog";
export const ResendActivationLink = "/resend/email";
export const ChallengeLink = "/21daysavingschallenge";
export const TermsAndCondLink = "/terms-and-condition";
export const DashboardLink = "/dashboard";
export const InstantSaveLink = "/dashboard/instant-save";
export const SteadySaveLink = "/dashboard/steady-save";
export const LockedSavingsLink = "/dashboard/locked-savings";
export const BackupGoalsLink = "/dashboard/backup-goals";
export const TransactionsLink = "/dashboard/transactions";
export const ReferralsLink = "/dashboard/referrals";
export const WithdrawalLink = "/dashboard/withdrawal";
export const ProfileSettingLink = "/dashboard/profile-setting";
export const BankCardLink = "/dashboard/bank-card-setting";
export const KycSettingLink = "/dashboard/kyc-setting";
export const BackupStashLink = "/dashboard/backup-stash";
export const MillexLink = "/dashboard/snap";

////////////////////////// Endpoints /////////////////////////////////////////////
// export const BASE_URL ='http://backupcash.atp-sevas.com/';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const LoginEndpoint = "sfsbapi/v1/auth/login";
export const RegisterEndpoint = `sfsbapi/v1/auth/register`;
export const initiateSteadySaveEndpoint = `sfsbapi/v1/user/transaction/init/steady`;
export const verifyTransactionEndpoint = `sfsbapi/v1/user/transaction/verify`;
export const passwordResetEndpoint = `sfsbapi/v1/auth/password/email`;
export const phonePassResetEndpoint = `sfsbapi/v1/auth/password/reset/phone`;
export const getUserInfoEndpoint = `sfsbapi/v1/user`;
export const getFirstTimeUserEndpoint = `sfsbapi/v1/user/prompt`;
export const storeFirstTimeLoginEndpoint = `sfsbapi/v1/user/prompt/store`;
export const getUserRoleEndpoint = `sfsbapi/v1/user/role`;
export const getUserPointsEndpoint = `sfsbapi/v1/user/point`;
export const activateUserEndpoint = `sfsbapi/v1/user/activate`;
export const resendActEndpoint = `sfsbapi/v1/auth/activate/resend`;
export const instantSaveEndpoint = `sfsbapi/v1/user/savings/instant`;
export const instantSaveTransEndpoint = `/sfsbapi/v1/user/transaction/instant`;
export const lockedSavingEndpoint = `sfsbapi/v1/user/savings/locked`;
export const referralsEndpoint = `sfsbapi/v1/user/referrals`;
export const getBackUpStashTransEndpoint = `sfsbapi/v1/user/transaction/backupstash`;
export const NewSteadySaveEndpoint = `/sfsbapi/v1/user/savings/steady`;
export const PayDueSSEndpoint = `sfsbapi/v1/user/savings/steady/duepay`;
export const PayDueBGEndpoint = `sfsbapi/v1/user/goals/duepay`;
export const getSteadySaveEndpoint = `/sfsbapi/v1/user/savings/steady`;
export const postDirectSteadySaveEndpoint = `/sfsbapi/v1/add/steadysave`;
export const postDirectInstantSaveEndpoint = `/sfsbapi/v1/add/instantsave`;
export const createBackupGoals = `/sfsbapi/v1/user/goals`;
export const getTransactionsApi = `/sfsbapi/v1/user/transactions`;
export const filterTransactionsApi = `/sfsbapi/v1/user/transactions/filter`;
export const getEachTransApi = `/sfsbapi/v1/user/transaction/each/`;
export const ResetPasswordEndpoint = `/sfsbapi/v1/auth/password/reset`;
export const GetLockedSavingsInterest = `sfsbapi/v1/get-locked-saving-interest`;
export const CreateLockedSavings = `sfsbapi/v1/user/savings/locked`;
export const GetLockedSavings = `sfsbapi/v1/user/savings/locked`;
export const SaveBankAccount = `sfsbapi/v1/user/banks/sendotp`;
export const registerBank = `sfsbapi/v1/user/banks/register`;
export const getBank = `sfsbapi/v1/get-bank-name`;
export const getUserWithdrawalPin = `sfsbapi/v1/user/withdrawals/pin`;
export const updateUserProfileEndpoint = `sfsbapi/v1/user/profile/update`;
export const updateEmailEndpoint = `sfsbapi/v1/user/profile/update/email`;
export const ResendBankOTP = `/sfsbapi/v1/user/banks/resendotp`;
export const VerifyBankOTP = `sfsbapi/v1/user/banks/verifyotp`;
export const GetUserBanks = `sfsbapi/v1/user/banks`;
export const getBackUpGoals = `sfsbapi/v1/user/goals`;
export const EditSteadySave = `sfsbapi/v1/user/savings/steady/edit`;
export const PauseSteadySave = `sfsbapi/v1/user/savings/steady/pause`;
export const ContinueSteadySave = `sfsbapi/v1/user/savings/steady/continue`;
export const getSteadySaveHistory = `sfsbapi/v1/user/savings/steady`;
export const convertSteadySave = `/sfsbapi/v1/user/savings/steady/convert`;
export const getBGoalTrans = `sfsbapi/v1/user/goals/trans`;
export const pauseBackupGoal = `sfsbapi/v1/user/goals/pause`;
export const continueBackupGoal = `sfsbapi/v1/user/goals/continue`;
export const editBackupGoal = `sfsbapi/v1/user/goals/edit`;
export const stopBackupGoal = `sfsbapi/v1/user/goals/stop`;
export const getBGoalHistory = `sfsbapi/v1/user/goals`;
export const getSteadySaveTrans = `sfsbapi/v1/user/savings/steady/trans`;
export const StopSteadySave = `sfsbapi/v1/user/savings/steady/stop`;
export const GetWithdrawal = `sfsbapi/v1/user/withdrawals`;
export const UpdatePasswordEndpoint = `sfsbapi/v1/user/update/password`;
export const InitiateTransactionEndpoint = `sfsbapi/v1/user/transaction/init`;
export const InitiateSSDuePayEndpoint = `sfsbapi/v1/user/savings/steady/init`;
export const InitiateBGDuePayEndpoint = `sfsbapi/v1/user/goals/init`;
export const VerifySSDuePayEndpoint = `sfsbapi/v1/user/savings/steady/verify`;
export const VerifyBGDuePayEndpoint = `sfsbapi/v1/user/goals/verify`;
export const GetUsersCards = `/sfsbapi/v1/user/cards`;
export const deleteUsersCardUrl = (id) => `sfsbapi/v1/user/cards/del/${id}`;
export const GetUserKYC = `/sfsbapi/v1/user/profile/kyc`;
export const GetWithdrawalPenalty = `sfsbapi/v1/user/withdrawals/penalty`;
export const CreateWithdrawalSettings = `sfsbapi/v1/user/withdrawals/settings`;
export const GetWithdrawalSettings = `sfsbapi/v1/user/withdrawals/settings`;
export const MakeWithdrawal = `sfsbapi/v1/user/withdrawals`;
export const storeWithdrawalPin = `sfsbapi/v1/user/withdrawals/pin`;
export const changeWithdrawalPin = `sfsbapi/v1/user/withdrawals/pin/change`;
export const centralVaultInterest = `/sfsbapi/v1/user/interest`;
export const getAdminInterest = `sfsbapi/v1/get-admin-interest`;
export const lockedInterest = `sfsbapi/v1/user/savings/locked/interest`;
export const TransferToVault = `sfsbapi/v1/user/transfer/centralvault`;
