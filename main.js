//Copyright©2014 plasma-effect(plasma-e)
//Licensed under the MIT licence
var value = new Array(0, 0, 0, 0);
var images = new Image();
var resultImages = new Image();
var flag = -1;
var timer;

function imageLoad(n)
{
    images.src = "img/" + n + ".png";
    if (n == 9)
        return;
    images.onload = function () {
        imageLoad(n + 1);
    }
}
function resultImageLoad(n)
{
    resultImages.src = "img/Result" + n + ".png";
    if (n == 9)
        return;
    resultImages.onload = function () {
        resultImageLoad(n + 1);
    }
}


function countUp(n)
{
    value[n] = (value[n] + 1) % 10;
    writeSlot();
}
function primeCheck(n)
{
    var i = 3;
    if (n <= 1)
        return false;
    if (n == 2)
        return true;
    while(i < n)
    {
        if (n % i == 0)
            return false;
        i += 2;
    }
    return true;
}
function getSum()
{
    return 1000 * value[0] + 100 * value[1] + 10 * value[2] + value[3];
}
function matchCheck()
{
    var i = 0;
    i += (value[0] == 1 ? 1 : 0);
    i += (value[1] == 0 ? 1 : 0);
    i += (value[2] == 3 ? 1 : 0);
    i += (value[3] == 1 ? 1 : 0);
    return i;
}
function hasPair()
{
    if ((value[0] + value[1]) == 10)
        return true;
    if ((value[2] + value[1]) == 10)
        return true;
    if ((value[3] + value[1]) == 10)
        return true;
    if ((value[0] + value[2]) == 10)
        return true;
    if ((value[3] + value[2]) == 10)
        return true;
    if ((value[0] + value[3]) == 10)
        return true;
    return false;
}

var resultData =
    {
        is1031: 0,
        isPrime: 1,
        is13Times: 2,
        isSum10: 3,
        is3Match: 4,
        isZoro: 5,
        has10Pair: 6,
        isSum20: 7,
        is1101: 8,
        noData: 9
    }

function resultCheck()
{
    var n = getSum();
    var m = matchCheck();
    //1031かどうか
    if (n == 1031)
        return resultData.is1031;

    //1101か
    if (n == 1101)
        return resultData.is1101;

    //ゾロ目か
    if (value[0] == value[1] && value[1] == value[2] && value[2] == value[3])
        return resultData.isZoro;

    //3個合ってるか
    if (m == 3)
        return resultData.is3Match;

    //各桁の和が20かどうか
    if ((value[0] + value[1] + value[2] + value[3]) == 20)
        return resultData.isSum20;

    //各桁の和が10かどうか
    if ((value[0] + value[1] + value[2] + value[3]) == 10)
        return resultData.isSum10;

    //和が10のペアを持つか
    if (hasPair())
        return resultData.has10Pair;

    //素数かどうか
    if (primeCheck(n))
        return resultData.isPrime;

    //13の倍数かどうか
    if (n % 13 == 0)
        return resultData.is13Times;
    
    //特に無い
    return resultData.noData;
}

function writeSlot()
{
    var elem = document.getElementById("area");
    elem.innerHTML =
        "<img src=\"img/" + value[0] + ".png\" />" +
        "<img src=\"img/" + value[1] + ".png\" />" +
        "<img src=\"img/" + value[2] + ".png\" />" +
        "<img src=\"img/" + value[3] + ".png\" />" + "<br />";
}

function buttonPress()
{
    if(flag==-1)
    {
        imageLoad(0);
        resultImageLoad(0);
        writeSlot();
        timer = setInterval(countUp, 50, 0);
        var bElem = document.getElementById("gameButton");
        bElem.innerHTML="止める";
        flag = 0;
    }
    else if(flag==0)
    {
        clearInterval(timer);
        timer = setInterval(countUp, 38, 1);
        flag = 1;
    }
    else if (flag == 1)
    {
        clearInterval(timer);
        timer = setInterval(countUp, 25, 2);
        flag = 2;
    }
    else if (flag == 2)
    {
        clearInterval(timer);
        timer = setInterval(countUp, 13, 3);
        flag = 3;
    }
    else if (flag == 3)
    {
        clearInterval(timer);
        setTimeout(function () {
            var elem = document.getElementById("area");
            elem.innerHTML = "<img src=\"img/Result" + resultCheck() + ".png\" /><br />";
            elem = document.getElementById("gameButton");
            elem.innerHTML = "もう一回やる";
            flag = 4;
        }, 300);
    }
    else if(flag==4)
    {
        timer = setInterval(countUp, 50, 0);
        var bElem = document.getElementById("gameButton");
        bElem.innerHTML = "止める";
        flag = 0;
        value[0] = 0;
        value[1] = 0;
        value[2] = 0;
        value[3] = 0;
    }
}