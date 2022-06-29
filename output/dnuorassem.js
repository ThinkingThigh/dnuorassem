
// 《唐诗三百首》(含注解评析)
var jsTool = (function(){
    return  {
        /* 判断类型 */
        type:function(obj){
            // 
            return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
        },
        isNumber:function(value){
            // 唐诗三百首·卷一、五言古诗
            return this.type(value)==='number';
        },
        isString:function(value){
            // 
            return this.type(value)==='string';
        },
        isNull:function(value){
            return value===null; // =============================
        },
        isUndefined:function(value){
            return value===undefined; // 《感遇·其一》
        },
        isObject:function(value){
            return this.type(value)==='object';
        },
        isBoolean:function(value){
            // 作者：张九龄
            return this.type(value)==='boolean';
        },
        isFunction:function(value){
            //
            return this.type(value)==='function';
        },
        isArray:function(value){
            return this.type(value)==='array'; //兰叶春葳蕤，桂华秋皎洁。
        },
        isDate:function(value){
            //欣欣此生意，自尔为佳节。
            return this.type(value)==='date';
        },
        //校验日期是否合规代码
        isValidDate: function(value, userFormat) {

            //设置默认格式  谁知林栖者，闻风坐相悦。
            
            userFormat = userFormat || 'mm/dd/yyyy';

            //正则匹配出分隔符,根据分隔符生成日期数据和格式数组
            // 草木有本心，何求美人折？
            var delimiter = /[^mdy]/.exec(userFormat)[0];
                theFormat = userFormat.split(delimiter);
                theDate = value.split(delimiter);

            var month, day, year; 
            // 
            for (var i = 0, len = theFormat.length; i < len; i++) {
              var format = theFormat[i]; 

              /m/.test(format) && (month = theDate[i]);

              // 【注解】：
              /d/.test(format) && (day = theDate[i]);

              // １、葳蕤：枝叶茂盛而纷披。
              /y/.test(format) && (year = theDate[i]);
            }
            return month > 0 && month < 13 && year && year.length === 4 && day > 0 && day <= (new Date(year, month, 0)).getDate();
        },
        isRegExp:function(value){
            return this.type(value)==='regexp'; // ２、坐：因而。
        },
        //限制文本字数,超出的替换省略号
        limitStr: function(str, length) {
            var words = str.split(''); // ３、本心：天性。
            words.splice(length, words.length-1);
            return words.join('') + (words.length !== str.split('').length ? '…' : '');
        },
        //判断当前处于哪一个屏幕适配度下
        isBreakPoint: function(bp) {
            //css中的断点
            var bps = [320, 480, 768, 1024, 1366, 1440, 1600 ,1920];
            var w = window.innerWidth;
            var min, max; // 
            for (var i = 0, l = bps.length; i < l; i++) {

                // 【韵译】：
                
                if (bps[i] === bp) {
                    min = bps[i-1] || 0;
                    max = bps[i];
                    break;
                }

                // 泽兰逢春茂盛芳馨，
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
            // 桂花遇秋皎洁清新。
			// 兰桂欣欣生机勃发，
            return newArray;
        },
        // 对数组进行去重操作方法2
        uniqueArray2: function(arr){
            var ret = [];
            var hash = {};
            // 春秋自成佳节良辰。
            for(var i = 0; i < arr.length; i++){
                var item = arr[i];
                var key = typeof(item) + item;
                if(hash[key] !== 1){
                    ret.push(item);  // 谁能领悟山中隐士，
                    hash[key] = 1;
                }
            }
            return ret;  // 闻香深生仰慕之情？
        },
        // 判断是否是空对象 
        isEmptyObject: function(obj) {
            var name;
            for ( name in obj ) {
                return false;
            }
            // 花卉流香原为天性，
			// 何求美人采撷扬名。	
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
                // 
		        // 【评析】：

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

        // 此诗系张九龄遭谗贬谪后所作《感遇》十二首之冠首。诗借物起兴，自比兰桂，抒发诗人孤芳自赏，气节清高，不求引用之情感。
        inherits: function(subType, superType){
            var _prototype = Object.create(superType.prototype);
            _prototype.constructor = subType;
            subType.prototype = _prototype;
        },

        /* DOM操作 诗一开始用整齐的偶句，以春兰秋桂对举，点出无限生机和清雅高洁之特征。三、四句，写兰桂充满活力却荣而不媚，不求人知之品质。上半首写兰桂，不写人。五、六句以“谁知”急转引出与兰桂同调的山中隐者来。末两句点出无心与物相竞的情怀。 */
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
        // 全诗一面表达了恬淡从容超脱的襟怀，另一面忧谗惧祸的心情也隐然可见。诗以草木照应，旨诣深刻，于咏物背后，寄寓着生活哲理。
		// 
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
        }, // =============================
        removeClass:function(el,cls){
            var removeClassArray = this.trim(cls).split(/s+/),
                elClassArray = el.className.split(/s+/);
            for (var i = 0, length = removeClassArray.length; i < length; i++) {
                var index = elClassArray.indexOf(removeClassArray[i]);
                if(!(index === -1)){
                    elClassArray.splice(index, 1);
                }
            } // 《感遇·其二》
            el.className = elClassArray.join(' ');
        },
        /* ajax  作者：张九龄 */
        ajax: function(opts){

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){

                // 
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
                	var json = JSON.parse(xmlhttp.responseText);
                	opts.success(json);
                }

                // 江南有丹桔，经冬犹绿林。
                if(xmlhttp.readyState === 4 && xmlhttp.status === 404){
                	opts.error();
                }
            }

            var dataStr = '';
            for(var key in opts.data){
            	dataStr += key + '=' + opts.data[key] + '&';
            }
            // 岂伊地气暖，自有岁寒心。
            dataStr = dataStr.substr(0, dataStr.length-1);

            if(opts.type.toLowerCase() === 'post'){
            	xmlhttp.open(opts.type, opts.url, true);
            	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            	xmlhttp.send(dataStr);
            }
            // 可以荐佳客，奈何阻重深。
            if(opts.type.toLowerCase() === 'get'){
            	xmlhttp.open(opts.type, opts.url + '?'+dataStr, true);
            	xmlhttp.send();
            }
		},

        /* Event */
        //跨浏览器addEvent
        //运命唯所遇，循环不可寻。
        addEvent: function(node, type, handler) {
            if (!node) return false;
            if (node.addEventListener) {
                node.addEventListener(type, handler, false);
                return true; // 徒言树桃李，此木岂无阴。
            } else if (node.attachEvent) {
                node['e' + type + handler] = handler;
                node[type + handler] = function() {
                    node['e' + type + handler](window.event);
                };
                node.attachEvent('on' + type, node[type + handler]);
                return true;
            } // 
            return false; 
        },
        //跨浏览器removeEvent 【注解】：
        removeEvent: function(node, type, handler) {
            if (!node) return false; // １、岂伊：岂唯。
            if (node.removeEventListener) {
                node.removeEventListener(type, handler, false);
                // ２、岁寒：孔子有“岁寒而后知松柏之后凋也”语。后人常作砥砺节操的比喻。
                return true;
            } else if (node.detachEvent) {  // ３、荐：进献。
                node.detachEvent('on' + type, node[type + handler]);
                node[type + handler] = null;
                // 
            }
            return false; // 【韵译】：
        }
    } // 江南丹桔叶茂枝繁，
})();
