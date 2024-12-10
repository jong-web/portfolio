$(function(){
    // 새로고침을 해야 window의 width값을 감지한다.
    let documentwidth = $(window).width();
    // 모바일을 제외한 기기에서는 fullpage 적용
    if(documentwidth >= 481){
         // fullpage
        let page = $(".wrap").fullpage({
            navigation:true,
            fixedElements:'header, #top',
            menu:'nav',
            anchors:['home', 'portfolio', 'profile', 'emails']
        });
        $("#top").click(function(){
            $.fn.fullpage.moveTo(1,1);
        });
        // home text animation
        // 글씨 분리하기
        document.querySelectorAll(".split").forEach(desc => {
            let splitText = desc.innerText;
            let splitWrap = splitText.split('').join("</span><span aria-hidden:'true'>");
                splitWrap = "<span aria-hidden:'true'>" + splitWrap + "</span>";
                desc.innerHTML = splitWrap;
                desc.setAttribute("aria-label", splitText);
        });
        // 메인 기본세팅
        gsap.set(".text__inner .ti1", {opacity: 0, y: "10vh"});
        gsap.set(".text__inner .ti2 span", {opacity: 0, x: 500, scale: 10, display: "inline-block", minWidth: "1.6vw"});
        gsap.set(".text__inner .ti3", {opacity: 0, y: "-10vh"});
        gsap.set("#webgl", {opacity: 0});
        gsap.set("#header", {y: -100});
        gsap.set("#nav", {y: -100});

        setTimeout(() => {
            let tl = gsap.timeline();
            tl.to(".text__inner .ti2 span", {opacity: 1, scale: 1, x: 0, duration: 0.6, stagger: 0.1, ease: Power3.easeInOut})
            tl.to(".text__inner .ti1", {opacity: 1, y: 0, duration: 0.5, ease: Circ.easOut}, "ee +=0.5")
            tl.to(".text__inner .ti3", {opacity: 1, y: 0, duration: 0.5, ease: Circ.easOut}, "ee +=0.5")
            tl.to("#webgl", {duration: 1, opacity: 1});
            tl.to("#header", {duration: 0.5, y: 0}, "ss +=0.5");
            tl.to("#nav", {duration: 0.5, y: 0}, "ss +=0.5");
        }, 1000);
    // 모바일에서는 메뉴를 터치하면 그 해당 section으로 이동
    }else {
        $("nav ul li a").click(function(){
            // 클릭한 a태그의 href속성값을 읽어서 $el변수에 저장
            let $el = $(this).attr("href");
            // href속성값에 "mo-"문자열을 붙인 다음
            // substr(startIndex, length);
            let menuStr = "#mo-" + $el.substr(1);
            // 그 메뉴에 해당하는 section으로 이동
            $("html, body").animate({
                // scrollTop() : 선택한 요소의 세로 스크롤 막대 위치를 설정하거나 반환
                // offset() : 문서를 기준으로 선택한 요소의 좌표를 설정, 반환
                // top : offset()의 좌표 값
                scrollTop:$(menuStr).offset().top
            });
        });
        $("#top").click(function(){
         //fullpage가 아닐 때 맨 위로 이동
            $("html, body").animate({
                scrollTop:0
            });
        });
    }

    // swiper portfolio
    let swiper = new Swiper(".mySwiper", {
        // autoplay:{
        //     delay:5000
        // },
        loop:true,
        centeredSlides: true,
        pagination:{
            el:".swiper-pagination",
            clickable:true
        },
        navigation:{
            nextEl:".swiper-button-next",
            prevEl:".swiper-button-prev"
        },
        slidesPerView:3,
        spaceBetween:30,

        // swiperslide의 breakpoint
        breakpoints : {
            360 : {
                slidesPerView:1,
                spaceBetween:0,
            },
            480 : {
                slidesPerView:1,
                spaceBetween:0,
            },
            767 : {
                slidesPerView:2,
                spaceBetween:30,
                centeredSlides: false,
            },
            1279 : {
                slidesPerView:3,
                spaceBetween:30,
            }
        }
    });
    // $('.mySwiper').on('mouseenter', function(){
    //     swiper.autoplay.stop();
    // });
    // $('.mySwiper').on('mouseleave', function(){
    //     swiper.autoplay.start();
    // });
    // skill bar
    $('.skillbar').each(function(){
        $(this).find('.skillbar-bar').animate({
            width:$(this).attr('data-percent')
        },3000);
    });
    // email animation
    // email active
    setTimeout(function emailOpen(){
        $('.letter-image').addClass('active');
        setTimeout(function emailClose(){
            $('.letter-image').removeClass('active');
            setTimeout(emailOpen, 4000);
        }, 4000);
    }, 4000);
    // 모바일 버전에서 메뉴 아이콘을 클릭하면 메뉴 나옴
    $(".menu_icon").click(function(e){
        e.preventDefault();
        $("nav").animate({right:0});
    });
    // 모바일 버전에서 메뉴 아이콘을 클릭하면 메뉴 나옴
    $(".close").click(function(e){
        e.preventDefault();
        $("nav").animate({right:"-100%"});
    });
});