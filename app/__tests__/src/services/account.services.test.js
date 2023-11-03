import axios from 'axios';
import AccountServices from '../../../src/services/account.services';
import { BACKEND_URL } from '../../../src/helpers/environment';

jest.mock('../../../src/helpers/environment', () => ({
  BACKEND_URL: 'http://localhost:8888',
}));

// Mocking localStorage
const localStorageMock = {
  getItem: jest.fn(),
};

global.localStorage = localStorageMock;

// Mocking axios
jest.mock('axios');

describe('deleteAccount', () => {
  it('should delete an account and return data on success', async () => {
    const creatorId = '653629e474db8481662bd04c';
    localStorageMock.getItem.mockReturnValue(creatorId);

    const responseData = { success: true };
    axios.delete.mockResolvedValue({ data: responseData });

    const result = await AccountServices.deleteAccount();

    expect(result).toEqual(responseData);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('id');
    expect(axios.delete).toHaveBeenCalledWith(`${BACKEND_URL}/profile/delete/${creatorId}`);
  });

  it('should throw an error when creatorId is not found in localStorage', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    await expect(AccountServices.deleteAccount()).rejects.toThrow('No creatorId found in localStorage');
  });

  it('should throw an error when the delete request fails', async () => {
    const creatorId = '653629e474db8481662bd04c';
    localStorageMock.getItem.mockReturnValue(creatorId);

    const errorMessage = 'Failed to delete account';
    axios.delete.mockRejectedValue(new Error(errorMessage));

    await expect(AccountServices.deleteAccount()).rejects.toThrow(errorMessage);
  });

  it('should throw an error when the delete request returns an error response', async () => {
    const creatorId = '653629e474db8481662bd04c';
    localStorageMock.getItem.mockReturnValue(creatorId);

    const errorResponse = { message: 'Error deleting account' };
    axios.delete.mockRejectedValue({ response: { data: errorResponse } });

    try {
      await AccountServices.deleteAccount();
      // If no error was thrown, fail the test
      throw new Error('Expected an error to be thrown');
    } catch (error) {
      expect(error.message).toMatch('Error deleting account');
    }
  });


});
