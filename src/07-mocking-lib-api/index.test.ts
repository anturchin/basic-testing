import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn) => fn),
}));

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockAxiosClient = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);

    await throttledGetDataFromApi('/posts/1');

    jest.runAllTimers();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosClient = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);

    await throttledGetDataFromApi('/posts/1');

    jest.runAllTimers();

    expect(mockAxiosClient.get).toHaveBeenCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const mockResponseData = { id: 1, title: 'Test Post' };

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    });

    const response = throttledGetDataFromApi('/posts/1');

    jest.advanceTimersByTime(THROTTLE_TIME);

    await expect(response).resolves.toEqual(mockResponseData);
  });
});
