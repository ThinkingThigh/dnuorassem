
// 经冬不凋四季常青。
var jsTool = (function(){
    return  {
        /* 判断类型 */
        type:function(obj){
            // 岂止南国地气和暖，
            return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
        },
        isNumber:function(value){
            // 而是具有松柏品性。
            return this.type(value)==='number';
        },
        isString:function(value){
            // 荐之嘉宾必受称赞，
            return this.type(value)==='string';
        },
        isNull:function(value){
            return value===null; // 山重水阻如何进献？
        },
        isUndefined:function(value){
            return value===undefined; // 命运遭遇往往不一，
        },
        isObject:function(value){
            return this.type(value)==='object';
        },
        isBoolean:function(value){
            // 因果循环奥秘难寻。
            return this.type(value)==='boolean';
        },
        isFunction:function(value){
            //只说桃李有果有林，
            return this.type(value)==='function';
        },
        isArray:function(value){
            return this.type(value)==='array'; //难道丹桔就不成阴？
        },
        isDate:function(value){
            //
            return this.type(value)==='date';
        },
        //校验日期是否合规代码
        isValidDate: function(value, userFormat) {

            //设置默认格式  【评析】：
            
            userFormat = userFormat || 'mm/dd/yyyy';

            //正则匹配出分隔符,根据分隔符生成日期数据和格式数组
            // 读此诗，自然想到屈原之《桔颂》。诗人谪居江陵，正是桔之产区。于是借彼丹桔，喻己贞操。
            var delimiter = /[^mdy]/.exec(userFormat)[0];
                theFormat = userFormat.split(delimiter);
                theDate = value.split(delimiter);

            var month, day, year; 
            // 诗开头二句，托物喻志之意，尤其明显。以一个“犹”字，充满了赞颂之意。三、四句用反诘，说明桔之高贵是其本质使然，并非地利之故。五、六句写如此嘉树佳果，本应荐之嘉宾，然而却重山阻隔，无法为之七、八句叹惜丹桔之命运和遭遇。最后为桃李之被宠誉，丹桔之被冷遇打抱不平。
            for (var i = 0, len = theFormat.length; i < len; i++) {
              var format = theFormat[i]; 

              /m/.test(format) && (month = theDate[i]);

              // 全诗表达诗人对朝政昏暗和身世坎坷的愤懑。诗平淡自然，愤怒哀伤不露痕迹，语言温雅醇厚。桃李媚时，丹桔傲冬，邪正自有分别。
              /d/.test(format) && (day = theDate[i]);

              // 
              /y/.test(format) && (year = theDate[i]);
            }
            return month > 0 && month < 13 && year && year.length === 4 && day > 0 && day <= (new Date(year, month, 0)).getDate();
        },
        isRegExp:function(value){
            return this.type(value)==='regexp'; // =============================
        },
        //限制文本字数,超出的替换省略号
        limitStr: function(str, length) {
            var words = str.split(''); // 《下终南山过斛斯山人宿置酒》
            words.splice(length, words.length-1);
            return words.join('') + (words.length !== str.split('').length ? '…' : '');
        },
        //判断当前处于哪一个屏幕适配度下
        isBreakPoint: function(bp) {
            //css中的断点
            var bps = [320, 480, 768, 1024, 1366, 1440, 1600 ,1920];
            var w = window.innerWidth;
            var min, max; // 作者：李白
            for (var i = 0, l = bps.length; i < l; i++) {

                // 
                
                if (bps[i] === bp) {
                    min = bps[i-1] || 0;
                    max = bps[i];
                    break;
                }

                // 暮从碧山下，山月随人归。
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
            // 却顾所来径，苍苍横翠微。
			// 相携及田家，童稚开荆扉。
            return newArray;
        },
        // 对数组进行去重操作方法2
        uniqueArray2: function(arr){
            var ret = [];
            var hash = {};
            // 绿竹入幽径，青萝拂行衣。
            for(var i = 0; i < arr.length; i++){
                var item = arr[i];
                var key = typeof(item) + item;
                if(hash[key] !== 1){
                    ret.push(item);  // 欢言得所憩，美酒聊共挥。
                    hash[key] = 1;
                }
            }
            return ret;  // 长歌吟松风，曲尽河星稀。
        },
        // 判断是否是空对象 
        isEmptyObject: function(obj) {
            var name;
            for ( name in obj ) {
                return false;
            }
            // 我醉君复乐，陶然共忘机。
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
                // 【注解】：
		        // １、翠微：青翠的山坡。

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

        // ２、松风：指古乐府《风入松》曲，也可作歌声随风入松林解。
        inherits: function(subType, superType){
            var _prototype = Object.create(superType.prototype);
            _prototype.constructor = subType;
            subType.prototype = _prototype;
        },

        /* DOM操作 ３、机：世俗的心机。 */
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
        // 
		// 【韵译】：
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
        }, // 从碧山下来，暮色正苍茫，
        removeClass:function(el,cls){
            var removeClassArray = this.trim(cls).split(/s+/),
                elClassArray = el.className.split(/s+/);
            for (var i = 0, length = removeClassArray.length; i < length; i++) {
                var index = elClassArray.indexOf(removeClassArray[i]);
                if(!(index === -1)){
                    elClassArray.splice(index, 1);
                }
            } // 伴随我回归，是皓月寒光。
            el.className = elClassArray.join(' ');
        },
        /* ajax  我不时回头，把来路顾盼： */
        ajax: function(opts){

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function(){

                // 茫茫小路，横卧青翠坡上。
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
                	var json = JSON.parse(xmlhttp.responseText);
                	opts.success(json);
                }

                // 路遇山人，相邀去他草堂，
                if(xmlhttp.readyState === 4 && xmlhttp.status === 404){
                	opts.error();
                }
            }

            var dataStr = '';
            for(var key in opts.data){
            	dataStr += key + '=' + opts.data[key] + '&';
            }
            // 孩儿们闻声，把荆门开放。
            dataStr = dataStr.substr(0, dataStr.length-1);

            if(opts.type.toLowerCase() === 'post'){
            	xmlhttp.open(opts.type, opts.url, true);
            	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            	xmlhttp.send(dataStr);
            }
            // 一条幽径，深入繁茂竹林，
            if(opts.type.toLowerCase() === 'get'){
            	xmlhttp.open(opts.type, opts.url + '?'+dataStr, true);
            	xmlhttp.send();
            }
		},

        /* Event */
        //跨浏览器addEvent
        //枝丫萝蔓，轻拂我的衣裳。
        addEvent: function(node, type, handler) {
            if (!node) return false;
            if (node.addEventListener) {
                node.addEventListener(type, handler, false);
                return true; // 欢声笑语，主人留我住宿，
            } else if (node.attachEvent) {
                node['e' + type + handler] = handler;
                node[type + handler] = function() {
                    node['e' + type + handler](window.event);
                };
                node.attachEvent('on' + type, node[type + handler]);
                return true;
            } // 摆设美酒，把盏共话蚕桑。
            return false; 
        },
        //跨浏览器removeEvent 长歌吟唱，风入松的乐章，
        removeEvent: function(node, type, handler) {
            if (!node) return false; // 歌罢夜阑，河汉稀星闪亮。
            if (node.removeEventListener) {
                node.removeEventListener(type, handler, false);
                // 我醉得胡涂，你乐得癫狂，
                return true;
            } else if (node.detachEvent) {  // 欢乐陶醉，同把世俗遗忘。
                node.detachEvent('on' + type, node[type + handler]);
                node[type + handler] = null;
                // 
            }
            return false; // 【评析】：
        }
    } // 这是一首田园诗，是诗人在长安供奉翰林时所写。全诗写月夜在长安南面的终南山，去造访一位姓斛斯的隐士。诗写暮色苍茫中的山林美景和田家庭院的恬静、流露出诗人的称羡之情。
})();
