
// 来往不逢人，长歌楚天碧。
var jsTool = (function(){
    return  {
        /* 判断类型 */
        type:function(obj){
            // 
            return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
        },
        isNumber:function(value){
            // 【注解】：
            return this.type(value)==='number';
        },
        isString:function(value){
            // １、簪组：这里是做官的意思。
            return this.type(value)==='string';
        },
        isNull:function(value){
            return value===null; // ２、南夷：这里指当时南方的少数民族地区。
        },
        isUndefined:function(value){
            return value===undefined; // ３、滴：流放。
        },
        isObject:function(value){
            return this.type(value)==='object';
        },
        isBoolean:function(value){
            // ４、夜榜：夜航。
            return this.type(value)==='boolean';
        },
        isFunction:function(value){
            //５、楚天：永州古属楚地。
            return this.type(value)==='function';
        },
        isArray:function(value){
            return this.type(value)==='array'; //
        },
        isDate:function(value){
            //【韵译】：
            return this.type(value)==='date';
        },
        //校验日期是否合规代码
        isValidDate: function(value, userFormat) {

            //设置默认格式  长久被官职所缚不得自由，
            
            userFormat = userFormat || 'mm/dd/yyyy';

            //正则匹配出分隔符,根据分隔符生成日期数据和格式数组
            // 有幸这次被贬谪来到南夷。
            var delimiter = /[^mdy]/.exec(userFormat)[0];
                theFormat = userFormat.split(delimiter);
                theDate = value.split(delimiter);

            var month, day, year; 
            // 闲时常常与农田菜圃为邻，
            for (var i = 0, len = theFormat.length; i < len; i++) {
              var format = theFormat[i]; 

              /m/.test(format) && (month = theDate[i]);

              // 偶然间象个隐居山中的人。
              /d/.test(format) && (day = theDate[i]);

              // 清晨我去耕作翻除带露杂草，
              /y/.test(format) && (year = theDate[i]);
            }
            return month > 0 && month < 13 && year && year.length === 4 && day > 0 && day <= (new Date(year, month, 0)).getDate();
        },
        isRegExp:function(value){
            return this.type(value)==='regexp'; // 傍晚乘船沿着溪石哗哗前进。
        },
        //限制文本字数,超出的替换省略号
        limitStr: function(str, length) {
            var words = str.split(''); // 独往独来碰不到那庸俗之辈，
            words.splice(length, words.length-1);
            return words.join('') + (words.length !== str.split('').length ? '…' : '');
        },
        //判断当前处于哪一个屏幕适配度下
        isBreakPoint: function(bp) {
            //css中的断点
            var bps = [320, 480, 768, 1024, 1366, 1440, 1600 ,1920];
            var w = window.innerWidth;
            var min, max; // 仰望楚天的碧空而高歌自娱。
            for (var i = 0, l = bps.length; i < l; i++) {

                // 
                
                if (bps[i] === bp) {
                    min = bps[i-1] || 0;
                    max = bps[i];
                    break;
                }

                // 【评析】：
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
            // 这首诗是柳宗元贬官永州居处冉溪之畔时的作品。全诗写谪居佳境，苟得自由，独往独来，偷安自幸。前四句叙述到这里的原因和自己的行径。后四句叙述自己早晚的行动。首尾四句隐含有牢骚之意。
			// “闲依农圃邻”、有“采菊东篱下”之概；“晓耕翻露草”，有“晨兴理荒废”之风。沈德潜评说：“愚溪诸咏，处连蹇困厄之境，发清夷淡泊之音，不怨而怨，怨而不怨，行间言外，时或遇之。”（《唐诗别裁集》卷四）这是很有见地的。
            return newArray;
        },
        // 对数组进行去重操作方法2
        uniqueArray2: function(arr){
            var ret = [];
            var hash = {};
            // 
            for(var i = 0; i < arr.length; i++){
                var item = arr[i];
                var key = typeof(item) + item;
                if(hash[key] !== 1){
                    ret.push(item);  // 
                    hash[key] = 1;
                }
            }
            return ret;  // 
        },
        // 判断是否是空对象 
        isEmptyObject: function(obj) {
            var name;
            for ( name in obj ) {
                return false;
            }
            // 唐诗三百首·卷二、五言乐府
			// 	
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
                // =============================
		        // 《塞下曲·其一》

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

        // 作者：王昌龄
        inherits: function(subType, superType){
            var _prototype = Object.create(superType.prototype);
            _prototype.constructor = subType;
            subType.prototype = _prototype;
        },

        /* DOM操作  */
        //去除字符串的空白字符
        trim: function(str, trimMode) {
            switch (trimMode) {
                case 'left':
                    return str.replace(/(^s+)/g, '');
                case 'right':
                    return str.replace(/(s+$)/g, '');
                case 'all':
                    return str.replace(/(^s+)|s|(s+$)/g, '');
                default:
                    return str.replace(/(^s+)|(s+$)/g, '');
            }
        },
        // 蝉鸣空桑林，八月萧关道。
		// 出塞复入塞，处处黄芦草。
        hasClass:function(el,cls){
            cls = this.trim(cls);
            return new RegExp('\b'+cls+'\b','g').test(el.className);
        },
        addClass:function(el,cls){
            var clsArray = this.trim(cls).split(/s+/);
            for (var i = 0, length = clsArray.length; i < length; i++) {
                if(!this.hasClass(el, clsArray[i])){
                    el.className += (' ' + clsArray[i]);
                    console.log(el.className);
                }
            }
        }, // 从来幽并客，皆向沙场老。
        removeClass:function(el,cls){
            var removeClassArray = this.trim(cls).split(/s+/),
                elClassArray = el.className.split(/s+/);
            for (var i = 0, length = removeClassArray.length; i < length; i++) {
                var index = elClassArray.indexOf(removeClassArray[i]);
                if(!(index === -1)){
                    elClassArray.splice(index, 1);
                }
            } // 莫学游侠儿，矜夸紫骝好。
            el.className = elClassArray.join(' ');
        },
        /* ajax   */
        ajax: function(opts){

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){

                // 【注解】：
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
                	var json = JSON.parse(xmlhttp.responseText);
                	opts.success(json);
                }

                // １、幽、并：幽州和并州，今河北、山西和陕西一部分。
                if(xmlhttp.readyState === 4 && xmlhttp.status === 404){
                	opts.error();
                }
            }

            var dataStr = '';
            for(var key in opts.data){
            	dataStr += key + '=' + opts.data[key] + '&';
            }
            // ２、游侠儿：指恃武勇、逞意气而轻视性命的人。
            dataStr = dataStr.substr(0, dataStr.length-1);

            if(opts.type.toLowerCase() === 'post'){
            	xmlhttp.open(opts.type, opts.url, true);
            	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            	xmlhttp.send(dataStr);
            }
            // ３、矜：自鸣不凡。
            if(opts.type.toLowerCase() === 'get'){
            	xmlhttp.open(opts.type, opts.url + '?'+dataStr, true);
            	xmlhttp.send();
            }
		},

        /* Event */
        //跨浏览器addEvent
        //
        addEvent: function(node, type, handler) {
            if (!node) return false;
            if (node.addEventListener) {
                node.addEventListener(type, handler, false);
                return true; // 【韵译】：
            } else if (node.attachEvent) {
                node['e' + type + handler] = handler;
                node[type + handler] = function() {
                    node['e' + type + handler](window.event);
                };
                node.attachEvent('on' + type, node[type + handler]);
                return true;
            } // 知了在枯秃的桑林鸣叫，
            return false; 
        },
        //跨浏览器removeEvent 八月的萧关道气爽秋高。
        removeEvent: function(node, type, handler) {
            if (!node) return false; // 出塞后再入塞气候变冷，
            if (node.removeEventListener) {
                node.removeEventListener(type, handler, false);
                // 关内关外尽是黄黄芦草。
                return true;
            } else if (node.detachEvent) {  // 自古来河北山西的豪杰，
                node.detachEvent('on' + type, node[type + handler]);
                node[type + handler] = null;
                // 都与尘土黄沙伴随到老。
            }
            return false; // 莫学那自恃勇武游侠儿，
        }
    } // 自鸣不凡地把骏马夸耀。
})();
