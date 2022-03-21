var platform = navigator.platform;
var ua = navigator.userAgent;
var ios = /iPhone|iPad|iPod/.test(ua) && ua.indexOf("AppleWebKit") > -1;
var android = ua.indexOf("Android") > -1;
let mapTagName = 'freefireMap'

var Common = {
    init: function () {
        FastClick.attach(document.body);
        this.setMenu();
        this.setFixedDownload();
        this.getMoreNews();
        this.setChildpageBgMove();
        this.setRedIcon()
        this.setLang()
    },
    setRedIcon:function(){
        if(!!$('.red-icon').length){
            let newVersion = $('.red-icon').attr('data-version')
            let oldVersion = localStorage.getItem(mapTagName) 
            if(!(oldVersion && oldVersion == newVersion)){
                $('.red-icon').css({'display':'inherit'})
            }
        }
    },
    setMenu: function () {
        $(window).scroll(function (event) {
            var v = $(window).scrollTop();
            if (v > 50) {
                $(".c-menu-wrap").addClass('c-menu-fixed');
            } else {
                $(".c-menu-wrap").removeClass('c-menu-fixed');
            }
        });
        $(".c-menu-small-right").click(function (event) {
            $(this).toggleClass('hidden');
            $(".c-menu-small-cover").toggleClass('show');
        });
        if (android) {
            $(".c-menu-download").removeClass('dn');
        };
        //small menu set
        $(".c-menu-small-nav-list").click(function (event) {
            $(this).toggleClass('show');
        });        
    },
    setLang: function(){
        // è¯­è¨€åˆ—è¡¨é«˜åº¦ 
        let phoneHeight = $(window).height()
        let phoneWidth = $(window).width()
        if(phoneWidth<=980){
            let headerHeight = $('.c-menu-small').height()
            if($('.c-menu-small .m-language-menu-change').height()+headerHeight>phoneHeight){
                $('.c-menu-small .m-language-menu-change').css({'height':(phoneHeight-headerHeight)+'px'})
            }
        }        
    },
    getMoreNews: function () {
        $("#J_more").click(function () {
            $(".c-news-list-3x>li").removeClass('dn');
            // $(this).addClass('dn');
        })
    },
    setFixedDownload: function () {
        $(".c-fixed-download-close").click(function (event) {
            $("#J_fixed_download").addClass('dn');
        });
        if (ios) {
            $(".c-fixed-download-ios").removeClass('dn');
            // }else if(android){
            //     $(".c-fixed-download-android").removeClass('dn');
        } else {
            $(".c-fixed-download-pc").removeClass('dn');
        }
    },
    isMobile: function () {
        var rule = /(android|iPhone|iPad|iPod|mobile)/ig;
        return rule.test(navigator.userAgent);
    },
    setChildpageBgMove: function () {
        $(".g-top").addClass('bg_ani_move');
    }
}