var $game_board, board_size, max_marked_cells = 2;
$(document).ready(function () {
    $game_board = $('#game-board');
    $game_board.on('click', '.cell', function (e) {
        playGame($(this))
    });

    var $board_size_select = $('#board-size-select');
    $board_size_select.change(function () {
        board_size = parseInt($(this).val());
        updateGameBoard();
    });

    $board_size_select.trigger('change');
});

function updateGameBoard() {
    var $table = '<table>';
    for(var i=1; i<=board_size; i++) {
        $table += '<tr>';
        for(var j=1; j<=board_size; j++) {
            $table += '<td class="cell '+i+'_'+j+'" data-index="'+i+'_'+j+'"></td>'
        }
        $table += '</tr>';
    }

    $table += '</table>';
    $game_board.empty().append($table);

    if(board_size===3){
        setComputerText(getCellWithIndex(2, 2));
    } else {
        setComputerText(getCellWithIndex(3, 3));
    }

    max_marked_cells = 2;
}

function resetGame() {
    updateGameBoard();
}

function playGame($cell) {
    $cell.text('X').removeClass('cell').addClass('user');
    makeNextMove($cell);
}

function makeNextMove($cell) {
    var $target_cell;
    var data_index = $cell.attr('data-index').split('_');
    var i = parseInt(data_index[0]), j = parseInt(data_index[1]);

    $target_cell = getSmartCellWhichPreventWin(i, j);
    if(!$target_cell){
        $target_cell = getNearByCell(i, j, $cell);
    }

    setComputerText($target_cell);
}

function getCellWithIndex(i, j, td_class) {
    if(!td_class) {
        td_class = 'cell'
    }

    var $cell_with_index = $('.'+td_class+'.'+(i).toString()+'_'+(j).toString()+'');
    if($cell_with_index.hasClass(td_class)){
        return $cell_with_index;
    } else {
        return null;
    }
}

function setComputerText($target_cell) {
    if(!$target_cell) {
        $target_cell = $($game_board.find('.cell')[0]);
    }

    $target_cell.text('O').removeClass('cell').addClass('computer');
}

function getNearByCell(i, j, $cell) {
    var $target_cell;

    if($cell.next().hasClass('cell')) {
        $target_cell = $cell.next();
    } if($cell.prev().hasClass('cell')) {
        $target_cell = $cell.prev();
    } else if(getCellWithIndex(i-1, j-1)) {
        $target_cell = getCellWithIndex(i-1, j-1);
    } else if(getCellWithIndex(i-1, j+1)) {
        $target_cell = getCellWithIndex(i-1, j+1);
    } else if(getCellWithIndex(i-1, j)) {
        $target_cell = getCellWithIndex(i-1, j);
    } else if(getCellWithIndex(i+1, j+1)) {
        $target_cell = getCellWithIndex(i+1, j+1);
    } else if(getCellWithIndex(i+1, j-1)) {
        $target_cell = getCellWithIndex(i+1, j-1);
    } else if(getCellWithIndex(i+1, j)) {
        $target_cell = getCellWithIndex(i+1, j);
    }

    return $target_cell;
}

function getSmartCellWhichPreventWin(i, j) {
    var $target_cell;
    if(getFreeIndexXCells(i)) {
        $target_cell = getFreeIndexXCells(i);
    }

    if(getFreeIndexYCells(j)) {
        $target_cell = getFreeIndexYCells(j);
    }

    if(getFreeIndexXYCells()) {
        $target_cell = getFreeIndexXYCells();
    }

    if(getFreeIndexYXCells()) {
        $target_cell = getFreeIndexYXCells();
    }

    return $target_cell;
}

function getFreeIndexXCells(x) {
    var user_cells = [], free_cells = [];
    for(var i=1; i<= board_size; i++) {
        if(getCellWithIndex(x, i, 'user')) {
            user_cells.push(getCellWithIndex(x, i, 'user'));
        }

        if(getCellWithIndex(x, i)) {
            free_cells.push(getCellWithIndex(x, i));
        }
    }

    if(user_cells.length >= max_marked_cells) {
        max_marked_cells = user_cells.length;
        return free_cells[0];
    }
}

function getFreeIndexYCells(y) {
    var user_cells = [], free_cells = [];
    for(var i=1; i<= board_size; i++) {
        if(getCellWithIndex(i, y, 'user')) {
            user_cells.push(getCellWithIndex(i, y, 'user'));
        }

        if(getCellWithIndex(i, y)) {
            free_cells.push(getCellWithIndex(i, y));
        }
    }

    if(user_cells.length >= max_marked_cells) {
        max_marked_cells = user_cells.length;
        return free_cells[0];
    }
}

function getFreeIndexXYCells() {
    var user_cells = [], free_cells = [];
    for(var i=1; i<= board_size; i++) {
        if(getCellWithIndex(i, i, 'user')) {
            user_cells.push(getCellWithIndex(i, i, 'user'));
        }

        if(getCellWithIndex(i, i)) {
            free_cells.push(getCellWithIndex(i, i));
        }
    }

    if(user_cells.length >= max_marked_cells) {
        max_marked_cells = user_cells.length;
        return free_cells[0];
    }
}

function getFreeIndexYXCells() {
    var user_cells = [], free_cells = [];
    for(var i=0; i<board_size; i++) {
        if(getCellWithIndex(i+1, board_size - i, 'user')) {
            user_cells.push(getCellWithIndex(i+1, board_size - i, 'user'));
        }

        if(getCellWithIndex(i+1, board_size - i)) {
            free_cells.push(getCellWithIndex(i+1, board_size - i));
        }
    }

    if(user_cells.length >= max_marked_cells) {
        max_marked_cells = user_cells.length;
        return free_cells[0];
    }
}
