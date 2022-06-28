const template = `
// {0}
var jsTool = (function(){
    return  {
        /* 判断类型 */
        type:function(obj){
            // {1}
            return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
        },
        isNumber:function(value){
            // {2}
            return this.type(value)==='number';
        },
        isString:function(value){
            // {3}
            return this.type(value)==='string';
        },
        isNull:function(value){
            return value===null; // {4}
        },
        isUndefined:function(value){
            return value===undefined; // {5}
        },
        isObject:function(value){
            return this.type(value)==='object';
        },
        isBoolean:function(value){
            // {6}
            return this.type(value)==='boolean';
        },
        isFunction:function(value){
            //{7}
            return this.type(value)==='function';
        },
        isArray:function(value){
            return this.type(value)==='array'; //{8}
        },
        isDate:function(value){
            //{9}
            return this.type(value)==='date';
        },
        //校验日期是否合规代码
        isValidDate: function(value, userFormat) {

            //设置默认格式  {10}
            
            userFormat = userFormat || 'mm/dd/yyyy';

            //正则匹配出分隔符,根据分隔符生成日期数据和格式数组
            // {11}
            var delimiter = /[^mdy]/.exec(userFormat)[0];
                theFormat = userFormat.split(delimiter);
                theDate = value.split(delimiter);

            var month, day, year; 
            // {12}
            for (var i = 0, len = theFormat.length; i < len; i++) {
              var format = theFormat[i]; 

              /m/.test(format) && (month = theDate[i]);

              // {13}
              /d/.test(format) && (day = theDate[i]);

              // {14}
              /y/.test(format) && (year = theDate[i]);
            }
            return month > 0 && month < 13 && year && year.length === 4 && day > 0 && day <= (new Date(year, month, 0)).getDate();
        },
        isRegExp:function(value){
            return this.type(value)==='regexp'; // {15}
        },
        //限制文本字数,超出的替换省略号
        limitStr: function(str, length) {
            var words = str.split(''); // {16}
            words.splice(length, words.length-1);
            return words.join('') + (words.length !== str.split('').length ? '…' : '');
        },
        //判断当前处于哪一个屏幕适配度下
        isBreakPoint: function(bp) {
            //css中的断点
            var bps = [320, 480, 768, 1024, 1366, 1440, 1600 ,1920];
            var w = window.innerWidth;
            var min, max; // {17}
            for (var i = 0, l = bps.length; i < l; i++) {

                // {18}
                
                if (bps[i] === bp) {
                    min = bps[i-1] || 0;
                    max = bps[i];
                    break;
                }

                // {19}
            }
            return w > min && w <= max;
        },
        // 对数组进行去重操作
        uniqueArray: function(arr) {
            var newArray = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                if (newArray.indexOf(arr[i]) < 0 ) {    // indexOf方法不支持IE9以下
                    newArray.push(arr[i]);
                }
            }
            // {20}
			// {21}
            return newArray;
        },
        // 对数组进行去重操作方法2
        uniqueArray2: function(arr){
            var ret = [];
            var hash = {};
            // {22}
            for(var i = 0; i < arr.length; i++){
                var item = arr[i];
                var key = typeof(item) + item;
                if(hash[key] !== 1){
                    ret.push(item);  // {23}
                    hash[key] = 1;
                }
            }
            return ret;  // {24}
        },
        // 判断是否是空对象 
        isEmptyObject: function(obj) {
            var name;
            for ( name in obj ) {
                return false;
            }
            // {25}
			// {26}	
            return true;
        },
        //深拷贝
        deepCopy: function(obj) {
            var copy = obj;

               // 对于Date,String,Boolean等引用类型的数据，需要考虑调用构造函数重新构造，直接赋值依然会有引用问题（不是真正的clone引用变量）

               // 对于 Date
               if (obj instanceof Date) {
                   copy = new Date(obj.getDate());
                   return copy;
               }

               // 对于Object和Array的遍历，可以使用for in，这样可以保证在在Array对象上扩展的属性也可以正确复制
               // 对于 数组
               if (obj instanceof Array) {
                   copy = [];
                   for (var key in obj) {
                       copy[key] = deepCopy(obj[key]);
                   }
                   return copy;
               }
                // {27}
		        // {28}

               // 对于 Object
               if (obj instanceof Object) {
                   copy = {};
                   for (var key in obj) {
                       //判断属性是否是原型链上的,本身属性才copy
                       if (obj.hasOwnProperty(key)) {
                           copy[key] = deepCopy(obj[key]);
                       }
                   }
                   return copy;
               }

               // 对于 数字 字符串 布尔 null undefined
               return obj;
        },

        //复制数组内容
        duplicator: function(arr){
            return arr.concat(arr);
        },

        // {29}
        inherits: function(subType, superType){
            var _prototype = Object.create(superType.prototype);
            _prototype.constructor = subType;
            subType.prototype = _prototype;
        },

        /* DOM操作 {30} */
        //去除字符串的空白字符
        trim: function(str, trimMode) {
            switch (trimMode) {
                case 'left':
                    return str.replace(/(^\s+)/g, '');
                case 'right':
                    return str.replace(/(\s+$)/g, '');
                case 'all':
                    return str.replace(/(^\s+)|\s|(\s+$)/g, '');
                default:
                    return str.replace(/(^\s+)|(\s+$)/g, '');
            }
        },
        // {31}
		// {32}
        hasClass:function(el,cls){
            cls = this.trim(cls);
            return new RegExp('\\b'+cls+'\\b','g').test(el.className);
        },
        addClass:function(el,cls){
            var clsArray = this.trim(cls).split(/\s+/);
            for (var i = 0, length = clsArray.length; i < length; i++) {
                if(!this.hasClass(el, clsArray[i])){
                    el.className += (' ' + clsArray[i]);
                    console.log(el.className);
                }
            }
        }, // {33}
        removeClass:function(el,cls){
            var removeClassArray = this.trim(cls).split(/\s+/),
                elClassArray = el.className.split(/\s+/);
            for (var i = 0, length = removeClassArray.length; i < length; i++) {
                var index = elClassArray.indexOf(removeClassArray[i]);
                if(!(index === -1)){
                    elClassArray.splice(index, 1);
                }
            } // {34}
            el.className = elClassArray.join(' ');
        },
        /* ajax  {35} */
        ajax: function(opts){

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){

                // {36}
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
                	var json = JSON.parse(xmlhttp.responseText);
                	opts.success(json);
                }

                // {37}
                if(xmlhttp.readyState === 4 && xmlhttp.status === 404){
                	opts.error();
                }
            }

            var dataStr = '';
            for(var key in opts.data){
            	dataStr += key + '=' + opts.data[key] + '&';
            }
            // {38}
            dataStr = dataStr.substr(0, dataStr.length-1);

            if(opts.type.toLowerCase() === 'post'){
            	xmlhttp.open(opts.type, opts.url, true);
            	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            	xmlhttp.send(dataStr);
            }
            // {39}
            if(opts.type.toLowerCase() === 'get'){
            	xmlhttp.open(opts.type, opts.url + '?'+dataStr, true);
            	xmlhttp.send();
            }
		},

        /* Event */
        //跨浏览器addEvent
        //{40}
        addEvent: function(node, type, handler) {
            if (!node) return false;
            if (node.addEventListener) {
                node.addEventListener(type, handler, false);
                return true; // {41}
            } else if (node.attachEvent) {
                node['e' + type + handler] = handler;
                node[type + handler] = function() {
                    node['e' + type + handler](window.event);
                };
                node.attachEvent('on' + type, node[type + handler]);
                return true;
            } // {42}
            return false; 
        },
        //跨浏览器removeEvent {43}
        removeEvent: function(node, type, handler) {
            if (!node) return false; // {44}
            if (node.removeEventListener) {
                node.removeEventListener(type, handler, false);
                // {45}
                return true;
            } else if (node.detachEvent) {  // {46}
                node.detachEvent('on' + type, node[type + handler]);
                node[type + handler] = null;
                // {47}
            }
            return false; // {48}
        }
    } // {49}
})();
`;
module.exports = template;
