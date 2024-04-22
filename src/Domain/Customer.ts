enum MembershipType {
  Premium,
  Basic
}

export class Customer {
  private static id: number = 0;
  private readonly userId: number;
  private membership: MembershipType = MembershipType.Basic;

  constructor(public name: string, public password: string) {
    if (name === '' || password === '') {
      throw new Error('Both username and password cannot be empty.');
    }
    this.userId = ++Customer.id; 
  }

  sendWelcomeNote() {
    return `Welcome ${this.name}`;
  }

  getMembership() {
    return this.membership;
  }

  upgradeMemership() {
    if (this.membership === MembershipType.Basic) {
      this.membership = MembershipType.Premium;
      return `Membership upgraded to Premium for ${this.name}`;
    } else {
      return `Membership is already Premium for ${this.name}`;
    }
  }

  getUserId() {
    return this.userId;
  }
}
