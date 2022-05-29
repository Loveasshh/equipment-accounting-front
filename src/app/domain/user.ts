export class User {
  id!: number;
  username!: string;
  password!: string;
  roles!: [{
    id: number;
    name: string;
  }];
  count!: number;
}
