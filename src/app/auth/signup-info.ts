export class SignUpInfo {
  username: string;
  role: string[];
  password: string;

  constructor(name: string, username: string, email: string, password: string) {
    this.username = username;
    this.password = password;
    this.role = ['user'];
  }
}
