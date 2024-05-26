const { online_play, local_play, custom } = require('./home');

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

test('online_play function sets sessionStorage and redirects to /game-mode', () => {
  sessionStorage.setItem("cryptid-num-players", "3"); // Set a value to be removed
  online_play();
  expect(sessionStorage.setItem).toHaveBeenCalledWith("cryptid-game-action", "play");
  expect(sessionStorage.getItem("cryptid-num-players")).toBe(null);
  expect(window.location.href).toBe("/game-mode");
});

test('local_play function sets sessionStorage and redirects to /create-room', () => {
  local_play();
  expect(sessionStorage.setItem).toHaveBeenCalledWith("cryptid-game-action", "local");
  expect(window.location.href).toBe("/create-room");
});

test('custom function redirects to /custom-room', () => {
  custom();
  expect(window.location.href).toBe("/custom-room");
});
