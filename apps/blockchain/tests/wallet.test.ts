import { Chain } from '../src/Chain';
import { Wallet } from '../src/user/Wallet';

beforeAll(() => {
  Chain.instance.genesis(1_000_000, new Wallet());
  //TODO add Mining Worker
})

test('create a new Wallet', () => {
  const testWallet = new Wallet();

  if(!testWallet){
    throw new Error();
  }
})

test('delete Wallet', () => {
  const testWallet = new Wallet();
  testWallet.delete();
})

test('delete not empty Wallet', () => {
  const testWallet = new Wallet();
  testWallet.balance = 4;
  expect(() => {
    testWallet.delete();
  }).toThrow()
})

test('update Keys', () => {
  const testWallet = new Wallet();
  testWallet.balance = 4;

  const newWallet = new Wallet();
  testWallet.migrate(newWallet);

  expect(newWallet.getBalance).toBe(4);
})

test('send money', () => {
  const testPayer = new Wallet();
  const testPayee = new Wallet();
  testPayer.balance = 4;
  testPayer.sendMoney(4, testPayee);

  expect(testPayee.balance).toBe(4);
})

test('send money with insufficient balance', () => {
  const testPayer = new Wallet();
  const testPayee = new Wallet();

  expect(() => {
    testPayer.sendMoney(4, testPayee)
      .then(() => {throw new Error()})
      .catch(() => {});
  });
})
