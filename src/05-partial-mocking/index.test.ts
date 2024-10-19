import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(() => {
    jest.unmock('./index');
    consoleSpy.mockRestore();
  });

  test.each([mockOne, mockTwo, mockThree])(
    'mockOne, mockTwo, mockThree should not log into console',
    (mockFn) => {
      mockFn();

      expect(mockFn).toHaveBeenCalledWith();
      expect(console.log).not.toHaveBeenCalled();
    },
  );

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    expect(console.log).toHaveBeenCalledWith('I am not mocked');
  });
});
