import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: null, expected: null },
  { a: 4, b: null, action: Action.Multiply, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(`${a} ${action} ${b} = ${expected}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
