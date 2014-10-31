var image = new Array(
    Image(120, 240),
    Image(120, 240),
    Image(120, 240),
    Image(120, 240),
    Image(120, 240),
    Image(120, 240),
    Image(120, 240),
    Image(120, 240),
    Image(120, 240),
    Image(120, 240));

var value = new Array(0, 0, 0, 0);

function imageLoad()
{
    image[0].src = "img/0.png";
    image[1].src = "img/1.png";
    image[2].src = "img/2.png";
    image[3].src = "img/3.png";
    image[4].src = "img/4.png";
    image[5].src = "img/5.png";
    image[6].src = "img/6.png";
    image[7].src = "img/7.png";
    image[8].src = "img/8.png";
    image[9].src = "img/9.png";
}

function countUp(n)
{
    value[n] = (value[n] + 1) % 10;
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
    //1031‚©‚Ç‚¤‚©
    if (n == 1031)
        return resultData.is1031;

    //1101‚©
    if (n == 1101)
        return resultData.is1101;

    //ƒ]ƒ–Ú‚©
    if (value[0] == value[1] && value[1] == value[2] && value[2] == value[3])
        return resultData.isZoro;

    //3ŒÂ‡‚Á‚Ä‚é‚©
    if (m == 3)
        return resultData.is3Match;

    //ŠeŒ…‚Ì˜a‚ª20‚©‚Ç‚¤‚©
    if ((value[0] + value[1] + value[2] + value[3]) == 20)
        return resultData.isSum20;

    //ŠeŒ…‚Ì˜a‚ª10‚©‚Ç‚¤‚©
    if ((value[0] + value[1] + value[2] + value[3]) == 10)
        return resultData.isSum10;

    //˜a‚ª10‚ÌƒyƒA‚ðŽ‚Â‚©
    if (hasPair())
        return resultData.has10Pair;

    //‘f”‚©‚Ç‚¤‚©
    if (primeCheck(n))
        return resultData.isPrime;

    //13‚Ì”{”‚©‚Ç‚¤‚©
    if (n % 13 == 0)
        return resultData.is13Times;
    
    //“Á‚É–³‚¢
    return resultData.noData;
}