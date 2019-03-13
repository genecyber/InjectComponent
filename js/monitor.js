function activate(tag){
    loadCss("./js/colorbox-master/example1/colorbox.css")
    loadScript("./js/colorbox-master/jquery.colorbox.js", function(){
        //nFocus(".iframe").colorbox({iframe:true, width:"50%", height:"50%", scrolling: false});
        //nFocus(".iframe").colorbox({html: "<p>foo</p>"})
        nFocus(".iframe").colorbox({inline:true, href:".myForm"})
    })    
    console.log("accompanying script loaded")
    nFocus(document).on("click", ".formButton", function() {
        return false
    })
}
