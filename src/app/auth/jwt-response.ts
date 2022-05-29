export class JwtResponse {
  token: string;
  type: string;
  username: string;
  roles: string[];
  isBlocked: boolean;
  dateBlocked: string;
  constructor(token: string, type: string, username: string, isBlocked: boolean, dateBlocked: string) {
    this.token = token;
    this.type = type;
    this.username = username;
    this.isBlocked = isBlocked;
    this.dateBlocked = dateBlocked;
    this.roles = ['user'];
  }
}
