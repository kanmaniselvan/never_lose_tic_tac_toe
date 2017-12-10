var $game_board;
$(document).ready(function () {
    $game_board = $('#game-board');
    var $board_size_select = $('#board-size-select');
    $board_size_select.change(function () {
        updateGameBoard(parseInt($(this).val()));
    });

    $board_size_select.trigger('change');

    $game_board.on('click', '.cell', function (e) {
        playGame($(this))
    })
});

function updateGameBoard(board_size) {
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
}

function resetGame() {
    window.location.reload();
}

function playGame($cell) {
    $cell.text('X').removeClass('cell').addClass('user');
    makeNextMove($cell);
}

function makeNextMove($cell) {
    var $target_cell;
    var data_index = $cell.attr('data-index').split('_');
    var i = parseInt(data_index[0]), j = parseInt(data_index[1]);

    $target_cell = getNearByCell(i, j, $cell);

    setComputerText($target_cell);
}

function getCellWithIndex(i, j) {
    var $cell_with_index = $('.cell.'+(i).toString()+'_'+(j).toString()+'');
    if($cell_with_index.hasClass('cell')){
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

    if(getCellWithIndex(i-1, j-1)) {
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
    } else if($cell.next().hasClass('cell')) {
        $target_cell = $cell.next();
    } else if($cell.prev().hasClass('cell')) {
        $target_cell = $cell.prev();
    }

    return $target_cell;
}
