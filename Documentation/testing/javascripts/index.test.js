const { login } = require('./index');

beforeEach(() => {
  // Mock sessionStorage
  const mockSessionStorage = {};
  Object.defineProperty(global, 'sessionStorage', {
    value: {
      setItem: jest.fn((key, value) => {
        mockSessionStorage[key] = value;
      }),
      getItem: jest.fn((key) => mockSessionStorage[key] || null),
      removeItem: jest.fn((key) => {
        delete mockSessionStorage[key];
      }),
      clear: jest.fn(() => {
        Object.keys(mockSessionStorage).forEach(key => {
          delete mockSessionStorage[key];
        });
      })
    },
    writable: true
  });

  // Mock window.location
  delete global.window.location;
  global.window.location = {
    href: ''
  };
});



describe('login function', () => {
  test('login function redirects to /users', () => {
    login();
    expect(window.location.href).toBe('/users');
  });
});
