/**
 * EXAMPLES:
 * 
 * Testy
 * 
 * Inicjacja zmiennych globalnych
 */
let game = new Game();
let computer = new Computer();

QUnit.module('static computer.getScore() method');
// 
QUnit.test('O is winning', function (assert) {
    game.board = [
        1, 2, 2,
        0, 0, 0,
        2, 2, 2
    ];
    game.current = 0;
    computer.minimax(game);
    assert.deepEqual(computer.minimax(game), 1, 'Wygrało kółko');
});
QUnit.test('static computer.getScore() method', function (assert) {
    game.board = [
        1, 2, 2,
        0, 1, 0,
        2, 2, 1
    ];
    game.current = 0;
    computer.minimax(game);
    assert.deepEqual(computer.minimax(game), -1, 'Wygrał krzyżyk');
});

QUnit.test('static computer.getScore() method', function (assert) {
    game.board = [
        1, 0, 1,
        0, 1, 0,
        1, 0, 1
    ];
    game.current = 0;
    computer.minimax(game);
    assert.deepEqual(computer.minimax(game), -1, 'Wygrał krzyżyk');
});

QUnit.test('Dalsza gra', function (assert) {
    game.board = [
        [2, 0, 1],
        [1, 1, 0],
        [0, 1, 1]
    ];
    assert.deepEqual(Computer.getScore(game), 0, 'Zwrócono 0');
});

QUnit.module('Dostępne ruchy - computer.getAvailableMoves()');

QUnit.test('tablica = [2, 2, 2, 2, 2, 2, 2, 2, 2]', function (assert) {
    // wszystkie wolne 
    game.board = [2, 2, 2, 2, 2, 2, 2, 2, 2];
    assert.deepEqual(computer.getAvailableMoves(game.board), [0, 1, 2, 3, 4, 5, 6, 7, 8],
        'dostępne ruchy z tablicy [0, 1, 2, 3, 4, 5, 6, 7, 8]');
});

QUnit.test('tablica = [1, 0, 1, 0, 2, 2, 2, 2, 2]', function (assert) {
    // wszystkie wolne 
    game.board = [1, 0, 1, 0, 2, 2, 2, 2, 2];
    assert.deepEqual(computer.getAvailableMoves(game.board), [4, 5, 6, 7, 8],
        'dostępne ruchy z tablicy [4, 5, 6, 7, 8]');
});

QUnit.module('minimax algoritm');

QUnit.test('Move for computer X', function (assert) {
    game.board = [0, 1, 0, 1, 0, 0, 1, 2, 2];
    game.computer = 1;
    game.activeTurn = 1;
    computer.minimax(game);
    assert.deepEqual(computer.choice, 8, 'computer chooses right bottom corner (8)');
});

QUnit.test('Computer X blocks winning for O', function (assert) {
    game.board = [1, 2, 2, 0, 0, 2, 2, 2, 2];
    game.current = 1;
    game.computer = 1;
    game.opponent = 0;
    game.activeTurn = 1;
    computer.minimax(game);
    assert.deepEqual(computer.choice, 5, 'computer blocks winning by O');
});

QUnit.test('Computer X blocks winning for O', function (assert) {
    game.board = [1, 2, 0, 2, 0, 2, 2, 1, 2];
    game.computer = 1;
    game.activeTurn = 1;
    computer.minimax(game);
    assert.deepEqual(computer.choice, 6, 'computer blocks winning by O');
});


QUnit.test('Computer 0 blocks winning for X', function (assert) {
    game.board = [2, 2, 2, 2, 1, 2, 0, 2, 2];
    game.current = 1;
    game.computer = 1;
    game.opponent = 0;
    game.activeTurn = 1;
    computer.minimax(game);
    assert.ok((computer.choice === 0) || (computer.choice === 2) || computer.choice === 8, 'computer chooses corner');
});

QUnit.module('setting board field');

QUnit.test('computer.setMove()', function (assert) {
    game.board = [1, 2, 0, 2, 0, 2, 2, 2, 2];
    game.computer = 1;
    game.activeTurn = 1;
    game.computerEngine.setMove (game);
    // Verify expected behavior
    assert.deepEqual(game.board[6], 1, 'player mouse click was set');
});

QUnit.test('player.setMove()', function (assert) {
    game.board = [2, 2, 2, 2, 2, 2, 2, 2, 2];
    game.computer = 1;
    game.activeTurn = 0;
    game.current = 0;
    game.player = 0;
    let boardFields = document.querySelectorAll('.board__field');
    boardFields.forEach( (value) => value.addEventListener('click', game.setBoardField.bind(game, 'player'), false));

    // Verify expected behavior
    assert.deepEqual(game.board[0], 0, 'player mouse click was set');
});

QUnit.test('computer.setFirstMove();', function (assert) {
    let index = computer.setFirstMove();
    assert.ok(((index === 0 || index === 2 || index === 6 || index === 8 )), 'Wyznaczono pierwszy ruch');
});
