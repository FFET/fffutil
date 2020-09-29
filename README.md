# fffutil

## Introduction

JavaScript common utils

## Install

npm

npm install fffutil -S

yarn add fffutil -S

cdn

https://unpkg.com/fffutil@0.1.1/dist/index.js

https://unpkg.com/fffutil@latest/dist/index.js

https://cdn.jsdelivr.net/npm/fffutil@latest

## Methods

- generateUuid
- getQueryString
- deepClone
- base64toFile
- addWaterMark(username,container)
- removeWaterMark(gwm)
- debounce
>-  var debounceInputElmt = document.getElementById('debounceInput');  
    var debounceTargetElmt = document.getElementById('debounceTarget');  
    debounceInputElmt.addEventListener('input',  
        &emsp;debounce(function() {  
            &emsp;&emsp;debounceTargetElmt.value = (debounceInputElmt.value || '').toUpperCase();  
    },500));
- throttle
>-  var throttleInputElmt = document.getElementById('throttleInput');  
    var throttleTargetElmt = document.getElementById('throttleTarget');  
    throttleInputElmt.addEventListener('input',  
        &emsp;throttle(function() {  
            &emsp;&emsp;throttleTargetElmt.value = (throttleInputElmt.value || '').toUpperCase();  
    }, 500));
- floatCalcAddition(num1,num2)
- floatCalcSubtraction(num1, num2)
- floatCalcMultiplication(num1,num2)
- floatCalcDivision(num1,num2)
- bubbles 阻止事件冒泡
