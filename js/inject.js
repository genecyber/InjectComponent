function init(callback, tpls) {
	var sources = [];
	var tags = [];
	nFocus.each(tpls,function(index,value){
		
		var tplTag = tpls.get(index);
		var tpl = tplTag.attributes["data-tpl"].value;
		var target = "#"+tplTag.attributes["id"].value;
		var source   = nFocus(target).html();
		var injectionTemplate = Handlebars.compile(source);

		nFocus.ajax({
			url: tpl,
			cache: false
		}).done(function( html ) {
			var data = {template: html};
			nFocus(target).html(injectionTemplate(data));
			sources.push(nFocus(target).html());
			tags.push(tplTag);
			if (index+1 == tpls.length)
				callback(sources,tags);
		});	
	});
    
}