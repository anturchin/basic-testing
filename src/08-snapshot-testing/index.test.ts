import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expectedLink = { value: 1, next: { value: null, next: null } };

    const result = generateLinkedList([1]);

    expect(result).toStrictEqual(expectedLink);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList([2]);

    expect(result).toMatchSnapshot();
  });
});
