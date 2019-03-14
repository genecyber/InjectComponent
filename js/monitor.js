function activate(tag){
    loadCss("./js/colorbox-master/example1/colorbox.css")
    loadScript("./js/colorbox-master/jquery.colorbox.js", function(){
        //nFocus(".iframe").colorbox({href: 'order.html'})
    })
    console.log("accompanying script loaded...")
    setTimeout(()=>{
        nFocus(".iframe").click(()=>{nFocus.colorbox({href: 'order.html'})})
    }, 500)
}
