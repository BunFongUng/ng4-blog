export class User {
  username: string;
  email: string;
  password: string;

  constructor(obj) {
    this.username = obj && obj.username || null;
    this.email = obj && obj.email || null;
    this.password = obj && obj.password || null;
  }
}
