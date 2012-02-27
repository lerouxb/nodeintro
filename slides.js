(function() {

$(document).ready(function() {
    var screen;
    $('#slides > *').each(function() {
        var el = $(this),
            tagName = el.get(0).tagName.toLowerCase();

        // every h1 means a new screen
        // (screens are slides)
        if (tagName == 'h1') {
            screen = $('<div class="screen slide"></screen>');
            $('#slides').append(screen);
        } else {
            // all li tags are slides too
            el.find('li')
                .addClass('slide')
                .each(function() {
                    var li = $(this)
                    li
                        .addClass('slide')
                        .html('<span>'+li.html()+'</span>');
                });
        }

        // add everything to the latest screen
        // (this means tags before the first h1 will be ignored)
        if (screen) {
            screen.append(el.detach());
        }
    });

    // why is there no depth-first (is that the term?) selector support?
    var getSlides = function() {
        var slides = [];
        $('.screen').each(function() {
            slides.push(this);
            $(this).find('.slide').each(function() {
                slides.push(this);
            });
        });
        return $(slides);
    };

    var
        slideNum = 1,
        slides = getSlides();

    //console.log(slides);

    var show = function() {
        slideNum = parseInt(window.location.hash.slice(1), 10) || 1;
        var
            before = slides.slice(0, slideNum-1),
            after = slides.slice(slideNum),
            current = slides.eq(slideNum-1);

        before
            .removeClass('current-slide')
            .removeClass('current-screen')
            .removeClass('after');
        before.addClass('before');

        after
            .removeClass('current-slide')
            .removeClass('current-screen')
            .removeClass('before');
        after.addClass('after');

        current.addClass('current-slide').removeClass('before');

        // all screens are slides, but not all slides are screens
        // we hilight the current screen
        var screen;
        if (current.hasClass('screen')) {
            screen = current;
        } else {
            screen = current.parents('.screen');
        }
        screen.addClass('current-screen');
    };

    show();

    $(window).bind('hashchange', function() {
        show();
    });

    var
        LEFT = 37,
        RIGHT = 39;

    $(window).keydown(function(e) {
        if (e.which == LEFT) {
            if (slideNum > 1) {
                window.location.hash = '#'+(slideNum-1);
            }
        }
        if (e.which == RIGHT) {
            if (slideNum < slides.length) {
                window.location.hash = '#'+(slideNum+1);
            }
        }
    });
});

}).call(this);

