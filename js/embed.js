var nFocus; //noconflict reference to jquery
var loadScript;
var loadCss;
(function () {
 
    var scriptName = "embed.js"; //name of this script, used to get reference to own tag
    var templateName = "tpl"
    var jqueryPath = "//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"; 
    var jqueryVersion = "1.8.3";
    var scriptTag; //reference to the html script tag
    var tplTag;
    
    /******** Get reference to self (scriptTag) *********/
    var allScripts = document.getElementsByTagName('script');
    var targetScripts = [];
    for (var i in allScripts) {
        var name = allScripts[i].src
        if(name && name.indexOf(scriptName) > 0)
            targetScripts.push(allScripts[i]);
    }
 
    scriptTag = targetScripts[targetScripts.length - 1];
    tplTag = nFocus
    
    /******** helper function to load external scripts *********/
    loadScript = function loadScript(src, onLoad) {
        var script_tag = document.createElement('script')
        script_tag.setAttribute("type", "text/javascript")
        if (window.location.href && !src.substring(0, 8).includes('//') && !src.substring(0, 2) === "./") {
            src = getAbsolutePath() + src
        }
        script_tag.setAttribute("src", src)
 
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    onLoad();
                }
            };
        } else {
            script_tag.onload = onLoad;
        }
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    }
 
    /******** helper function to load external css  *********/
    loadCss = function loadCss(href) {
        var link_tag = document.createElement('link');
        link_tag.setAttribute("type", "text/css");
        link_tag.setAttribute("rel", "stylesheet");
        if (window.location.href && !href.substring(0, 8).includes('//')) {
            href = getAbsolutePath() + href
        }
        link_tag.setAttribute("href", href);
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(link_tag);
    }
 
    /******** load jquery into 'jQuery' variable then call main ********/
    if (window.nFocus === undefined || window.nFocus.fn.jquery !== jqueryVersion) {
        loadScript(jqueryPath, initjQuery);
    } else {
        initjQuery();
    }
 
    function initjQuery() {
        nFocus = window.jQuery.noConflict(true);
        main();
    }

    function getAbsolutePath() {
        var url = window.location.href
        var filename = url.match(/.*\/(.*)$/)[1];
        var absolutePath = url.replace(filename, '')
        if (absolutePath.includes('file://') || absolutePath.includes('localhost') || absolutePath.includes('127.0')) {
            absolutePath = "//genecyber.github.io/InjectComponent/"
        }
        return absolutePath
    }
 
    /******** starting point for your widget ********/
    function main() {
      //your widget code goes here
	
        nFocus(document).ready(function ($) {
            tpls = nFocus("[type='text/x-handlebars-template']");
            if (tpls.length < 1)
                return;
			loadScript("//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.js", function() {
				loadScript("js/inject.js", function() { init(initWorker,tpls); });
			});
        });
        function initWorker(sources,tags) {
			
			nFocus.each(sources, function(index,value){
				var tag = tags[index];
				var source = sources[index];
                tplTag = tag;
                if (tplTag.attributes["data-src"]) {
                    loadScript(tplTag.attributes["data-src"].value, function() {
                        compileTemplate(renderTemplate, sources, tags)
                    })
                } else {
                    compileTemplate(renderTemplate, sources, tags)
                }
				if (index +1 == sources.length)
					setTimeout(function(){done()},1000);
			});
        }
		function compileTemplate(callback, sources, tags) {
			nFocus.each(tags, function(index, value){
				var tag = tags[index]
				var source = sources[index]
				tplTag = tag
                var template = Handlebars.compile(source)
                if (!tplTag.attributes["data-src"]) {
                    activate = ()=>{console.log("No accompanying script defined to execute")}
                }                
				callback(source, activate, tag)				
			}); 
			
		}
        function renderTemplate(tpl, cb, tplTag) {
			loadCss("//stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
			loadCss("//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css");
            nFocus("."+tplTag.attributes["data-target"].value).html(tpl);
            cb(tplTag)
        };
		function done() {
			console.log("Embed complete")
		}
    }
 
})();