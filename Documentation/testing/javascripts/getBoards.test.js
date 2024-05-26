const { getAllJsons } = require('./getBoards');

describe('getAllJsons function', () => {
  test('should fetch directory contents successfully', async () => {
    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => [{ file: 'example.json' }] // Mocked response data
      })
    );

    // Call the function and await the result
    const result = await getAllJsons('pressed');

    // Expectations
    expect(result).toEqual([{ file: 'example.json' }]);
    expect(fetch).toHaveBeenCalledWith('/maps/pressed');
  });

  test('should handle failed fetch', async () => {
    // Mock the fetch function to simulate a failed request
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    // Call the function and await the result
    const result = await getAllJsons('pressed');

    // Expectations
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalled(); // Ensure that error message is logged
  });
});
