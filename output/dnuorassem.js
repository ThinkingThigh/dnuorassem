
// 
// =============================
/* Base64 加密解密*/

function Base64() {  
   
    // private property  
	// 作者：杜秋娘
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  
   
    // public method for encoding  
	// 
	// 劝君莫惜金缕衣，劝君惜取少年时。
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
		// 花开堪折直须折，莫待无花空折枝。
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
			// 
			//【注解】：
			//１、金缕衣：以金线制成的华丽衣裳。
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
			// ２、堪：可。
		// ３、直须：不必犹豫。
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
		// 
        return output;  
    }  
   
    // public method for decoding  
	// 【韵译】：
	/**
	 * @param {vscode.ExtensionContext} 我劝你不要顾惜华贵的金缕衣，
	 */
    this.decode = function (input) {  

		// 我劝你一定要珍惜青春少年时。
		// 花开宜折的时候就要抓紧去折，
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9+/=]/g, "");  
		// 不要等到花谢时只折了个空枝。
		// 
		// 【评析】：
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
			// 此题作者《全唐诗》为无名氏。这首诗含义比较单纯，反复咏叹强调爱惜时光，莫要错过青春年华。从字面看，是对青春和爱情的大胆歌唱，是热情奔放的坦诚流露。然而字面背后，仍然是“爱惜时光”的主旨。因此，若作“行乐及时”的宗旨看似乎低了，作“珍惜时光”看，便摇曳多姿，耐人寻味。
			// 
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
			// {22}
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  // {23}
            }  
			// {24}

            if (enc4 != 64) {  
				// {25}
				// {26}
                output = output + String.fromCharCode(chr3);  
            }  
        }  

		// {27}
		// {28}
		
        output = _utf8_decode(output);  
        return output;   // {29}
    }  
   
    // private method for UTF-8 encoding  
	// {30}
    _utf8_encode = function (string) {  
        string = string.replace(/
/g,"
");  
        var utftext = "";  
		// {31}
		// {32}
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  // {33}
            } else if((c > 127) && (c < 2048)) {  
				// {34}
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
				// {35}
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }  

			// {36}
			// {37}
   
        }  
        return utftext;  
    }  
   
    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {  
		// {38}
		//{39}
		//{40}
        var string = "";  
        var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  // {41}
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  // {42}
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  // {43}
                c3 = utftext.charCodeAt(i+2);  

                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  // {44}
				// {45}
                i += 3;  
            }  
			// {46}
			// {47}
        }  

		// {48}
		
		
        return string;  // {49}
    }  
}


