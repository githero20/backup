
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


export const LoginEndpoint  = 'http://backupcash.atp-sevas.com/sfsbapi/v1/auth/login';
export const RegisterEndpoint  = `http://backupcash.atp-sevas.com/sfsbapi/v1/auth/register`;
export const initiateSteadySaveEndpoint  = `http://backupcash.atp-sevas.com/sfsbapi/v1/user/transaction/init/steady`;
export const verifyTransactionEndpoint  = `http://backupcash.atp-sevas.com/sfsbapi/v1/user/transaction/verify`;