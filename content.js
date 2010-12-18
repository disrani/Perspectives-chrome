
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		console.log("Got request:"+request.action);
		if (request.action == "load_applet") {
			console.log("Loading applet");
			var app = document.createElement("applet");
			document.body.appendChild(app);
			app.setAttribute("height", "1");
			app.setAttribute("width", "1");
			app.setAttribute("code", "SSLCert");
			app.setAttribute("archive", "https://www.andrew.cmu.edu/user/ddi/SSLjar.jar");
			app.setAttribute("codebase", ".");
			app.setAttribute("id", "SSLCert");
			sendResponse({"tabId": request.tabId});
		} else if (request.action == "get_fp") {
			console.log("fp for "+request.host);
			
			setTimeout(function() {
				var fp = null;
				try {
					var s = document.getElementById("SSLCert");
			        fp = s.getCertFingerprint(request.host, request.port);
					//console.log(fp);
			    } catch(e) {
			        console.log("content error:"+e.name+":"+e.message);
			    }
				//s.kill();
				//document.body.removeChild(s);
				sendResponse({"fp":fp, "tabId": request.tabId});
			}, 1000);
		} else if (request.action == "remove_applet") {
			var s = document.getElementById("SSLCert");
			if (s != null) {
				document.body.removeChild(s);
			}
		}
	});
			
