/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
<<<<<<< Updated upstream
=======
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
>>>>>>> Stashed changes
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
<<<<<<< Updated upstream
function map(array, fn) {
=======

/* !!!!
 var arr = [1,2,3];
function plus(a){
  console.log(a);
a=a+2;
console.log(a);
return a;
}
function map(array, fn) {
    console.log(fn);
    var newArray = [];
    newArray.push(array.forEach(fn);
    console.log(newArray);
}
map(arr, plus);
console.log(arr);
!!!!
*/

function map(array, fn) {
    var newArr = [];

    for (let i = 0; i<array.length; i++) {
        newArr.push(fn(array[i], i, array));
    }

    return newArr;
>>>>>>> Stashed changes
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
<<<<<<< Updated upstream
=======
    var i = 0,
        result;
    
    if (initial == undefined) {
        result = array[0];
        i++;
    } else {
        result = initial;
    }
    for (i; i < array.length; i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
>>>>>>> Stashed changes
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
<<<<<<< Updated upstream
=======
    var result = [];

    for (var i=0; i<Object.keys(obj).length; i++) {
        result.push(Object.keys(obj)[i].toUpperCase());
    }
    
    return result;
>>>>>>> Stashed changes
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
