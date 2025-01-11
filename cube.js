const CUBE = document.getElementById("cube");
const ANGULAR_DRAG = 0.2;
const CURSOR_DAMPENER = 0.8;

var cubeVelocity = [0, 0]
var cubeRotation = [0, 0]

var isDraggingCube = false;

CUBE.onmousedown = (e) => { 
    isDraggingCube = true;
    return false;
}
document.body.onmouseup = (e) => { isDraggingCube = false }

document.body.onmousemove = (e) => {
    if (isDraggingCube) {
        cubeVelocity[0] = -e.movementY * CURSOR_DAMPENER;
        cubeVelocity[1] = e.movementX * CURSOR_DAMPENER;
    }
}

function dragVelocity(velocity) {
    if (velocity > ANGULAR_DRAG) {
        return velocity - ANGULAR_DRAG
    } else if (velocity < -ANGULAR_DRAG) {
        return velocity + ANGULAR_DRAG
    } else {
        return 0
    }
}

function animateCube(timestamp) {
    cubeRotation[0] += cubeVelocity[0]
    cubeRotation[1] += cubeVelocity[1]

    cubeVelocity[0] = dragVelocity(cubeVelocity[0])
    cubeVelocity[1] = dragVelocity(cubeVelocity[1])

    CUBE.style.transform = "rotateX(" + cubeRotation[0] + "deg) rotateY(" + cubeRotation[1] + "deg)";
    requestAnimationFrame(animateCube);
}

requestAnimationFrame(animateCube);