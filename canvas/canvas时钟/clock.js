var dom = document.getElementById("clock");
var ctx = dom.getContext('2d');
//获取canvas元素的宽和高以及求出半径
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;
var rem = width/200;
//画时钟背景
function drawBackground() {
    ctx.save();
    //将画布圆点定在中点
    ctx.translate(r,r);
    //开始画圆
    ctx.beginPath();
    ctx.lineWidth = 10*rem;
    ctx.arc(0,0,r-5*rem,0,2*Math.PI,false);
    ctx.stroke();

    var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font = 18*rem+'px Arial';
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';
    //画十二个数字
    hourNumbers.forEach(function (number,i) {
        var rad = 2*Math.PI/12 * i;
        var x = Math.cos(rad)*(r-30*rem);
        var y = Math.sin(rad)*(r-30*rem);
        ctx.fillText(number,x,y);
    })
    //画六十个点
    for(var i=0 ; i<60 ;i++){
        var rad = 2*Math.PI/60*i;
        var x = Math.cos(rad)*(r-18*rem);
        var y = Math.sin(rad)*(r-18*rem);
        ctx.beginPath();
        //每隔五个点是黑色
        if(i%5 === 0){
            ctx.fillStyle = '#000';
            ctx.arc(x,y,2*rem,0,2*Math.PI,false);
        }else {
            ctx.fillStyle = '#ccc';
            ctx.arc(x,y,2*rem,0,2*Math.PI,false);
        }
        ctx.fill();
    }
}
//画时针
function drawHour(hour,minute) {
    ctx.save();
    ctx.beginPath();
    var rad = 2*Math.PI/12 * hour;
    var mrad = 2*Math.PI/12/60 * minute;
    ctx.rotate(rad+mrad);
    //线的圆角
    ctx.lineCap = "round";
    ctx.lineWidth = 6*rem;
    //线条起始点
    ctx.moveTo(0,10);
    //线条结束点
    ctx.lineTo(0,-r/2);
    ctx.stroke();
    ctx.restore();
}
//花分针
function drawMinute(minute,second) {
    ctx.save();
    ctx.beginPath();
    var rad = 2*Math.PI/60 * minute;
    var srad = 2*Math.PI/60/60 *second;
    ctx.rotate(rad+srad)
    //线的圆角
    ctx.lineCap = "round";
    ctx.lineWidth = 3*rem;
    //线条起始点
    ctx.moveTo(0,10*rem);
    //线条结束点
    ctx.lineTo(0,-r+30*rem);
    ctx.stroke();
    ctx.restore();
}
//画秒针
function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#c14542';
    var rad = 2*Math.PI/60 * second;
    ctx.rotate(rad)
    //线的圆角
    ctx.lineCap = "round";
    ctx.lineWidth = 3*rem;
    //线条起始点
    ctx.moveTo(-2*rem,20*rem);
    ctx.lineTo(2*rem,20*rem);
    ctx.lineTo(1*rem,-r+18*rem);
    ctx.lineTo(-1*rem,-r+18*rem);
    ctx.fill();
    ctx.restore();
}
//画中间点
function drawDot() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'write';
    ctx.arc(0,0,3*rem,0,2*Math.PI,false);
    ctx.fill();
    ctx.restore();
}
//
function draw() {
    ctx.clearRect(0,0,width,height);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute,second);
    drawSecond(second);
    drawDot();
    ctx.restore();
}
draw();
setInterval(draw,1000)

// drawHour(4,30);
// drawMinute(30);
// drawSecond(0);
