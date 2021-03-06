function denySpecialCharacters(inputField,useExtendedSet){
  if(useExtendedSet==null) useExtendedSet = false;
  var checkChar = inputField.value.charAt(inputField.value.length-1);
  var extendedSet = "()<>@,;:.[]/\'%$*%??!^_#&|??{}\"???`~=?+";
  
  if(checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' ||
     checkChar=='?' || checkChar=='?' || 
     (useExtendedSet?(extendedSet.indexOf(checkChar) > -1):false)
    ){
    inputField.value = inputField.value.substring(0,inputField.value.length-1);
  }
  
  // prevent double spaces
  inputField.value = inputField.value.replace(/\s+/g," ");
}

function limitChars(textFieldObj,maxCharsAllowed){
  var text = textFieldObj.value;
  text = replaceAll(text,"\r\n","<br>");
    
  if(text.length > maxCharsAllowed){
    textFieldObj.value = text.substring(0,maxCharsAllowed);
    textFieldObj.value = replaceAll(text.substring(0,maxCharsAllowed),"<br>","\r\n");
  }
}

function limitLength(object,iMaxLength){
  if(iMaxLength==null) iMaxLength = 250;
  if(object.value.length>=iMaxLength){
    object.value = object.value.substring(0,iMaxLength-1);
  }
}

function setLength(sObject, iLength){
  if(sObject.value.length>iLength){
    sObject.value = sObject.value.substring(0,iLength);
  }
}

function setDecimalLength(sObject, iLength){
  sObject.value = sObject.value.replace(",",".");
  var commaIdx = sObject.value.indexOf(".");

  if(commaIdx > -1){
    var integer  = sObject.value.substring(0,commaIdx);
    var decimals = sObject.value.substring(commaIdx+1);
    if(decimals.length > iLength) {
      decimals = decimals.substring(0,iLength);
    }
    sObject.value = integer+"."+decimals;
  }
  else{
    sObject.value = parseInt(sObject.value);
  }
}

function isNumberLimited(sObject,min,max){
  if(sObject.value.length>0 && isNumber(sObject)){
    if(sObject.value*1<min || sObject.value*1>max){
      return false;
    }
    else{
      return true;
    }
  }
  else{
    return false;
  }
}

function isNumber(sObject,clearField){
  if(sObject.value.length==0) return false;
  if(clearField==null) clearField = true;
  
  sObject.value = sObject.value.replace(",",".");
  var string = sObject.value;
  var vchar = "01234567890.+-";
  var dotCount = 0;

  for(var i=0; i < string.length; i++){
    if(vchar.indexOf(string.charAt(i))==-1){
      if(clearField){
        if(sObject.id){
          setTimeout('var txt = document.getElementById(\''+sObject.id+'\'); txt.focus(); txt.select();',1);
        }
        else{
          setTimeout('var txt = document.all[\''+sObject.name+'\']; txt.focus(); txt.select();',1);
        }
        //sObject.focus();
      }
      
      return false;
    }
    else{
      if(string.charAt(i)=="."){
        dotCount++;
        if(dotCount > 1){
          if(clearField){
            if(sObject.id){
              setTimeout('var txt = document.getElementById(\''+sObject.id+'\'); txt.focus(); txt.select();',1);
            }
            else{
              setTimeout('var txt = document.all[\''+sObject.name+'\']; txt.focus(); txt.select();',1);
            }
            //sObject.focus();
          }
          
          return false;
        }
      }
    }
  }

  if(sObject.value.length > 250){
    sObject.value = sObject.value.substring(0,249);
  }

  return true;
}

function isInteger(sObject,clearField){
  if(sObject.value.length==0) return false;
  if(clearField==null) clearField = true;
  
  sObject.value = sObject.value.replace(",",".");
  var string = sObject.value;
  var vchar = "01234567890.";
  var dotCount = 0;

  for(var i=0; i<string.length; i++){
    if(vchar.indexOf(string.charAt(i))==-1){
      if(clearField) sObject.value = "";
      return false;
    }
  }

  if(sObject.value.length > 250){
    sObject.value = sObject.value.substring(0,249);
  }

  return true;
}

