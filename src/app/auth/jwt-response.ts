export class JwtResponse {
  token: string;
  type: string;
  username: string;
  roles: string[];
  isEmployee: boolean;
  constructor(token: string, type: string, username: string, isEmployee: boolean) {
    this.token = token;
    this.type = type;
    this.username = username;
    this.isEmployee = isEmployee;
    this.roles = ['user'];
  }
}
