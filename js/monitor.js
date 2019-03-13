function activate(tag){
    loadCss("./js/colorbox-master/example1/colorbox.css")
    loadScript("./js/colorbox-master/jquery.colorbox.js", function(){
        //nFocus(".iframe").colorbox({iframe:true, width:"50%", height:"50%", scrolling: false});
        //nFocus(".iframe").colorbox({html: "<p>foo</p>"})
        nFocus(".iframe").colorbox()
    })    
    console.log("accompanying script loaded...")
    alert(0)
    setTimeout(()=>{
        alert(0)
        nFocus(".iframe").click(()=>{nFocus.colorbox({rel:".iframe"})})
    }, 500)
}
