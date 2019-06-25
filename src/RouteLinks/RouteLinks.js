
////////////////////////// Route Links ///////////////////////////////////////


export const ForgotPasswordLink  = '/forgot-password';
export const ResetPasswordLink  = '/password/reset/:token';
export const ActivateAccountLink  = '/payment/activate';
export const DashboardLink  = '/dashboard';
export const EmailActivationLink  = '/activate';
export const InstantSaveLink  = '/instant-save';
export const SteadySaveLink  = '/steady-save';
export const LockedSavingsLink  = '/locked-savings';
export const BackupGoalsLink  = '/backup-goals';
export const TransactionsLink  = '/transactions';
export const WithdrawalLink  = '/withdrawal';
export const ProfileSettingLink  = '/profile-setting';
export const BankCardLink  = '/bank-card-setting';
export const LoginLink  = '/login';
export const SignUpLink  = '/sign-up';
export const InviteLink  = '/invite/:ref';
export const ResendActivationLink  = '/resend/email';
export const HomeLink  = '/';
export const KycSettingLink  = '/kyc-setting';
export const BackupStashLink  = '/backup-stash';



////////////////////////// Endpoints /////////////////////////////////////////////
export const BASE_URL ='http://backupcash.atp-sevas.com/';

export const LoginEndpoint  = 'sfsbapi/v1/auth/login';
export const RegisterEndpoint  = `sfsbapi/v1/auth/register`;
export const initiateSteadySaveEndpoint  = `sfsbapi/v1/user/transaction/init/steady`;
export const verifyTransactionEndpoint  = `sfsbapi/v1/user/transaction/verify`;
export const passwordResetEndpoint  = `sfsbapi/v1/auth/password/email`;
export const getUserInfoEndpoint  = `sfsbapi/v1/user`;
export const activateUserEndpoint  = `sfsbapi/v1/user/activate`;
export const resendActEndpoint  = `sfsbapi/v1/auth/activate/resend`;
export const instantSaveEndpoint  = `sfsbapi/v1/user/savings/instant`;
export const instantSaveTransEndpoint  = `/sfsbapi/v1/user/transaction/instant`;
export const lockedSavingEndpoint  = `sfsbapi/v1/user/savings/locked`;
export const getBackUpStashTransEndpoint  = `sfsbapi/v1/user/transaction/backupstash`;
export const NewSteadySaveEndpoint  = `/sfsbapi/v1/user/savings/steady`;
export const getSteadySaveEndpoint  = `/sfsbapi/v1/user/savings/steady`;
export const createBackupGoals  = `/sfsbapi/v1/user/goals`;
export const getTransactionsApi  = `/sfsbapi/v1/user/transactions`;
export const ResetPasswordEndpoint  = `/sfsbapi/v1/auth/password/reset`;
export const GetLockedSavingsInterest  = `sfsbapi/v1/get-locked-saving-interest`;
export const CreateLockedSavings = `sfsbapi/v1/user/savings/locked`;
export const GetLockedSavings = `sfsbapi/v1/user/savings/locked`;
export const SaveBankAccount = `sfsbapi/v1/user/banks/sendotp`;
export const ResendBankOTP = `/sfsbapi/v1/user/banks/resendotp`;
export const VerifyBankOTP = `sfsbapi/v1/user/banks/verifyotp`;
export const GetUserBanks = `sfsbapi/v1/user/banks`;
export const GetBackUpGoals = `sfsbapi/v1/user/goals`;
export const EditSteadySave = `sfsbapi/v1/user/savings/steady/edit`;
export const PauseSteadySave = `sfsbapi/v1/user/savings/steady/pause`;
export const ContinueSteadySave = `sfsbapi/v1/user/savings/steady/continue`;
export const getSteadySaveHistory = `sfsbapi/v1/user/savings/steady`;
export const getBGoalTrans = `sfsbapi/v1/user/goals/trans`;
export const pauseBackupGoal = `sfsbapi/v1/user/goals/pause`;
export const continueBackupGoal = `sfsbapi/v1/user/goals/continue`;
export const editBackupGoal = `sfsbapi/v1/user/goals/edit`;
export const stopBackupGoal = `sfsbapi/v1/user/goals/stop`;
export const getBGoalHistory = `sfsbapi/v1/user/goals`;
export const getSteadySaveTrans = `sfsbapi/v1/user/savings/steady/trans`;
export const StopSteadySave = `sfsbapi/v1/user/savings/steady/stop`;
export const GetWithdrawal = `sfsbapi/v1/user/withdrawals`;
export const UpdatePasswordEndpoint = `/sfsbapi/v1/user/update/password`;
export const InitiateTransactionEndpoint  = `sfsbapi/v1/user/transaction/init`;
export const GetUsersCards  = `/sfsbapi/v1/user/cards`;
export const GetUserKYC =`/sfsbapi/v1/user/profile/kyc`;
export const GetWithdrawalPenalty = `sfsbapi/v1/user/withdrawals/penalty`;
export const CreateWithdrawalSettings = `sfsbapi/v1/user/withdrawals/settings`;
export const GetWithdrawalSettings = `sfsbapi/v1/user/withdrawals/settings`;
export const MakeWithdrawal = `sfsbapi/v1/user/withdrawals`;
export const CentralVaultInterest = `/sfsbapi/v1/user/interest`;
export const getAdminInterest = `sfsbapi/v1/get-admin-interest`;
export const LockedInterest = `sfsbapi/v1/user/savings/locked/interest`;
export const TransferToVault = `/sfsbapi/v1/user/transfer/centralvault`;


