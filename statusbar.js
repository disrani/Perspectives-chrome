var Pers_statusbar = {
	STATE_ERROR : -1,
	STATE_SEC   : 0,
	STATE_NSEC  : 1,
	STATE_NEUT  : 2,
	/*STATE_START : Components.interfaces.
		nsIWebProgressListener.STATE_START,
	STATE_STOP  : Components.interfaces.
			nsIWebProgressListener.STATE_STOP,
	*/
	statusbar_click: function(event) {
		Pers_debug.d_print("main",event); 
		Pers_debug.d_print("main", event.button); 
		Pers_statusbar.open_results_dialog();
	},

	// note: when debugging, it is useful to open this dialog as a 
	// window, so we get a firebug console, etc
	open_results_dialog: function() { 
		window.openDialog(
	//	window.open( // for debug
			"chrome://perspectives/content/results_dialog.xul", 
	//        	"perspectivesResults", "").focus();  // for debug
			"perspectivesresults", "centerscreen, chrome, toolbar").focus();

	},

	// note: when debugging, it is useful to open this dialog as a 
	// window, so we get a firebug console, etc
	open_preferences_dialog: function() { 
		window.openDialog(
	// 	window.open( // for debug
			"chrome://perspectives/content/preferences_dialog.xul", 
	//       	"perspectivesResults", "").focus();  // for debug
			"perspectivepreferences", "centerscreen, chrome, toolbar").focus();

	},


	setStatus: function(tab, state, tooltip){
		if(!tooltip){
			tooltip = "Perspectives";
		}

		var img;
		switch(state){
		case Pers_statusbar.STATE_SEC:
			Pers_debug.d_print("main", "Secure Status\n");
			img = chrome.extension.getURL("good.png");
			break;
		case Pers_statusbar.STATE_NSEC:
			Pers_debug.d_print("main", "Unsecure Status\n");
			img = chrome.extension.getURL("bad.png");
			break;
		case Pers_statusbar.STATE_NEUT:
			Pers_debug.d_print("main", "Neutral Status\n");
			img = chrome.extension.getURL("default.png");
			break;
		case Pers_statusbar.STATE_ERROR:
			Pers_debug.d_print("main", "Error Status\n");
			img = chrome.extension.getURL("error.png");
			break;
		}
		chrome.browserAction.setIcon({"path": img, "tabId":tab.id});
		Pers_debug.d_print("main", "changing tooltip to: " + tooltip + "\n"); 
		return true;
	},

	openCertificates: function(){
		openDialog("chrome://pippki/content/certManager.xul", 
			"Certificate Manager");
	},

	//Should open new window because the dialog prevents them from seeing it
	openNotaries: function(){
		openDialog("chrome://perspectives_main/content/http_notary_list.txt", 
			"", "width=600,height=600,resizable=yes");
	},

	openHelp: function(){
		openDialog("chrome://perspectives_main/content/help.html","",
			"width=600,height=600,resizable=yes");
	}
}
