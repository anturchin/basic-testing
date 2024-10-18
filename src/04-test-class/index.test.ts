import { getBankAccount } from './index';

describe('BankAccount', () => {
  const initialBalance = 100;
  const amount = 110;
  const totalBalance = amount + initialBalance;
  const transferSum = 10;
  const account = getBankAccount(initialBalance);
  const anotherAccount = getBankAccount(initialBalance);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(amount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${account.getBalance()}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(amount, anotherAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${account.getBalance()}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(amount, account)).toThrow(`Transfer failed`);
  });

  test('should deposit money', () => {
    expect(account.deposit(amount).getBalance()).toBe(totalBalance);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(amount).getBalance()).toBe(initialBalance);
  });

  test('should transfer money', () => {
    expect(account.transfer(transferSum, anotherAccount).getBalance()).toBe(
      initialBalance - transferSum,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = await account.fetchBalance();
    if (typeof balance === 'number') {
      const deposit = account.getBalance();
      expect(account.deposit(balance).getBalance()).toBe(deposit + balance);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = async () => null;
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
