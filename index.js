let table = document.getElementById("table");

        for (let i = 0; i < 8; i++) {
            let tr = document.createElement("tr");
            let isWhite = i % 2 === 0; 
            for (let j = 0; j < 8; j++) {
                let td = document.createElement("td");
                td.setAttribute("class", `box ${isWhite ? 'white' : 'black'}`);
                isWhite = !isWhite;
                td.setAttribute("data-index", `${i}-${j}`);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        table.addEventListener("mouseover", function(e){
            let temp = e.target.dataset.index.split("-").map((val) => parseInt(val));
            let row = temp[0];
            let col = temp[1];
            let hash = {};

            hash = findTopLeft(row, col, hash);
            hash = findTopRight(row, col, hash);
            hash = findBottomLeft(row, col, hash);
            hash = findBottomRight(row, col, hash);

            let cells = document.querySelectorAll("td");

            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.remove("darkblue");
            }

            for (let i = 0; i < cells.length; i++) {
                let str = `${cells[i].closest("tr").rowIndex}-${cells[i].cellIndex}`;
                if (hash[str]) {
                    cells[i].classList.add("darkblue");
                }
            }
        });

        table.addEventListener("mouseleave", function(e) {
            const cells = document.querySelectorAll("td");

            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.remove("darkblue");
            }
        });

        function findTopLeft(row, col, hash) {
            row--;
            col--;
            while (row >=0 && col >=0) {
                let key = `${row}-${col}`;
                hash[key] = true;
                row--;
                col--;
            }

            return hash;
        }

        function findTopRight(row, col, hash) {
            row--;
            col++;
            while (row >=0 && col < 8) {
                let key = `${row}-${col}`;
                hash[key] = true;
                row--;
                col++;
            }

            return hash;
        }

        function findBottomLeft(row, col, hash) {
            row++;
            col--;
            while (row < 8 && col >= 0) {
                let key = `${row}-${col}`;
                hash[key] = true;
                row++;
                col--;
            }

            return hash;
        }

        function findBottomRight(row, col, hash) {
            row++;
            col++;
            while (row < 8 && col < 8 ) {
                let key = `${row}-${col}`;
                hash[key] = true;
                row++;
                col++;
            }

            return hash;
        }