function isIntegerNegativeAllowed(sObject){
  if(sObject.value.length==0) return false;
  sObject.value = sObject.value.replace(",",".");
  var string = sObject.value;
  var vchar = "-01234567890";
  var dotCount = 0;

  for(var i=0; i < string.length; i++){
    if(vchar.indexOf(string.charAt(i))==-1){
      sObject.value = "";
      return false;
    }
  }

  if(sObject.value.length > 250){
    sObject.value = sObject.value.substring(0,249);
  }

  return true;
}

function isNumberNegativeAllowed(inputField){
  if(inputField.value.length==0) return false;
  var number = inputField.value;
  var vchar = "-1234567890.";
  var dotCount = 0;

  for(var i=0; i < number.length; i++){
    if(vchar.indexOf(number.charAt(i))==-1){
      inputField.value = "";
      return false;
    }
    else{
      if(number.charAt(i)=="."){
        dotCount++;
        if(dotCount > 1){
          inputField.value = "";
          return false;
        }
      }
    }
  }

  if(inputField.value.length > 250){
    inputField.value = inputField.value.substring(0,249);
  }

  return true;
}

function checkMinMax(iMin,iMax,oObject,iDefault){
  isNumber(oObject);

  if(oObject.value.length>0){
    if(iMin!=""){
      if(oObject.value < iMin){
        oObject.value=iDefault;
        oObject.focus();
        return false;
      }
    }

    if(iMax!=""){
      if(oObject.value > iMax){
        oObject.value=iDefault;
        oObject.focus();
        return false;
      }
    }
  }
  
  return true;
}

function checkMinMaxOpen(iMin,iMax,oObject){
  if(oObject.value.length>0){
    if(iMin!=""){
      if(oObject.value < iMin){
        return false;
      }
    }

    if(iMax!=""){
      if(oObject.value > iMax){
        return false;
      }
    }
  }
  
  return true;
}

function textCounter(field,cntfield,maxlimit){
  if(field.value.length > maxlimit){
    field.value = field.value.substring(0,maxlimit);
  }
  else{
    // update 'characters left' counter
    cntfield.value = maxlimit - field.value.length;
  }
}

function replaceAll(source,target,substitute){
  return source.replace(new RegExp(target,"g"),substitute);
}

function LTrim(value){
  var re = /\s*((\S+\s*)*)/;
  return value.replace(re, "$1");
}

function RTrim(value){
  var re = /((\s*\S+)*)\s*/;
  return value.replace(re, "$1");
}

function trim(value){
  return LTrim(RTrim(value));
}

function setDecimalLength(inputField,decimalCount,addZeroes){
  if(addZeroes==null) addZeroes = false;

  if(inputField.value.length > 0){
    inputField.value = inputField.value.replace(",",".");

    if(addZeroes && decimalCount > 0){
      if(inputField.value.indexOf(".") < 0){
        inputField.value = inputField.value+".";
      }

      for(var i=0; i<decimalCount; i++){
        inputField.value = inputField.value+"0";
      }
    }

    var commaIdx = inputField.value.indexOf(".");

    if(commaIdx > -1){
      var integer  = inputField.value.substring(0,commaIdx);
      var decimals = inputField.value.substring(commaIdx+1);

      if(decimals.length > decimalCount){
        decimals = decimals.substring(0,decimalCount);
      }
      inputField.value = integer+"."+decimals;
    }
    else{
      inputField.value = parseInt(inputField.value);
    }
  }
}

