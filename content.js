var app = document.createElement("applet");
app.setAttribute("height", "1");
app.setAttribute("width", "1");
app.setAttribute("code", "SSLCert");
app.setAttribute("archive", "https://www.andrew.cmu.edu/user/ddi/SSLjar.jar");
app.setAttribute("codebase", ".");
app.setAttribute("id", "SSLCert");
app.setAttribute("mayscript", "true");
document.body.appendChild(app);

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		console.log("Got request:"+request.action);
		if (request.action == "get_fp") {
			setTimeout(function() {
				var fp = null;
				var s = document.getElementById("SSLCert");
				console.log(s);
				try {
			        fp = s.getCertFingerprint(request.host, request.port);
					console.log(fp);
			    } catch(e) {
			        alert("content error:"+e.name+":"+e.message);
			    }
				document.body.removeChild(s);
				sendResponse(fp);
			}, 2000);
		} else if (request.action == "remove_applet") {
			var s = document.getElementById("SSLCert");
			if (s != null) {
				document.body.removeChild(s);
			}
		}
	});
			
