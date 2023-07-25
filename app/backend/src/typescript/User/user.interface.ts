export interface IUserTokenPayload {
  id: string,
  firstName: string;
  lastName: string;
  email: string;
}

export interface IAuthPayload {
  userId: string
}

export interface CustomHeaders extends Headers {
  authorization?: string;
}

export interface IRequestWithUser extends Request {
  headers: CustomHeaders;
  userId?: string;
}

