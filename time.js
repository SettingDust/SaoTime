/**
 *
 * @param _radius 半径
 * @param _color 颜色
 * @param _lineWidth 圆环宽度
 * @param _alpha 圆环透明度
 * @param _second 动画长度，越短越快
 * @param _direction 转动方向
 * @param _lineArray 圆环间隔与实线数组
 * @constructor
 */
function CanvasLine(_alpha, _radius, _lineArray, _lineWidth, _second, _direction, _color) {
    this.radius = _radius;
    this.lineWidth = _lineWidth;
    this.color = _color;
    this.alpha = _alpha;
    this.second = _second;
    this.direction = _direction;

    this.lineArray = [_lineArray.length];
    for (var i = 0; i < _lineArray.length; i++) {
        this.lineArray[i] = _lineArray[i] * _radius / 2 * Math.PI / 180;
    }
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length === 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

function drawCircleContext(canvas, canvasLine, distance) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    if (distance === 0) {
        ctx.strokeStyle = canvasLine.color;
        ctx.globalAlpha = canvasLine.alpha;
        ctx.lineWidth = canvasLine.lineWidth;
        ctx.setLineDash(canvasLine.lineArray);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if (canvasLine.direction)
            ctx.rotate(distance);
        else
            ctx.rotate(-distance);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }
    ctx.arc(canvas.width / 2, canvas.height / 2,
        canvasLine.radius / 2,
        -Math.PI * 0.5,
        +Math.PI * 1.5, true);
    ctx.stroke();
}

HTMLCanvasElement.prototype.drawCircleLines = function (canvasLine) {
    var canvas = this;
    drawCircleContext(canvas, canvasLine, 0);
    if (canvasLine.second === 0) return;
    var distance = Math.PI * 2 / canvasLine.second / 1000 * (1000 / 60);
    setInterval(function () {
        drawCircleContext(canvas, canvasLine, distance);
    }, 1000 / 60)
};

window.addEventListener("load", function (_) {
    var time = $("time");
    var canvasElem = $("canvas");

    function Canvas(canvasLine) {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width", getComputedStyle(canvasElem).width);
        this.canvas.setAttribute("height", getComputedStyle(canvasElem).height);
        canvasElem.appendChild(this.canvas);
        this.canvas.drawCircleLines(canvasLine);
    }

    var angel = 360 * new Date().getSeconds() / 60;
    new Canvas(new CanvasLine(0.6, 230, [0, 110, 45, 110, 10, 5, 70, 0, 10], 5, 25, true, "#3498db"));
    new Canvas(new CanvasLine(0.4, 210, [0, 90, 100, 110, 50], 3, 16, false, "#3498db"));
    new Canvas(new CanvasLine(0.3, 190, [0, 30, 5, 3, 60, 130, 5, 3, 90, 34], 5, 20, true, "#3498db"));
    new Canvas(new CanvasLine(0.5, 180, [30, 80, 110, 80, 40, 20], 3, 18, false, "#3498db"));
    new Canvas(new CanvasLine(0.7, 130, [0, 60, 30, 130, 45, 95], 10, 15, true, "#3498db"));
    new Canvas(new CanvasLine(0.5, 110, [0, 30, 230, 100], 3, 6, false, "#3498db"));
    new Canvas(new CanvasLine(0.6, 100, [130, 120, 110], 3, 4, true, "#3498db"));
    new Canvas(new CanvasLine(1, 60, [0, angel, 6, 354 - angel], 3, 0, true, "#3498db")).canvas.setAttribute("class", "rotate");

    time.innerText = new Date().format("hh:mm");
    setInterval(function () {
        time.innerText = new Date().format("hh:mm");
    }, 1000);

});