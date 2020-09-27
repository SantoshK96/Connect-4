const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

//connect 4 logic to check the result
function WinnerCalc(matrix) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            let element = matrix[row][col];

            if (col <= matrix[row].length - 4 && element == matrix[row][col + 1] && element == matrix[row][col + 2] && element == matrix[row][col + 3] && element != null)
                return true;

            if (row <= matrix.length - 4 && element == matrix[row + 1][col] && element == matrix[row + 2][col] && element == matrix[row + 3][col] && element != null) {
                return true;
            }

            if (row <= matrix.length - 4 && col <= matrix[row].length - 4) {
                if (element == matrix[row + 1][col + 1] && element == matrix[row + 2][col + 2] && element == matrix[row + 3][col + 3] && element != null)
                    return true;
            }

            if (row <= matrix.length - 4 && col >= matrix[row].length - 4) {
                if (element == matrix[row + 1][col - 1] && element == matrix[row + 2][col - 2] && element == matrix[row + 3][col - 3] && element != null)
                    return true;
            }
        }
    }
    return false;
}

function toMatrix(arr, width) {
    return arr.reduce(function (rows, key, index) {
        return (index % width == 0 ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows;
    }, []);
}

// api to get the updated matrix
app.get('/posts', (req, res) => {
    res.send(posts);
});

//api which takes current click position & user
//returns updated position in correosponding column
app.post('/posts', (req, res) => {
    if (Number(req.body.position) > 41 || Number(req.body.position) < 0)
        res.status(400).send("Invalid Coin Position");
    else {
        let column = Number(req.body.position) % 7;
        posts[column].push(Number(req.body.player));
        player = (req.body.player) ? 'Red' : 'Yellow';
        let pos = 35 + column - 7 * (posts[column].length - 1);
        res.status(201).send({
            position: pos
        });
    }
});
//api to reset the game
app.post('/restart', (req, res) => {
    for (let i = 0; i < 7; i++) {
        posts[i] = [];
    }
    res.status(201).send({});
});
//api to check whether the matrix has 4 consecutive similar coins
app.post('/checkWinner', (req, res) => {
    const matrix = toMatrix(req.body.board, 7);
    res.status(201).send({
        result: WinnerCalc(matrix)
    });
});


app.listen(4000, () => {
    console.log('Listening on 4000');
});