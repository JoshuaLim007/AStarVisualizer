// JavaScript source code
var gridSizex = 64;
var gridSizey = 64;
var grid = new Array(gridSizey);

var openSet = [];
var closedSet = [];
var start;
var end;

var randomTheta = 0.3;

function Node(x,y) {
    this.x = x;
    this.y = y;

    this.f = Infinity;
    this.g = Infinity;
    this.h = 0;
    this.neighbors = [];
    this.cameFrom = null;
    this.isObstacle = false;

    if (RandomObstacle(randomTheta)) {
        this.isObstacle = true;
    }

    this.addNeighbors = function (grid) {
        var x = this.x;
        var y = this.y;

        //up down
        if (x < gridSizex - 1) {
            this.neighbors.push(grid[y][x + 1]);
        }
        if (x > 0) {
            this.neighbors.push(grid[y][x - 1]);
        }
        if (y < gridSizey-1) {
            this.neighbors.push(grid[y + 1][x]);
        }
        if (y > 0) {
            this.neighbors.push(grid[y - 1][x]);
        }

        //diagonals
        if (x > 0 && y > 0) {
            this.neighbors.push(grid[y - 1][x - 1]);
        }
        if (x < gridSizex - 1 && y > 0) {
            this.neighbors.push(grid[y - 1][x + 1]);
        }
        if (x > 0 && y < gridSizey - 1) {
            this.neighbors.push(grid[y + 1][x - 1]);
        }
        if (x < gridSizex - 1 && y < gridSizey - 1) {
            this.neighbors.push(grid[y + 1][x + 1]);
        }
    }
}

function RandomObstacle(theta) {

    var num = Math.random() * (2 * 3.14);

    var ran = (Math.sin(num) + 1) * 0.5 + theta;

    if (ran < 1) {
        return false;
    }
    else {
        return true;
    }
}

function Theta() {

    var slider = document.getElementById("thetaRange");
    console.log(slider.value);
    randomTheta = slider.value / 100;
    Awake();
}

function Awake() {
    openSet = [];
    closedSet = [];
    start = null;
    end = null;
    grid = new Array(gridSizey);
    Start = false;
    PathFound = false;

    var mp = document.getElementById("MasterParent");
    var par = document.getElementById('DrawCanvas');
    if (par != null) {
        par.remove();
    }
    par = document.createElement('div');
    par.setAttribute('class', 'DrawCanvas');
    par.setAttribute('id', 'DrawCanvas');
    mp.appendChild(par);

    for (var y = 0; y < gridSizey; y++) {

        grid[y] = new Array(gridSizex);

        var rowP = document.createElement('div');
        rowP.setAttribute('class', 'Row');
        rowP.setAttribute('id', y);
        par.appendChild(rowP);

        for (var x = 0; x < gridSizex; x++) {

            grid[y][x] = new Node(x,y);

            var cell = document.createElement('div');
            cell.textContent = "box";
            cell.setAttribute('class', 'Cell');
            cell.setAttribute('id', y+"-"+x);
            rowP.appendChild(cell);

            if (grid[y][x].isObstacle) {
                cell.setAttribute('class', 'obstacle');
            }

        }
    }
    for (var y = 0; y < gridSizey; y++) {
        for (var x = 0; x < gridSizex; x++) {
            grid[y][x].addNeighbors(grid);
        }
    }

    start = grid[Math.round(gridSizey * 0.2)][Math.round(gridSizex * 0.1)];
    end = grid[Math.round(gridSizey * 0.8)][Math.round(gridSizex * 0.8)];
    start.isObstacle = false;
    end.isObstacle = false;
    start.g = 0;
    start.f = 0;

    var startElement = document.getElementById(start.y + "-" + start.x);
    startElement.className = "start";

    var endElement = document.getElementById(end.y + "-" + end.x);
    endElement.className = "end";

    console.log(grid);

    openSet.push(start);

    //var status = AstarMain();
    //if (status) {
    //    console.log("Found Shortest Path");
    //}
    //else {
    //    console.log("No Shortest Path");
    //}
}
