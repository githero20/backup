
////////////////////////// Route Links ///////////////////////////////////////


export const ForgotPasswordLink  = '/forgot-password';
export const ActivateAccountLink  = '/activate';
export const DashboardLink  = '/dashboard';
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



////////////////////////// Endpoints /////////////////////////////////////////////
export const BASE_URL ='http://backupcash.atp-sevas.com/';

export const LoginEndpoint  = 'sfsbapi/v1/auth/login';
export const RegisterEndpoint  = `sfsbapi/v1/auth/register`;
export const initiateSteadySaveEndpoint  = `sfsbapi/v1/user/transaction/init/steady`;
export const verifyTransactionEndpoint  = `sfsbapi/v1/user/transaction/verify`;
export const passwordResetEndpoint  = `sfsbapi/v1/auth/password/email`;
export const getUserInfoEndpoint  = `sfsbapi/v1/user`;
export const activateUserEndpoint  = `sfsbapi/v1/user/activate`;
export const instantSaveEndpoint  = `sfsbapi/v1/user/savings/instant`;
export const lockedSavingEndpoint  = `sfsbapi/v1/user/savings/locked`;
export const NewSteadySaveEndpoint  = `/sfsbapi/v1/user/savings/steady`;