function formatDecimalValue(iValue,iLength,addZeroes){
  if(addZeroes==null) addZeroes = false;
  iValue = (iValue+"");
  iValue = replaceAll(iValue,",",".");
  
  var commaIdx = iValue.indexOf(".");
  var decimals = 0;
  if(commaIdx > -1){
    decimals = iValue.length - (commaIdx+1);
  }
  
  if(addZeroes && iLength > decimals){
    if(decimals==0) iValue = iValue+".";

    for(var i=decimals; i<iLength; i++){
  	  iValue = iValue+"0";
    }
  }

  var commaIdx = iValue.indexOf(".");
  if(commaIdx > -1){
    var integer  = iValue.substring(0,commaIdx);
    var decimals = iValue.substring(commaIdx+1);

    if(decimals.length > iLength){
      decimals = decimals.substring(0,iLength);
    }
    
    iValue = integer;

    if(decimals.length > 0){
      iValue+= "."+decimals;
    }
  }
  else{
    iValue = parseInt(iValue);
  }

  iValue = (""+iValue).replace(".",",");
  
  return iValue;
}

function formatNumber(value,decimals){
  value+= "";
  value = replaceAll(value,",",".");

  var sInt, sDec;
  if(value.indexOf(".") > -1){
    sInt = value.substring(0,value.indexOf("."));
    sDec = value.substring(value.indexOf(".")+1);

    if(sDec.length > decimals){
      sDec = sDec.substring(0,decimals);      
    }
    else if(sDec.length < decimals){
      while(sDec.length < decimals){
        sDec+= "0";
      }
    }
  }
  else{
    sInt = value;
    sDec = "00";
  }  
    
  value = sInt+"."+sDec;
    
  return value;
}

function convertSpecialCharsToHTML(text){
  // accents
  text = replaceAll(text,"&eacute;","?");
  text = replaceAll(text,"&egrave;","?");
  text = replaceAll(text,"&aacute;","?");
  text = replaceAll(text,"&agrave;","?");
  text = replaceAll(text,"&uacute;","?");
  text = replaceAll(text,"&ugrave;","?");
  text = replaceAll(text,"&oacute;","?");
  text = replaceAll(text,"&ograve;","?");
  text = replaceAll(text,"&iacute;","?");
  text = replaceAll(text,"&igrave;","?");

  text = replaceAll(text,"&Eacute;","?");
  text = replaceAll(text,"&Egrave;","?");
  text = replaceAll(text,"&Aacute;","?");
  text = replaceAll(text,"&Agrave;","?");
  text = replaceAll(text,"&Uacute;","?");
  text = replaceAll(text,"&Ugrave;","?");
  text = replaceAll(text,"&Oacute;","?");
  text = replaceAll(text,"&Ograve;","?");
  text = replaceAll(text,"&Iacute;","?");
  text = replaceAll(text,"&Igrave;","?");

  // trema
  text = replaceAll(text,"&iuml;","?");
  text = replaceAll(text,"&euml;","?");
  text = replaceAll(text,"&ouml;","?");
  text = replaceAll(text,"&auml;","?");
  text = replaceAll(text,"&uuml;","?");

  text = replaceAll(text,"&Iuml;","?");
  text = replaceAll(text,"&Euml;","?");
  text = replaceAll(text,"&Ouml;","?");
  text = replaceAll(text,"&Auml;","?");
  text = replaceAll(text,"&Uuml;","?");

  // hat
  text = replaceAll(text,"&ecirc;","?");
  text = replaceAll(text,"&acirc;","?");
  text = replaceAll(text,"&ucirc;","?");
  text = replaceAll(text,"&ocirc;","?");
  text = replaceAll(text,"&icirc;","?");

  text = replaceAll(text,"&Ecirc;","?");
  text = replaceAll(text,"&Acirc;","?");
  text = replaceAll(text,"&Ucirc;","?");
  text = replaceAll(text,"&Ocirc;","?");
  text = replaceAll(text,"&Icirc;","?");

  // varia
  text = replaceAll(text,"&acute;","?");
  text = replaceAll(text,"&#231;","?");
  text = replaceAll(text,"&#156;","?");
  text = replaceAll(text,"&#234;","?");
  //text = replaceAll(text,"?;","?"); // unicode --> crashes JS !
  text = replaceAll(text,"&#202;","?");
  text = replaceAll(text,"<br>","\r\n");
  text = replaceAll(text,"&gt;",">");
  text = replaceAll(text,"&lt;","<");

  return text;
}