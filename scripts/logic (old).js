$(document).ready(function () {

    // init variables
    //---------------------\\
    var operator,
        prevValue,
        curValue = 0,
        decFlag = false,
        ops = { "add" : add
              , "sub" : sub
              , "mul" : mul
              , "div" : div
              , "sqt" : sqt
              , "neg" : neg
              , "pct" : pct
              };
    //=====================//
    

    // validates number of screen digits
    //---------------------------------------------------------------\\
    function limitReached(num) {
        return num.toString().length > 11 ? true : false;
    }//==============================================================//
    
    
    // removes unnecessary zeros at start of string
    //---------------------------------------------------------------\\
    function stripZeros(str) {
	   return str.replace(/^0+(?!\.|$)/, '');
    }//==============================================================//
    
    
    // ensures value length does not exceed display
    //---------------------------------------------------------------\\
    function formatDisplay(num) {
        /*
        var truncated = (num.toString().length > 12)
            ? parseFloat(num.toString().slice(0, 13))
            : num;
        */
        return (num > 10e+8 - 1 || num < -10e+8 + 1) 
            ? num.toExponential(8) // num.toPrecision(7)
            : parseFloat(num.toPrecision(7));
            // num.toString().slice(0, 13);
    }//==============================================================//
    
    
    // gets and displays numeric input
    //---------------------------------------------------------------\\
    function numKey() {
        if (limitReached(curValue)) {
            window.alert('Error: Input string exceeds max length.');
        }
        else {
            curValue = stripZeros(curValue + $(this).text());
            console.log(curValue); // DEBUG
            $('#screen').text(curValue); // .slice(1));
        }
    }//==============================================================//
    
    
    // gets and displays operator
    //---------------------------------------------------------------\\
    function binaryOp() {
        if (!curValue) { return; }
        else {
            prevValue = curValue;
            curValue = 0;
            operator = $(this).attr('id');
            /*
            switch ($(this).attr('id')) {
                case "add":
                    operator = "+";
                    break;
                case "sub":
                    operator = "-";
                    break;
                case "mul":
                    operator = "*";
                    break;
                case "div":
                    operator = "/";
                    break;
            }
            */
            console.log(operator); // DEBUG
            $('#screen').text($(this).text());
            decFlag = false;
        }
    }//==============================================================//
    
    
    // performs a unary operation
    //---------------------------------------------------------------\\
    function unaryOp() {
        if (!curValue) { return; }
        else {
            var fn = $(this).attr('id');
            console.log(fn, typeof(fn));
            /*
            fn = eval(fn);
            */
            curValue = ops[fn](curValue);
            $('#screen').text(formatDisplay(curValue));
        }
    }//==============================================================//
    
    
    // clears screen and resets all variables
    //---------------------------------------------------------------\\
    function allClear() {
        curValue  = 0;
        prevValue = 0;
        operator  = null;
        decFlag   = false;
        $('#screen').text(curValue);
    }//==============================================================//
    
    
    // performs binary operation; assigns results to current value
    //---------------------------------------------------------------\\
    function evaluate() {
        if (!prevValue) { return; }
        curValue = ops[operator](prevValue, curValue);
        // curValue  = eval(prevValue + operator + curValue);
        console.log(curValue, typeof(curValue)); // DEBUG
        prevValue = null;
        operator  = null;
        decFlag   = curValue.toString().indexOf(".") !== -1
            ? true
            : false;
        $('#screen').text(formatDisplay(curValue));
    }//==============================================================//
    
    
    // binary operation functions (4/4)
    //---------------------------------------------------------------\\
    function add(x, y) { return parseFloat(x) + parseFloat(y); }
    function sub(x, y) { return parseFloat(x) - parseFloat(y); }
    function mul(x, y) { return parseFloat(x) * parseFloat(y); }
    function div(x, y) { return parseFloat(x) / parseFloat(y); }
    //===============================================================//
    
    
    // unary operation functions (2/4)
    //---------------------------------------------------------------\\
    function neg(num) { return parseFloat(num) * -1 ; }
    function pct(num) { return parseFloat(num) / 100; }
    //===============================================================//
    
    
    // unary: gets square root or alerts error & switches sign
    //---------------------------------------------------------------\\
    function sqt(num) {
        if (num < 0) {
            window.alert('Error: Cannot take negative root.' +
                         '\n' +
                         'Switching sign to positive.');
            return -num;
        }
        else {
            console.log(Math.sqrt(parseFloat(num))); // DEBUG
            return Math.sqrt(parseFloat(num));
        }
        /*
        return num < 0 ? -num : Math.sqrt(parseFloat(num));
        //--------------------------
        if (isNaN(Math.sqrt(parseFloat(num)))) {
            $('#screen').text("Error");
            return;
        } else {
            return Math.sqrt(parseFloat(num));
        }
        //--------------------------
        return !(isNaN(Math.sqrt(parseFloat(num))))
            ? Math.sqrt(parseFloat(num))
            : new Error("Error");
        //--------------------------
        try {
            return Math.sqrt(parseFloat(num));
        }
        catch (errMsg) {
            alert(errMsg.message);
        }
        finally {
            if(isNaN(num)) { throw new Error("Error"); }
        }
        */
    }//==============================================================//

    
    // unary: adds decimal if nonexistent
    //---------------------------------------------------------------\\
    function dec() {
        if (decFlag) { return; }
        else {
            curValue = curValue.toString() + ".";
            console.log(curValue, typeof(curValue)); // DEBUG
            decFlag = true;
            $('#screen').text(curValue);
        }
    }//==============================================================//

    
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