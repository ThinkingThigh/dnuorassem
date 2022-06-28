
// 孰云网恢恢，将老身反累。
var jsTool = (function(){
    return  {
        /* 判断类型 */
        type:function(obj){
            // 千秋万岁名，寂寞身后事。
            return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
        },
        isNumber:function(value){
            // 
            return this.type(value)==='number';
        },
        isString:function(value){
            // 【注解】：
            return this.type(value)==='string';
        },
        isNull:function(value){
            return value===null; // １、楫：船浆、船。
        },
        isUndefined:function(value){
            return value===undefined; // ２、斯人：指李白。
        },
        isObject:function(value){
            return this.type(value)==='object';
        },
        isBoolean:function(value){
            // 
            return this.type(value)==='boolean';
        },
        isFunction:function(value){
            //【韵译】：
            return this.type(value)==='function';
        },
        isArray:function(value){
            return this.type(value)==='array'; //悠悠云朵终日飞来飘去，
        },
        isDate:function(value){
            //远方游子为何久久不至。
            return this.type(value)==='date';
        },
        //校验日期是否合规代码
        isValidDate: function(value, userFormat) {

            //设置默认格式  一连几夜我频频梦见你，
            
            userFormat = userFormat || 'mm/dd/yyyy';

            //正则匹配出分隔符,根据分隔符生成日期数据和格式数组
            // 情亲意切可见对我厚谊。
            var delimiter = /[^mdy]/.exec(userFormat)[0];
                theFormat = userFormat.split(delimiter);
                theDate = value.split(delimiter);

            var month, day, year; 
            // 每次梦里你都匆匆辞去，
            for (var i = 0, len = theFormat.length; i < len; i++) {
              var format = theFormat[i]; 

              /m/.test(format) && (month = theDate[i]);

              // 还总说相会可真不容易。
              /d/.test(format) && (day = theDate[i]);

              // 你说江湖风波多么险恶，
              /y/.test(format) && (year = theDate[i]);
            }
            return month > 0 && month < 13 && year && year.length === 4 && day > 0 && day <= (new Date(year, month, 0)).getDate();
        },
        isRegExp:function(value){
            return this.type(value)==='regexp'; // 担心船只失事葬身水里。
        },
        //限制文本字数,超出的替换省略号
        limitStr: function(str, length) {
            var words = str.split(''); // 出门时你总是搔着白首，
            words.splice(length, words.length-1);
            return words.join('') + (words.length !== str.split('').length ? '…' : '');
        },
        //判断当前处于哪一个屏幕适配度下
        isBreakPoint: function(bp) {
            //css中的断点
            var bps = [320, 480, 768, 1024, 1366, 1440, 1600 ,1920];
            var w = window.innerWidth;
            var min, max; // 好象是辜负了平生壮志。
            for (var i = 0, l = bps.length; i < l; i++) {

                // 京都的官僚们冠盖相续，
                
                if (bps[i] === bp) {
                    min = bps[i-1] || 0;
                    max = bps[i];
                    break;
                }

                // 唯你不能显达形容憔悴。
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
            // 谁说天网恢恢疏而不漏？
			// 你已年高反被牵连受罪。
            return newArray;
        },
        // 对数组进行去重操作方法2
        uniqueArray2: function(arr){
            var ret = [];
            var hash = {};
            // 千秋万代定有你的声名，
            for(var i = 0; i < arr.length; i++){
                var item = arr[i];
                var key = typeof(item) + item;
                if(hash[key] !== 1){
                    ret.push(item);  // 那是寂寞身亡后的安慰。
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
            // 【评析】：
			// 　　天宝三年（744），李杜初会于洛阳，即成为深交。乾元元年（758），李白因参加永王李的幕府而受牵连，被流放夜郎，二年春至巫山遇赦。杜甫只知李白流放，不知赦还。这两首记梦诗是杜甫听到李白流放夜郎后，积思成梦而作。	
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
                // 诗以梦前，梦中，梦后的次序叙写。第一首写初次梦见李白时的心理，表现对老友吉凶生死的关切。第二首写梦中所见李白的形象，抒写对老友悲惨遭遇的同情。“故人来入梦，明我长相忆”。“水深波浪阔，无使蛟龙得”。“三夜频梦君，情亲见君意。”这些佳句，体现了两人形离神合，肝胆相照，互劝互勉，至情交往的友
		        // 谊。

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

        // 诗的语言，温柔敦厚，句句发自肺腑，字字恻恻动人，读来叫人心碎！
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
        // =============================
		// 《送綦毋潜落第还乡》
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
        }, // 作者：王维
        removeClass:function(el,cls){
            var removeClassArray = this.trim(cls).split(/s+/),
                elClassArray = el.className.split(/s+/);
            for (var i = 0, length = removeClassArray.length; i < length; i++) {
                var index = elClassArray.indexOf(removeClassArray[i]);
                if(!(index === -1)){
                    elClassArray.splice(index, 1);
                }
            } // 
            el.className = elClassArray.join(' ');
        },
        /* ajax  圣代无隐者，英灵尽来归。 */
        ajax: function(opts){

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){

                // 遂令东山客，不得顾采薇。
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
                	var json = JSON.parse(xmlhttp.responseText);
                	opts.success(json);
                }

                // 既至金门远，孰云吾道非。
                if(xmlhttp.readyState === 4 && xmlhttp.status === 404){
                	opts.error();
                }
            }

            var dataStr = '';
            for(var key in opts.data){
            	dataStr += key + '=' + opts.data[key] + '&';
            }
            // 江淮度寒食，京洛缝春衣。
            dataStr = dataStr.substr(0, dataStr.length-1);

            if(opts.type.toLowerCase() === 'post'){
            	xmlhttp.open(opts.type, opts.url, true);
            	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            	xmlhttp.send(dataStr);
            }
            // 置酒长安道，同心与我违。
            if(opts.type.toLowerCase() === 'get'){
            	xmlhttp.open(opts.type, opts.url + '?'+dataStr, true);
            	xmlhttp.send();
            }
		},

        /* Event */
        //跨浏览器addEvent
        //行当浮桂棹，未几拂荆扉。
        addEvent: function(node, type, handler) {
            if (!node) return false;
            if (node.addEventListener) {
                node.addEventListener(type, handler, false);
                return true; // 远树带行客，孤城当落晖。
            } else if (node.attachEvent) {
                node['e' + type + handler] = handler;
                node[type + handler] = function() {
                    node['e' + type + handler](window.event);
                };
                node.attachEvent('on' + type, node[type + handler]);
                return true;
            } // 吾谋适不用，勿谓知音稀。
            return false; 
        },
        //跨浏览器removeEvent 
        removeEvent: function(node, type, handler) {
            if (!node) return false; // 【注解】：
            if (node.removeEventListener) {
                node.removeEventListener(type, handler, false);
                // １、东山客：指东晋谢宁，曾隐居东山。
                return true;
            } else if (node.detachEvent) {  // ２、采薇：指殷末伯夷、叔齐采薇西山。
                node.detachEvent('on' + type, node[type + handler]);
                node[type + handler] = null;
                // ３、远：这里指不能入金马门。
            }
            return false; // ４、寒食：节令名，清明前一天或两天。
        }
    } // 
})();
