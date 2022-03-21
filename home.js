var FreeFire = {
    init: function() {
        //check  mobile 
        if (Common.isMobile()) {
            $(".m-videoshow-bg").remove();
            $(".J_videoshow_cont").addClass('show');
        } else {
            this.setVideoBgShow();
        }
        // css
        var dev = window.matchMedia("(max-width: 640px)")
        FreeFire.mediaCss(dev)
        dev.addListener(FreeFire.mediaCss)

        this.playVideo($(".m-small-video"), $(".wrap"));
        this.setFixedDownloadFade();
        //this.setSwiper();
        //this.playTopVideo();
        this.setSwiper2Ctrl();
        this.setGameVideoPopHtml();

        this.activitySwiper()
    },
    activitySwiper: function(){
        if($('.swiper.activity').attr('data-length')>1){
        // æ»‘åŠ¨å—
        let activitySwiper = new Swiper('.activity', {
            speed: 500,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction:false
            },
            // If we need pagination
            pagination: {
              el: '.swiper-pagination',
            },
          
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        }
    },
    mediaCss:function(dev){
        var ele = $(".m-video-wrap");
        var m_img = ele.attr("data-m-img");
        var pc_img = ele.attr("data-pc-img");
        if(dev.matches){
            $(".m-video-wrap").css({"background-image":"url("+m_img+")"})
        }else{
            $(".m-video-wrap").css({"background-image":"url("+pc_img+")"})
        }
        
        // m-slogan
        let ele2 = $(".m-slogan")
        let m_img2 = ele2.attr("data-m-img");
        let pc_img2 = ele2.attr("data-pc-img");
        if(dev.matches){
            $(".m-slogan").css({"background-image":"url("+m_img2+")"})
        }else{
            $(".m-slogan").css({"background-image":"url("+pc_img2+")"})
        }
    },
    playTopVideo:function(){
        var $tar = $(".m-top-video");
        $tar.click(function(event) {
            var src = $tar.attr("data-video");
            var html = '<div class="m-top-videoshow"><iframe width="100%" height="100%" src="'+ src +'" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen="allowfullscreen"></iframe></div>';
            $.cs.lightBox(html,{
                model:true,
                hasClose:true
            });
        });
    },
    //exp:Common.playVideo($(".icon_play"),$("#wrap"))
    playVideo: function(tar, this_window) {
        tar.on('click', function() {
            var mp4 = $(this).attr('data-mp4');
            if (ios) {
                var playerHolder = '<video id="video" src="' + mp4 + '" width="100%" height="auto" controls autoplay preload="auto">æ‚¨çš„æµè§ˆå™¨ä¸æ”¯æŒè¯¥è§†é¢‘ï¼</video>'
                this_window.append(playerHolder);
                var video = $('#video'),
                    h = window.innerHeight,
                    scrollTop = $(window).scrollTop();
                video[0].play();
                video.css({
                    'width': '100%',
                    'height': h,
                    'position': 'absolute',
                    'top': scrollTop,
                    'left': 0
                });
                video[0].addEventListener('webkitendfullscreen', onVideoEndsFullScreen, false);

                function onVideoEndsFullScreen() {
                    $('#video').remove();
                }
            } else {
                var playerHolder = [
                    '<div id="playerHolder">',
                    '<video id="video" src="' + mp4 + '" width="100%" height="auto" controls autoplay preload="auto">æ‚¨çš„æµè§ˆå™¨ä¸æ”¯æŒè¯¥è§†é¢‘ï¼</video>',
                    '<a href="javascript:void(0);" class="video_close"></a>',
                    '</div>'
                ].join('');
                this_window.append(playerHolder);
                var videoWrapper = $('#playerHolder'),
                    video = $('#video'),
                    h = window.innerHeight,
                    scrollTop = $(window).scrollTop();
                video[0].play();
                document.ontouchmove = function(e) {
                    e.preventDefault();
                }
                videoWrapper.css({
                    'width': '100%',
                    'height': h,
                    'position': 'absolute',
                    'top': scrollTop,
                    'left': 0
                })
                video.attr('height', h);
                $(window).on('resize', function() {
                    h = window.innerHeight;
                    scrollTop = $(window).scrollTop();
                    videoWrapper.css({
                        'width': '100%',
                        'height': h,
                        'position': 'absolute',
                        'top': scrollTop,
                        'left': 0
                    })
                    video.attr('height', h);
                })

                $('.video_close').on('click', function() {
                    $('#playerHolder').remove();
                    document.ontouchmove = function(e) {
                        e.default();
                    }
                })
            }

        })
    },
    setFixedDownloadFade: function() {
        $(window).scroll(function(event) {
            var scrollTop = $(window).scrollTop();
            //console.log(scrollTop);
            if (scrollTop > 700) {
                $(".c-fixed-download-wrap").addClass('show');
            } else {
                $(".c-fixed-download-wrap").removeClass('show');
            }
        });
    },
    setSwiper2Ctrl:function(){
        var time = 5000; //åˆ‡æ¢æ—¶é—´
        var $wrap = $(".swiper2_list>li");
        var $li = $(".swiper2_icon>li");
        var num = $wrap.length; //ä¸ªæ•°
        var index = 0; //å½“å‰å¸§
        var Timer = setInterval(function(){
            index++;
            if(index>=num){
                index = 0;
            }
            show(index);
        },time);
        function show(index){
            $wrap.eq(index).addClass('active').siblings().removeClass('active');
            $li.eq(index).addClass('active').siblings().removeClass('active');
        };
        $li.click(function(event) {
            var index = $(this).index();
            clearInterval(Timer); //å…³é—­pageIconåˆ‡æ¢
            show(index);
            Timer = setInterval(function(){
                index++;
                if(index>=num){
                    index = 0;
                }
                show(index);
            },time);
        });
    },
    setSwiper: function() {
        var time = 5000; //åˆ‡æ¢æ—¶é—´
        var max = 5; //æœ€å¤§ä¸ªæ•°
        var $wrap = $(".m-swiper");
        var wrap_w = $wrap.width();
        var $pageIcon = $(".m-sw-line-list>li");
        var li_w = wrap_w / max;
        var index = 0; //å½“å‰å¸§
        var num = 1;
        var Timer_line = setInterval(function(args) {
            $pageIcon.eq(index).find("i").css("width", num * (100 / time * 100) + "%");
            num++;
        }, 100);
        var Switcher = setInterval(function(args) {
            move();
        }, time)

        function move() {
            index++;
            if (index >= max) {
                index = 0;
            }
            $wrap.css("left", -(index * 100) + '%');
            $pageIcon.eq(index).addClass('active').siblings().removeClass('active');
            $(".m-sw-line-list li i").css("width", 0);
            clearInterval(Timer_line); //å…³é—­pageIconåˆ‡æ¢
            num = 1;
            Timer_line = setInterval(function(args) {
                $pageIcon.eq(index).find("i").css("width", num * (100 / time * 50) + "%");
                num++;
                //console.log(num)
            }, 50);
        };
        $(".m-sw-line-list>li a,.m-sw-line-list>li .txt").click(function(event) {
            var pageIndex = $(this).parent("li").index();
            //console.log(pageIndex);
            index = pageIndex;
            $wrap.css("left", -(index * 100) + '%');
            $pageIcon.eq(index).addClass('active').siblings().removeClass('active');
            $(".m-sw-line-list li i").css("width", 0);
            clearInterval(Switcher); //å…³é—­å±å¹•åˆ‡æ¢
            clearInterval(Timer_line); //å…³é—­pageIconåˆ‡æ¢
            num = 1;
            Timer_line = setInterval(function(args) {
                $pageIcon.eq(index).find("i").css("width", num * (100 / time * 100) + "%");
                num++;
            }, 100);
            Switcher = setInterval(function(args) {
                move();
            }, time);
        });
    },
    setVideoBgShow: function() {
        var video = document.getElementById('J_video_show');
        var switchX = true;
        $(window).scroll(function() {
            //console.log($(window).scrollTop())
            if ($(window).scrollTop() > 1600) {
                if(switchX){
                    video.play();
                    $(".J_videoshow_cont").addClass('show');
                    switchX = false;
                }
                //$(window).off("scroll");
            }
        })
    },
    setGameVideoPopHtml: function() {
        $(".g-gameVideo-wrap li").click(function(event) {
            var link = $(this).attr("data-video");
            var html = '<div class="gameVideo-pop-wrap"><div class="gameVideo-pop"><iframe width="100%" height="100%" src="'+ link +'" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen="allowfullscreen"></iframe></div><div class="gameVideo-pop-closeBtn"></div></div>';
            $.cs.lightBox(html, {
                model: true,
                hasClose: false
            });
            $(".gameVideo-pop-closeBtn").click(function(event) {
                $("#boxModel,#popBox").remove();
            });
        });
    },
}