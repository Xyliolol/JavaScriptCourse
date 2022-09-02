let app = {
    config: {
        rows: [8, 7, 6, 5, 4, 3, 2, 1],
        cols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    },

    run() {
        let board = this.generateBoard();
        document.body.innerHTML = board;
        this.insertFiguresOnDesk();
        this.insertPawns();
        this.insertRowsNumbers();
        this.insertColsChars();
    },


    insertPawns() {
        let whitePawnsRow = document.querySelectorAll('tr:nth-child(7) td');
        for (let i = 0; i < whitePawnsRow.length; i++) {
            whitePawnsRow[i].innerHTML = this.getFigure('pawn', 'whiteFigure');
        }

        let blackPawnsRow = document.querySelectorAll('tr:nth-child(2) td');
        for (let i = 0; i < blackPawnsRow.length; i++) {
            blackPawnsRow[i].innerHTML = this.getFigure('pawn', 'blackFigure');
        }
    },

    insertFiguresOnDesk() {
        for (let i = 0; i < positions.length; i++) {
            let cell = document.querySelector(`[data-rownum="${positions[i].coordRow}"][data-colchar="${positions[i].coordCol}"]`);
            let figure = this.getFigure(positions[i].figure, positions[i].color + "Figure");
            cell.innerHTML = figure;
        }
    },

    getFigure(name, colorClass) {
        return `<i class="fas fa-chess-${name} ${colorClass}"></i>`;
    },

    generateBoard() {
        let board = "";
        let rowStartWithColor = 'white';
        for (let i = 0; i < this.config.rows.length; i++) {
            let row = "";
            if (rowStartWithColor == 'white') {
                row = this.generateRow(rowStartWithColor, this.config.rows[i]);
                rowStartWithColor = 'black';
            } else {
                row = this.generateRow(rowStartWithColor, this.config.rows[i]);
                rowStartWithColor = 'white';
            }
            board += row;
        }
        return `<table>${board}</table>`;
    },

    generateRow(startWithColor, rowNum) {
        let currentColorClass = startWithColor;
        let row = "";
        for (let i = 0; i < this.config.cols.length; i++) {
            let field = "";
            if (currentColorClass === 'white') {
                field = this.generateField('white', rowNum, this.config.cols[i]);
                currentColorClass = 'blackField';
            } else {
                field = this.generateField('black', rowNum, this.config.cols[i]);
                currentColorClass = 'white';
            }
            row += field;
        }
        return `<tr>${row}</tr>`;
    },

    generateField(color, rowNum, colChar) {
        return `<td data-rownum="${rowNum}" data-colchar="${colChar}" class="${color}"></td>`;
    },

    insertRowsNumbers() {
        let trs = document.querySelectorAll('tr');
        for (let i = 0; i < trs.length; i++) {
            let td = document.createElement('td');
            td.innerText = this.config.rows[i];
            trs[i].insertAdjacentElement("afterbegin", td);
        }
    },

    insertColsChars() {
        let tr = document.createElement('tr');
        tr.innerHTML += '<td></td>';
        for (let i = 0; i < this.config.cols.length; i++) {
            tr.innerHTML += `<td>${this.config.cols[i]}</td>`;
        }
        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentElement("beforeend", tr);
    },
}

app.run();
