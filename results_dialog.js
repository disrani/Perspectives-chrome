var Pers_results = {
	//root_prefs : Components.classes["@mozilla.org/preferences-service;1"].
	//			getService(Components.interfaces.nsIPrefBranch),


	switchResultForm: function(){
		var sel = document.getElementById("info-radio").selectedIndex;
		document.getElementById("perspective-svg-box").hidden     = sel;
		document.getElementById("perspective-description").hidden = !sel;
	},

	addTimeline: function(svgString){
		var parser       = new DOMParser();
		var svgDoc   = parser.parseFromString(svgString, "text/xml");
		var svg = svgDoc.getElementsByTagName("svg")[0];
		
		var svg1 = svg.cloneNode(true);
		document.body.appendChild(svg1);
	},

	addLabel: function(label){
		var label_div = document.createElement("label");
		label_div.innerHTML = label;	
		document.body.appendChild(label_div);
	},

	// returns a string that describes whether perspectives installed a 
	// security exception 
	getActionStr: function(uri,ti) {
		if(uri.protocol != "https") 
			return "Perspectives only queries 'https' sites. This site uses '" 
				+ uri.protocol + "'"; 
		if(ti.is_override_cert && ti.already_trusted) 
			return  "Perspectives has previously installed a security "
				"exception for this site."; 
		if(ti.already_trusted) 
			return "The browser trusts this site and requires no security "
				"exception";  
		if(ti.is_override_cert && ti.notary_valid && ti.exceptions_enabled && 
			ti.isTemp) 
			return  "Perspectives installed a temporary security exception "
				"for this site."; 
		if(ti.is_override_cert && ti.notary_valid && ti.exceptions_enabled && 
			!ti.isTemp)  
			return "Perspectives installed a permanent security exception for "
				"this site."; 
		return "No security exception has been installed"; 
	},

	load_results_dialog: function(tab){

		try {
			/* 
			var info  = document.createElement("perspective-description");
			var liner = document.createElement("perspective-quorum-duration");
			var host  = document.
						createElement("perspective-information-caption");

			if(!window.opener) { 
				Pers_debug.d_print("error",
					"window.opener is null in results dialog"); 
				return; 
			} 
			var uri = window.opener.gBrowser.currentURI; 
			if(!uri) { 
				Pers_debug.d_print("error","null URI in results dialog"); 
				return; 
			} 
			*/
			var uri = parseUri(tab.url);
			try { 
				var ignore = uri.host; 
			} catch(e) { 
				return;
			}

			bg = chrome.extension.getBackgroundPage();

			var other_cache = bg.Perspectives.other_cache; 	
			var cert  = bg.Perspectives.ssl_cache[uri.host];
			var ti = bg.Perspectives.tab_info_cache[uri.source]; 
			var host_label = uri.host;
			console.log(host_label);
			if(uri.protocol != "https") { 
				host_label += ": " + Pers_results.getActionStr(uri, ti); 
				console.log(host_label);
				Pers_results.addLabel(host_label);
				return;
			} 
			Pers_results.addLabel(host_label);
			console.log(host_label);
			console.log(cert);
			if(cert){
				//var info_value  = cert.summary;
				//var liner_value = cert.tooltip;
				if(cert.svg && cert.svg != ""){
					//info.hidden = true;
					console.log(tab.url);
					Pers_results.addTimeline(cert.svg);
					console.log(tab.url);
					//var radio = document.getElementById("info-radio");
					//radio.hidden=false;
					//radio.selectedIndex = 0;
				}
			} else if (other_cache["reason"]) {
				//info.value = other_cache["reason"]; 
			} 
		} catch(e) { 
			Pers_debug.d_print("error", "Error loading results dialog"); 
			Pers_debug.d_print("error", e); 
			alert("Error loading Perspectives dialog: " + e); 
		}  
  
		return true;
	}
}
