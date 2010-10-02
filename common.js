var Pers_debug = {
	d_print_all : false,

	d_print_flags : { 
		"policy" : false, 
		"query" : false,
		"main" : false,  
		"error" :  false 
	},

	d_print: function(flag,line) {
		if(!Pers_debug.d_print_flags[flag] && !Pers_debug.d_print_all) { 
			return; 
		} 
		//dump(line); 
		try { 
			Firebug.Console.log(line); // this line works in extensions
		} catch(e) { 
			/* ignore, this will blow up if Firebug is not installed */  
		}
		try { 
			console.log(line); // this line works in HTML files
		} catch(e) { 
			/* ignore, this will blow up if Firebug is not installed */  
		}
	}
}

var Pers_util = {
	get_unix_time: function() { 
		var unixtime_ms = (new Date()).getTime(); // Returns milliseconds since the epoch
		return parseInt(unixtime_ms / 1000);
	},

	SEC2DAY: function(sec) { return sec / (3600 * 24); },
	DAY2SEC: function(day) { return day * (3600 * 24); }, 

  	readLocalFileLines: function(path){
    		var MY_ID = "perspectives@cmu.edu";
			var file = chrome.extension.getURL(path);

			var newRequest = new XMLHttpRequest();
			newRequest.open("GET", file, false);
			newRequest.send();
			//alert(newRequest.responseText);
    		//var em = Components.classes["@mozilla.org/extensions/manager;1"].getService(Components.interfaces.nsIExtensionManager);
    		//var file = em.getInstallLocation(MY_ID).getItemFile(MY_ID, path);
    		//var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].
    		//createInstance(Components.interfaces.nsIFileInputStream);
    		//istream.init(file, 0x01, 0444, 0);
    		//istream.QueryInterface(Components.interfaces.nsILineInputStream);

    		// read lines into array
    		//var hasmore;
    		//var text = "";
    		var lines = [];

    		//var line = {}, lines = [], hasmore;
			
			response = newRequest.responseText.split("\n");
			for (i = 0 ; i < response.length ; i++) {
        		if (response[i].length > 0 && response[i][0] != "#")
					lines.push(response[i]);
			}
    		//do {
        	//	hasmore = istream.readLine(line)
        	//	if (line.value.length > 0 && line.value[0] != "#")
        	//	lines.push(line.value);
    		//} while(hasmore);
			//
    		//istream.close();

    		//return lines;
			return lines;
	}, 

	readLocalFile: function(path){
    		var arr = Pers_util.readLocalFileLines(path);
    		var text = "";

    		for (i = 0; i < arr.length; i++){
        		text += arr[i] + "\n";
    		}

    		return text;
	}

 
}
