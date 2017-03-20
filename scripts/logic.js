$(document).ready(function () {

    // init variables
    //-----------------------------------------------------------------\\
    var operator,
        preVal,
        curVal  = 0,
        decFlag = false,
        ops     = {
    "add": function add(x, y) { return parseFloat(x) + parseFloat(y); },
    "sub": function sub(x, y) { return parseFloat(x) - parseFloat(y); },
    "mul": function mul(x, y) { return parseFloat(x) * parseFloat(y); },
    "div": function div(x, y) { return parseFloat(x) / parseFloat(y); },
    "neg": function neg(n)    { return parseFloat(n) * -1           ; },
    "pct": function pct(n)    { return parseFloat(n) / 100          ; },
    "sqt": function sqt(n)    {
        if (n < 0) {
            window.alert('Error: Cannot take negative root.' +
                         '\nSwitching sign to positive.');
            return -n;
        } else {
            console.log(Math.sqrt(parseFloat(n))); // DEBUG
            return Math.sqrt(parseFloat(n));
        }
        }
    };//===============================================================//
    

    // validate number of screen digits
    //-----------------------------------------------------------------\\
    function limitReached(num) {
        return num.toString().length > 12 ? true : false;
    }//================================================================//
    
    
    // remove unnecessary zeros at start of string
    //-----------------------------------------------------------------\\
    function stripZeros(str) {
	   return str.replace(/^0+(?!\.|$)/, '');
    }//================================================================//
    
    
    // ensure value length does not exceed display
    //---------------------------------------------------------------\\
    function formatDisplay(num) {
        return (num > 10e+9 - 1 || num < -10e+9 + 1) 
            ? num.toExponential(9)
            : parseFloat(num.toPrecision(7));
    }//================================================================//
    
    
    // get and display numeric input
    //---------------------------------------------------------------\\
    function numKey() {
        if (limitReached(curVal)) {
            window.alert('Error: Input string exceeds max length.');
        }
        else {
            curVal = stripZeros(curVal + $(this).text());
            console.log(curVal); // DEBUG
            $('#screen').text(curVal); // .slice(1));
        }
    }//================================================================//
    
    
    // get and display operator
    //-----------------------------------------------------------------\\
    function binaryOp() {
        if (!curVal) { return; }
        else {
            preVal   = curVal;
            curVal   = 0;
            operator = $(this).attr('id');
            decFlag  = false;
            console.log(operator); // DEBUG
            $('#screen').text($(this).text());
        }
    }//================================================================//
    
    
    // perform a unary operation
    //-----------------------------------------------------------------\\
    function unaryOp() {
        if (!curVal) { return; }
        else {
            var fn = $(this).attr('id');
            curVal = ops[fn](curVal);
            console.log(fn, typeof(fn)); // DEBUG
            $('#screen').text(formatDisplay(curVal));
        }
    }//================================================================//
    
    
    // clear screen and reset all variables
    //-----------------------------------------------------------------\\
    function allClear() {
        curVal   = 0;
        preVal   = 0;
        operator = null;
        decFlag  = false;
        $('#screen').text(curVal);
    }//================================================================//
    
    
    // performs binary operation; assigns results to current value
    //-----------------------------------------------------------------\\
    function evaluate() {
        if (!preVal) { return; }
        curVal   = ops[operator](preVal, curVal);
        preVal   = null;
        operator = null;
        decFlag  = curVal.toString().indexOf(".") !== -1 ? true: false;
        console.log(curVal, typeof(curVal)); // DEBUG
        $('#screen').text(formatDisplay(curVal));
    }//================================================================//

    
    // unary: add decimal if nonexistent
    //-----------------------------------------------------------------\\
    function dec() {
        if (decFlag) { return; }
        else {
            curVal  = curVal.toString() + ".";
            decFlag = true;
            console.log(curVal, typeof(curVal)); // DEBUG
            $('#screen').text(curVal);
        }
    }//================================================================//

    
    // set key events
    //---------------------------\\
    $('.number').click(numKey);
    $('.binary').click(binaryOp);
    $('.unary').click(unaryOp);
    $('#dec').click(dec);
    $('#ac').click(allClear);
    $('#eq').click(evaluate);
    //===========================//
    
}); // document end