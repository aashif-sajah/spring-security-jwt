export class Users
{
  constructor(
    public username: string = '',
    public userFirstName: string = '',
    public userLastName: string = '',
    public userEmail: string = '',
    public userPassword: string = '',
    public roles: string[] = []
  ) {}
}
