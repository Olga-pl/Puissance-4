$(document).ready(function () {


    $.fn.puissance4 = function () {
        $('#affiche').css('display', 'block');
        $('#refresh').click(function () {
            $('#container').empty();
            game();
        });

        var x = $("#size_row").val();
        var y = $("#size_col").val();

        game();


        function game() {
            var tab = [];
            $('#container').css('pointer-events', 'auto');

            for (let row = 0; row < x; row++) {
                const ligne = $('<div>').addClass('row');
                for (let col = 0; col < y; col++) {
                    const colo = $('<div>').addClass('col empty').attr('data-col', col).attr('data-lgn', row);
                    ligne.append(colo);
                }
                $('#container').append(ligne);
                $('#input').css('display', 'none');
            }

            var winner1 = 0;
            var winner2 = 0;

            var player = 'red';

            document.getElementById("player1").innerHTML = winner1;
            document.getElementById("player2").innerHTML = winner2;

            $('.col.empty').click(function () {

                if (player === 'yellow') {
                    document.getElementById("current").innerHTML = 'Rouge';
                }
                else {
                    document.getElementById("current").innerHTML = 'Jaune';
                }
                document.getElementById("player1").innerHTML = winner1;
                document.getElementById("player2").innerHTML = winner2;


                const column = $(this).attr('data-col');
                const line = $(this).attr('data-lgn');

                var position = document.querySelectorAll(`.col[data-col='${column}'][data-lgn='${line}']`);
                tab.push(position[0]);
                $('#undo').unbind().click(function () {
                    if (tab.length > 0) {
                        let last_undo = tab.pop();

                        last_undo.classList.add('empty');
                        last_undo.classList.remove('red');
                        last_undo.classList.remove('yellow');


                    }
                });

                if (if_empty(column, line)) {

                    let variable = $(`.col[data-col=${column}][data-lgn=${line}]`);

                    if (variable.hasClass('empty')) {
                        let lastline = $(`.col[data-col=${column}][data-lgn=${line}]`);
                        lastline.removeClass('empty');
                        lastline.addClass(player);
                    }
                }
                winner_vertical(column, winner1, winner2);

                winner_diaga(column, line, winner1, winner2);

                winner_diagb(column, line, winner1, winner2);
                winner_horizontal(line, winner1, winner2);

                return player = player === 'red' ? 'yellow' : 'red';

            });
        }

        function if_empty(column, line) {
            let test = line;
            test++;
            let cases = $(`.col[data-col=${column}][data-lgn=${test}]`);
            if (cases.hasClass('empty')) {
                return false;
            }
            else {
                return cases;
            }
        }

        function winner_horizontal(line, winner1, winner2) {

            let red = 0;
            let yellow = 0;

            for (let i = 0; i < y; i++) {

                let win = $(`.col[data-col=${i}][data-lgn=${line}]`);

                if (win.hasClass('red')) {

                    if (red === 3) {

                        prompt('Congratulations, red win !');
                        $('#container').css('pointer-events', 'none');
                        winner1++;
                        document.getElementById("player1").innerHTML = winner1;
                        return red;
                    }
                    red++;
                    yellow = 0;
                }
                if (win.hasClass('yellow')) {

                    if (yellow === 3) {
                        prompt('Congratulations, yellow win !');
                        $('#container').css('pointer-events', 'none');
                        winner2++;
                        document.getElementById("player2").innerHTML = winner2;
                        return yellow;
                    }
                    yellow++;
                    red = 0;
                }
            }
        }

        function winner_vertical(column, winner1, winner2) {

            let red = 0;
            let yellow = 0;
            for (let i = x; i > 0; i--) {
                let win = $(`.col[data-col=${column}][data-lgn=${i}]`);

                if (win.hasClass('empty')) {
                    return;
                }
                if (win.hasClass('red')) {
                    red++;
                    yellow = 0;
                    if (red === 4) {
                        prompt('Congratulations, red gagnent !');
                        $('#container').css('pointer-events', 'none');
                        winner1++;
                        document.getElementById("player1").innerHTML = winner1;
                        return red;
                    }
                }
                if (win.hasClass('yellow')) {
                    yellow++;
                    red = 0;
                    if (yellow === 4) {
                        prompt('Congratulations, yellow gagnent win !');
                        $('#container').css('pointer-events', 'none');
                        winner2++;
                        document.getElementById("player2").innerHTML = winner2;
                        return yellow;
                    }
                }
            }
        }

        function winner_diaga(column, line, winner1, winner2) {
            let red = 0;
            let yellow = 0;
            let col = column;
            let lgn = line;
            let col2 = column;
            let lgn2 = line;

            for (let i = 4; i > 0; i--) {
                let win = $(`.col[data-col=${col}][data-lgn=${lgn}]`);

                if (win.hasClass('red')) {
                    red++;
                    yellow = 0;
                    if (red === 5) {
                        prompt('Congratulations, red win !');
                        $('#container').css('pointer-events', 'none');
                        winner1++;
                        document.getElementById("player1").innerHTML = winner1;
                        return red;
                    }
                }
                if (win.hasClass('yellow')) {
                    yellow++;
                    red = 0;
                    if (yellow === 5) {
                        prompt('Congratulations, yellow win !');
                        $('#container').css('pointer-events', 'none');
                        winner2++;
                        document.getElementById("player2").innerHTML = winner2;
                        return yellow;
                    }
                }
                col++;
                lgn--;
            }
            for (let i = 4; i > 0; i--) {
                let win = $(`.col[data-col=${col2}][data-lgn=${lgn2}]`);

                if (win.hasClass('red')) {
                    red++;
                    yellow = 0;
                    if (red === 5) {
                        prompt('Congratulations, red win !');
                        $('#container').css('pointer-events', 'none');
                        winner1++;
                        document.getElementById("player1").innerHTML = winner1;
                        return red;
                    }
                }
                if (win.hasClass('yellow')) {
                    yellow++;
                    red = 0;
                    if (yellow === 5) {
                        prompt('Congratulations, yellow win !');
                        $('#container').css('pointer-events', 'none');
                        winner2++;
                        document.getElementById("player2").innerHTML = winner2;
                        return yellow;
                    }
                }
                col2--;
                lgn2++;
            }

        }

        function winner_diagb(column, line, winner1, winner2) {
            let red = 0;
            let yellow = 0;
            let col = column;
            let lgn = line;
            let col2 = column;
            let lgn2 = line;

            for (let i = 4; i > 0; i--) {
                let win = $(`.col[data-col=${col}][data-lgn=${lgn}]`);

                if (win.hasClass('red')) {
                    red++;
                    yellow = 0;
                    if (red === 5) {
                        prompt('Congratulations, red win !');
                        $('#container').css('pointer-events', 'none');
                        winner1++;
                        document.getElementById("player1").innerHTML = winner1;
                        return red;
                    }
                }
                if (win.hasClass('yellow')) {
                    yellow++;
                    red = 0;
                    if (yellow === 5) {
                        prompt('Congratulations, yellow win !');
                        $('#container').css('pointer-events', 'none');
                        winner2++;
                        document.getElementById("player2").innerHTML = winner2;
                        return yellow;
                    }
                }
                col--;
                lgn--;
            }
            for (let i = 4; i > 0; i--) {
                let win = $(`.col[data-col=${col2}][data-lgn=${lgn2}]`);

                if (win.hasClass('red')) {
                    red++;
                    yellow = 0;
                    if (red === 5) {
                        prompt('Congratulations, Les rouges gagnent !');
                        $('#container').css('pointer-events', 'none');
                        winner1++;
                        document.getElementById("player1").innerHTML = winner1;
                        return red;
                    }
                }
                if (win.hasClass('yellow')) {
                    yellow++;
                    red = 0;
                    if (yellow === 5) {
                        prompt('Congratulations, les jaunes gagnent win !');
                        $('#container').css('pointer-events', 'none');
                        winner2++;
                        document.getElementById("player2").innerHTML = winner2;
                        return yellow;
                    }
                }
                col2++;
                lgn2++;
            }

        }


    }
});