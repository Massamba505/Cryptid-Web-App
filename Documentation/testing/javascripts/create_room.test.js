// createroom.test.js
const { players } = require('./create_room');

describe('players function', () => {
    beforeEach(() => {
        // Clear sessionStorage and set up a mock for window.location.href
        sessionStorage.clear();
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {
            href: ''
        };
    });

    test('sets the number of players in sessionStorage and redirects to /game-mode', () => {
        const numberOfPlayers = 4;
        players(numberOfPlayers);
        expect(sessionStorage.getItem('cryptid-num-players')).toBe(numberOfPlayers.toString());
        expect(window.location.href).toBe('/game-mode');
    });
});
