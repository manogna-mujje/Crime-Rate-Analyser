var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var skillBars = [];
skillBars.push({
    max: 200,
    color: "red"
});
skillBars.push({
    max: 75,
    color: "green"
});
skillBars.push({
    max: 275,
    color: "blue"
});

var chartBottomY = 325;
var chartBarWidth = 30;
var chartBarPadding = 20;
var percent = 0;

animate();

var fps = 5;

function animate() {
    // if not 100% done, request another frame
    if (percent++ < 100) {
        requestAnimationFrame(animate);
    }

    // Drawing code goes here
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var x = chartBarPadding;
    for (var i = 0; i < skillBars.length; i++) {
        var height = skillBars[i].max * percent / 100;
        ctx.fillStyle = skillBars[i].color;
        ctx.fillRect(x, chartBottomY, chartBarWidth, -height);
        x += chartBarWidth + chartBarPadding;
    }
}