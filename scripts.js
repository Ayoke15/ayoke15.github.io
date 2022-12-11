//Based on the Scroller function from @sallar
var $content = $('header .content')
    , $blur    = $('header .overlay')
    , wHeight  = $(window).height();

$(window).on('resize', function(){
    wHeight = $(window).height();
});

window.requestAnimFrame = (function()
{
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Scroller()
{
    this.latestKnownScrollY = 0;
    this.ticking            = false;
}

Scroller.prototype = {

    init: function() {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
        $blur.css('background-image',$('header:first-of-type').css('background-image'));
    },


    onScroll: function() {
        this.latestKnownScrollY = window.scrollY;
        this.requestTick();
    },


    requestTick: function() {
        if( !this.ticking ) {
            window.requestAnimFrame(this.update.bind(this));
        }
        this.ticking = true;
    },

    update: function() {
        var currentScrollY = this.latestKnownScrollY;
        this.ticking       = false;
        var path = window.location.pathname;
        var page = path.split("/").pop();

        var slowScroll = currentScrollY / 2
            , blurScroll = currentScrollY * 2
            , opaScroll = 1.4 - currentScrollY / 400;
        if(page == "main.html") {
            if(currentScrollY > wHeight)
                $('nav').css('position','fixed');
            else
                $('nav').css('position','absolute');
        }


        $content.css({
            'transform'         : 'translateY(' + slowScroll + 'px)',
            '-moz-transform'    : 'translateY(' + slowScroll + 'px)',
            '-webkit-transform' : 'translateY(' + slowScroll + 'px)',
            'opacity' : opaScroll
        });

        $blur.css({
            'opacity' : blurScroll / wHeight
        });
    }
};


var scroller = new Scroller();
scroller.init();

let header__burger = document.querySelector('.header__burger');
let header_menu = document.querySelector('.header__menu');
let back = document.querySelector('body');
let header__list = document.querySelector('.header__list');
let header = document.querySelector('.header');

header__burger.onclick = function(){
    if (header__burger.classList.contains('active') === false)
    {
        header__burger.classList.toggle('active');
        header_menu.classList.toggle('active');
        back.classList.toggle('lock');
    }
    else {
        header__burger.classList.remove('active');
        header_menu.classList.remove('active');
        back.classList.remove('lock');
    }
}

    header__list.onclick = function () {
        back.classList.remove('lock');
    }

let color = '#78aff8';
let times = setTimeout( function () {
    $('.content__header h1 , .page__header h1').css('box-shadow', '0px 2px 0px 0px' + color);
}, 0)

let timer = setInterval(function () {
    if (color === '#78aff8') {
        color = '#b77b9f';
    } else if (color === '#b77b9f') {
        color = '#78aff8';
    }
    $('.content__header h1 , .page__header h1').css('box-shadow', '0px 2px 0px 0px' + color);
}, 3100);

