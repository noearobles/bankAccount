class bankAccount {
  constructor(accountNum, owner) {
    this.accountNum = accountNum;
    this.owner = owner;
    this.transaction = [];
  }
  balance() {
    let transaction = [];
    let balance = 0;

    for (let i = 0; i < this.transaction.length; i++) {
      sum += transaction[i].amt;
    }
    return balance;
  }
  deposit(amt) {
    let currentBalance = this.balance();
    if (amt <= currentBalance) {
      let newTrans = new transaction(amt, "Deposit");
      this.transaction.push(this.depositTransactioin);
    }
  }
  charge(payee, amt) {
    let currentBalance = this.balance();
    if (amt > currentBalance) {
    } else {
      let depositTransactioin = new transaction(-1 * amt, payee);
      this.transaction.push(chargeTransaction);
    }
  }
}
class transaction {
  constructor(amt, payee) {
    this.amt = amt;
    this.payee = payee;
  }
}
