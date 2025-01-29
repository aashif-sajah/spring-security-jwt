import { Users } from "./users.model";

export class JwtResponse {
  constructor(
    public user: Users,
    public jwtToken: string
  ) {}
}
