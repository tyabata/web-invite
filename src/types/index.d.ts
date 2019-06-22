/**
 * /invitees/userのレスポンス型
 */
export interface IUserResponse {
  status: number;
  body: {
    user_id: string;
  };
}

/**
 * /iviteesで登録するデータの型
 */
export interface IRegisterData {
  userId: string;
  name: string;
  email: string;
  relation: string;
  useImage: boolean;
  request: string;
}

/**
 * registerページのformデータ用のDTO
 */
export interface IFormData {
  name: string;
  email: string;
  relation: string;
  useImage: boolean;
  request: string;
}

/**
 * SnackBar用DTO
 */
export interface ISnackBar {
  text: string;
  timeout: number;
}
