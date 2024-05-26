// game.test.js
const { create, join, browse } = require('./game_room');

describe('Game functions', () => {
    beforeEach(() => {
        // Clear sessionStorage and set up a mock for window.location.href
        sessionStorage.clear();
        global.alert = jest.fn();
        global.console.log = jest.fn();
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {
            href: ''
        };
    });

    test('create function sets session storage and redirects', () => {
        sessionStorage.setItem('cryptid-num-players', '4');
        create();
        expect(sessionStorage.getItem('cryptid-game-action')).toBe('create');
        expect(sessionStorage.getItem('cryptid-num-players')).toBe(null);
        expect(window.location.href).toBe('/game-mode');
    });

    test('join function sets session storage and redirects', () => {
        join();
        expect(sessionStorage.getItem('cryptid-game-action')).toBe('join');
        expect(window.location.href).toBe('/join-room');
    });

    test('browse function logs message and shows alert', () => {
        browse();
        expect(console.log).toHaveBeenCalledWith('coming soon');
        expect(global.alert).toHaveBeenCalledWith('Coming soon...');
    });
});
