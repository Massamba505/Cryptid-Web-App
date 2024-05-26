// navigation.test.js
const { switch_page } = require('./game_mode');

describe('switch_page function', () => {
    beforeEach(() => {
        // Clear sessionStorage and set up a mock for window.location.href
        sessionStorage.clear();
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {
            href: ''
        };
    });

    test('sets game mode to intro and redirects to /game if cryptid-num-players is set', () => {
        sessionStorage.setItem('cryptid-num-players', '4');
        switch_page(0);
        expect(sessionStorage.getItem('cryptid-game-mode')).toBe('intro');
        expect(window.location.href).toBe('/game');
    });

    test('sets game mode to intro and redirects to /waiting if cryptid-num-players is not set', () => {
        switch_page(0);
        expect(sessionStorage.getItem('cryptid-game-mode')).toBe('intro');
        expect(window.location.href).toBe('/waiting');
    });

    test('sets game mode to normal and redirects to /game if cryptid-num-players is set', () => {
        sessionStorage.setItem('cryptid-num-players', '4');
        switch_page(1);
        expect(sessionStorage.getItem('cryptid-game-mode')).toBe('normal');
        expect(window.location.href).toBe('/game');
    });

    test('sets game mode to normal and redirects to /waiting if cryptid-num-players is not set', () => {
        switch_page(1);
        expect(sessionStorage.getItem('cryptid-game-mode')).toBe('normal');
        expect(window.location.href).toBe('/waiting');
    });
});
