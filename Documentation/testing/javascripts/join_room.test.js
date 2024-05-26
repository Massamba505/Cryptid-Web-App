// join_room.test.js
const { join } = require('./join_room');

describe('join function', () => {
  beforeEach(() => {
    // Mock sessionStorage
    const mockSessionStorage = {};
    Object.defineProperty(global, 'sessionStorage', {
      value: {
        setItem: jest.fn((key, value) => {
          mockSessionStorage[key] = value;
        }),
        getItem: jest.fn((key) => mockSessionStorage[key] || null)
      },
      writable: true
    });

    // Mock document.getElementById
    global.document.getElementById = jest.fn((id) => ({
      value: "123" // Mock the value of the input field with id "room_number"
    }));

    // Mock window.location
    delete global.window.location;
    global.window.location = {
      href: ''
    };
  });

  test('join function sets sessionStorage and redirects to /waiting', () => {
    join();
    expect(sessionStorage.setItem).toHaveBeenCalledWith("cryptid-game-action", "join");
    expect(sessionStorage.setItem).toHaveBeenCalledWith("cryptid-game-room-number", "123");
    expect(window.location.href).toBe("/waiting");
  });
});
