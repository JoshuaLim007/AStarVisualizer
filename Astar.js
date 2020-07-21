// JavaScript source code

//code is poorly optimized!!!
//Created By Joshua Lim 7/21/2020

var TracePath = [];
var PathFound = false;
var Start = false;

setInterval(function () {
    Main();
}, 0);
function StartSearch() {
    Start = true;
}
function Main() {

    if (Start && !PathFound) {
        AstarMain();
    }
}

function AstarMain() {
    console.log("calculating path");

    //openset = newly found cells
    //closedset = tested cells

    if (openSet.length > 0) {

        var lowestFScoreIndex = 0;
        //finds element with lowest f score
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestFScoreIndex].f) {
                lowestFScoreIndex = i;
            }
        }
        //replaces current with lowest f score 
        var current = openSet[lowestFScoreIndex];
        if (current == end) {
            TracePath = [];
            var temp = current;
            TracePath.push(temp);
            while (temp.cameFrom) {
                TracePath.push(temp.cameFrom);
                temp = temp.cameFrom;
            }
            for (var i = 0; i < TracePath.length; i++) {
                UpdateTracedPathVisuals(TracePath[i]);
            }

            console.log("Found Path");

            Start = false;
            PathFound = true;
            //return true;
        }

        //updates visuals
        UpdateVisuals(current);
        //removes current from open set
        RemoveFromArray(openSet, current);
        //then pushes it to closed set
        closedSet.push(current);

        //current neighbors
        var _neighbors = current.neighbors;


        //g score cost from start to current
        //h score cost from end to current
        //loops through the neighbors of the current cell
        for (var i = 0; i < _neighbors.length; i++) {
            var CurrentNeighbor = _neighbors[i];
            if (!closedSet.includes(CurrentNeighbor) && !CurrentNeighbor.isObstacle) {
                //Heuristic is calculating distance
                var currentGscore = current.g + Heuristic(current, CurrentNeighbor);

                var newPath = false;

                if (openSet.includes(CurrentNeighbor)) {
                    if (currentGscore < CurrentNeighbor.g) {

                        CurrentNeighbor.g = currentGscore;

                        newPath = true;
                    }
                }
                else {
                    CurrentNeighbor.g = currentGscore;

                    newPath = true;

                    openSet.push(CurrentNeighbor);
                }

                if (newPath) {
                    CurrentNeighbor.cameFrom = current;

                    CurrentNeighbor.h = Heuristic(CurrentNeighbor, end);

                    CurrentNeighbor.f = CurrentNeighbor.g + CurrentNeighbor.h;
                }
            }
        }
    }
    else {
        console.log("No Path");
        Start = false;
        PathFound = false;
        //return false;
    }

}
function UpdateVisuals(curr) {
    if (curr != end && curr != start) {
        var currVs = document.getElementById(curr.y + "-" + curr.x);
        currVs.className = "found";
    }
}
function UpdateTracedPathVisuals(path) {
    if (path != end && path != start) {
        var pathVs = document.getElementById(path.y + "-" + path.x);
        pathVs.className = "path";
    }
}
function Heuristic(a, b) {
    //eular distance heuristic
    var temp = Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2);
    var distance = Math.sqrt(temp);

    return distance;
}
function RemoveFromArray(arr, element) {
    for (var i = arr.length; i >= 0; i--) {
        if (arr[i] == element) {
            arr.splice(i, 1);
        }
    }
}
