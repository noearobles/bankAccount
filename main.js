"use strict";

const assert = require("assert");

class bankAccount {
  constructor(accountNum, owner) {
    this.accountNum = accountNum;
    this.owner = owner;
    this.transaction = [];
  }
  balance() {
    let sum = 0;

    for (let i = 0; i < this.transaction.length; i++) {
      sum += this.transaction[i].amt;
    }
    return sum;
  }

  deposit(amt) {
    let depTrans = new transaction(amt, this.payee);
    if (amt >= 0) {
      this.transaction.push(depTrans);
    }
  }
  charge(payee, amt) {
    let currentBalance = this.balance();
    let chargeTrans = new transaction(0 - amt, this.payee);
    if (currentBalance < 0) {
      console.log("Insufficent Funds");
    } else {
      this.transaction.push(chargeTrans);
    }
  }
}
class transaction {
  constructor(amt, payee) {
    this.amt = amt;
    this.payee = payee;
    this.date = Date.now();
  }
}

class savingsAccount extends bankAccount {
  constructor(accountNum, owner, interestRate) {
    super(accountNum, owner);
    this.interestRate = interestRate;
  }
  accrueInterest() {
    let currentBalance = this.balance();
    let interestAmt = currentBalance * this.interestRate;
    let interestTrans = new transaction(interestAmt, "Interest");
    this.transaction.push(interestTrans);
  }
}

// Tests

if (typeof describe === "function") {
  describe("#testing account creation", function () {
    it("should create a new account correctly", function () {
      let acct1 = new bankAccount("xx1994", "Noe Robles");
      assert.equal(acct1.owner, "Noe Robles");
      assert.equal(acct1.accountNum, "xx1994");
      assert.equal(acct1.transaction.length, 0);
    });
  });
  
  
  describe("#testing account balance", function () {
    it("should create a new account correctly", function () {
      let acct1 = new bankAccount("xx1994", "Noe Robles");
      assert.equal(acct1.balance(), 0);
      acct1.deposit(100);
      assert.equal(acct1.balance(), 100);
      acct1.charge("Sonic", 10);
      assert.equal(acct1.balance(), 90);
    });
    it("should not allow a negative deposit", function () {
      let acct1 = new bankAccount("xx1994", "Noe Robles");
      assert.equal(acct1.balance(), 0);
      acct1.charge("Wal-mart", 10);
      assert.equal(acct1.balance(), -10);
    });
    it("should not allow charging to overdraft", function () {
      let acct1 = new bankAccount("xx1994", "Noe Robles");
      assert.equal(acct1.balance(), 0);
      acct1.charge("Wal-Mart", 30);
      assert.equal(acct1.balance(), -30);
    });
    it("should allow a refund", function () {
      let acct1 = new bankAccount("xx1994", "Noe Robles");
      assert.equal(acct1.balance(), 0);
      acct1.charge("Wal-Mart", -30);
      assert.equal(acct1.balance(), 30);
    });
  });

  describe("#testing transaction creation", function () {
    it("should create a new transaction correctly for a deposit", function () {
      let trans1 = new transaction(30, "Deposit");
      assert.equal(trans1.amt, 30);
      assert.equal(trans1.payee, "Deposit");
      assert.notEqual(trans1.date, undefined);
      assert.notEqual(trans1.date, null);
    });
  });

  describe("Savings Account Creation", function () {
    it("create account correctly", function () {
      let savings = new savingsAccount("xx1995", "Jay Lemak", 0.1);
      assert.equal(savings.accountNum, "xx1995");
      assert.equal(savings.owner, "Jay Lemak");
      assert.equal(savings.interestRate, 0.1);
      assert.equal(savings.balance(), 0);
    });
  });

  it("Accrue interest correctly with deposits", function () {
    let savings = new savingsAccount("xx1995", "Jay Lemak", 0.1);
    assert.equal(savings.accountNum, "xx1995");
    assert.equal(savings.owner, "Jay Lemak");
    assert.equal(savings.interestRate, 0.1);
    assert.equal(savings.balance(), 0);
    savings.deposit(100);
    savings.accrueInterest();
    assert.equal(savings.balance(), 110);
  });

  it("Accrue interest correctly with charges", function () {
    let savings = new savingsAccount("xx1995", "Jay Lemak", 0.1);
    savings.deposit(100);
    savings.charge("ATM", 30);
    savings.accrueInterest();
    assert.equal(77, savings.balance());
  });

  it("Accrue interest correctly for a negative interest, should never reach zero", function () {
    let savings = new savingsAccount("xx1995", "Jay Lemak", -0.1);
    savings.deposit(100);
    savings.charge("ATM", 30);
    savings.accrueInterest();
    assert.equal(63, savings.balance());
    for (let i = 0; i < 100; i++) {
      savings.accrueInterest();
    }
    assert.equal(true, savings.balance() > 0);
  });
}
