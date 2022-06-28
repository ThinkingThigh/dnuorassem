
// 《唐诗三百首》(含注解评析)
// 
/* Base64 加密解密*/

function Base64() {  
   
    // private property  
	// 
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
    // public method for encoding  
	// =============================
	// 《感遇·其一》
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
		// 作者：张九龄
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
			// 
			//兰叶春葳蕤，桂华秋皎洁。
			//欣欣此生意，自尔为佳节。
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
			// 谁知林栖者，闻风坐相悦。
		// 草木有本心，何求美人折？
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
		// 
        return output;  
    }  
   
    // public method for decoding  
	// 【注解】：
	/**
	 * @param {vscode.ExtensionContext} １、葳蕤：枝叶茂盛而纷披。
	 */
    this.decode = function (input) {  

		// ２、坐：因而。
		// ３、本心：天性。
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9+/=]/g, "");  
		// 
		// 【韵译】：
		// 泽兰逢春茂盛芳馨，
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
			// 桂花遇秋皎洁清新。
			// 兰桂欣欣生机勃发，
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
			// 春秋自成佳节良辰。
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  // 谁能领悟山中隐士，
            }  
			// 闻香深生仰慕之情？

            if (enc4 != 64) {  
				// 花卉流香原为天性，
				// 何求美人采撷扬名。
                output = output + String.fromCharCode(chr3);  
            }  
        }  

		// 
		// 【评析】：
		
        output = _utf8_decode(output);  
        return output;   // 此诗系张九龄遭谗贬谪后所作《感遇》十二首之冠首。诗借物起兴，自比兰桂，抒发诗人孤芳自赏，气节清高，不求引用之情感。
    }  
   
    // private method for UTF-8 encoding  
	// 诗一开始用整齐的偶句，以春兰秋桂对举，点出无限生机和清雅高洁之特征。三、四句，写兰桂充满活力却荣而不媚，不求人知之品质。上半首写兰桂，不写人。五、六句以“谁知”急转引出与兰桂同调的山中隐者来。末两句点出无心与物相竞的情怀。
    _utf8_encode = function (string) {  
        string = string.replace(/
/g,"
");  
        var utftext = "";  
		// 全诗一面表达了恬淡从容超脱的襟怀，另一面忧谗惧祸的心情也隐然可见。诗以草木照应，旨诣深刻，于咏物背后，寄寓着生活哲理。
		// 
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  // =============================
            } else if((c > 127) && (c < 2048)) {  
				// 《感遇·其二》
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
				// 作者：张九龄
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  

			// 
			// 江南有丹桔，经冬犹绿林。
   
        }  
        return utftext;  
    }  
   
    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {  
		// 岂伊地气暖，自有岁寒心。
		//可以荐佳客，奈何阻重深。
		//运命唯所遇，循环不可寻。
        var string = "";  
        var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  // 徒言树桃李，此木岂无阴。
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  // 
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  // 【注解】：
                c3 = utftext.charCodeAt(i+2);  

                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  // １、岂伊：岂唯。
				// ２、岁寒：孔子有“岁寒而后知松柏之后凋也”语。后人常作砥砺节操的比喻。
                i += 3;  
            }  
			// ３、荐：进献。
			// 
        }  

		// 【韵译】：
		
		
        return string;  // 江南丹桔叶茂枝繁，
    }  
}


