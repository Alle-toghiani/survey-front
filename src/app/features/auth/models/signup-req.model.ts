export interface SignupReqModel {
  username: string;
  email: string;
  password: string;
}

export type SignInReqModel = Omit<SignupReqModel, 'email'>
