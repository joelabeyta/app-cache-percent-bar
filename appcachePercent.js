// Some of this is from 
// Eric Bidelman's Article "A Beginner's Guide to Using the Application Cache"
// http://www.html5rocks.com/en/tutorials/appcache/beginner/
// also this: http://www.whatwg.org/specs/web-apps/current-work/

// appcahce stuff
var appCache = window.applicationCache;
var cacheProg = 0;
var prog = document.getElementById('prog');

window.addEventListener('load', function(e) {
	// Check if a new cache is available on page load.
	window.applicationCache.addEventListener('updateready', function(e) {
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		// Browser downloaded a new app cache.
			if (confirm('A new version of this site is available. Load it?')) {
				window.location.reload();
			}
		} else {
		// Manifest didn't changed. Nothing new to server.
		}
	}, false);

	// Once the update is done, start er up
	window.applicationCache.addEventListener('cached', function() {
		loadingDone();
	}, false);

	// If there is no update, start er up
	window.applicationCache.addEventListener('noupdate', function() {
		loadingDone();
	}, false);
}, false);

// hide the loading bar when it's done
function loadingDone() {
	prog.className = 'hidden';
}

// fires every time a file is loaded
function progressEvent(e) {
	prog.className = '';

	var progInner = document.getElementById('prog-inner');
	var progPercent = document.getElementById('prog-percent');

	// update the percent
	totalfiles = Number(e.total);
	cacheProg = cacheProg + 1;
	var progWidth = Math.round(cacheProg / totalfiles * 100);

	// update the numerical percent
	progPercent.innerHTML = progWidth - 1 +'%';

	// update the width of the percent bar
	progInner.style.width = progWidth - 1 +'%';

	// when it's done, run the loading done function
	if(cacheProg >= totalfiles) {
		loadingDone();
	}
}
appCache.addEventListener('progress', progressEvent, false);