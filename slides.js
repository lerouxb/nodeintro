(function() {

var Slides = window.Slides = {
    locked: false,
    key: null, // set this to gain speaker privileges
    host: null,
    port: null,

    init: function(host, port) {
        this.host = host;
        this.port = port;

        $('.host').text(host);
        $('.port').text(port);

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
                        var li = $(this);
                        var html = $('<span>'+li.html()+'</span>');
                        li
                            .addClass('slide')
                            .html(html);
                    });
            }

            // poor man's widont
            // for some reason this causes the whole line to never wrap at all?
            $('h1, li span').each(function() {
                var el = $(this);
                if (el.find('*').length == 0) {
                    var text = el.html().trim();
                    if (text.indexOf(' ') != -1 &&
                            text.indexOf('&nbsp;') == -1) {
                        var i = text.lastIndexOf(' ');
                        if (i != -1) {
                            text = text.substr(0, i) + "&nbsp;" +
                                text.substr(i+1);
                        }
                        el.html(text);
                    }
                }
            });

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

        this.slideNum = 1,
        this.slides = getSlides();


        var that = this;
        // show the correct slide whenever the window's hash changes
        $(window).bind('hashchange', function() {
            that.show();
        });

        // key codes
        var
            LEFT = 37,
            RIGHT = 39;

        // handle left and right
        var that = this;
        $(window).keydown(function(e) {
            if (e.which == LEFT) {
                if (that.slideNum > 1) {
                    that.changeSlide(that.slideNum-1);
                }
            }
            if (e.which == RIGHT) {
                if (that.slideNum < that.slides.length) {
                    that.changeSlide(that.slideNum+1);
                }
            }
        });

        // immediately show the first slide (while we wait to connect)
        this.show();

        // parse cookies
        var cookieBits = document.cookie.split(';');
        var cookies = _.reduce(cookieBits, function(memo, cookie) {
            var bits = cookie.split('=');
            memo[bits[0]] = bits[1];
            return memo;
        }, {});

        // restore the key from a cookie
        if (cookies.key) {
            this.key = cookies.key;
        }

        this.lock();

        this.resize();
        var that = this;
        $(window).resize(function() {
            that.resize();
        });
    },

    resize: function() {
        var fontSize = 100;
        var height = $(window).height();
        if (height < 768) {
            fontSize = Math.max(Math.round(height/768*100), 0);
        }
        $('html').css('font-size', fontSize+'%');
    },

    lock: function() {
        if (this.locked === true) return;

        this.locked = true;
        var url = 'http://'+this.host+':'+this.port+'/';
        var socket = this.socket = io.connect(url, {
            'force new connection': true
        });
        var that = this; // see what I mean? (yes, Slides is also a singleton.)
        socket.on('connect', function() {
            socket.on('slide', function(data) {
                that.updateHash(data.slideNum);
            });
        });
    },

    unlock: function() {
        if (this.locked !== true) return;

        this.locked = false;
        this.socket.disconnect();
        this.socket = null;
    },

    show: function() {
        // set the current slide according to the window's hash
        this.slideNum = parseInt(window.location.hash.slice(1), 10) || 1;


        this.slides.each(function() {
            var el = $(this);
            var hasScreen = el.hasClass('screen');
            el.removeAttr('class');
            el.addClass('slide');
            if (hasScreen) {
                el.addClass('screen');
            }
        });

        var
            before = this.slides.slice(0, this.slideNum-1),
            after = this.slides.slice(this.slideNum),
            current = this.slides.eq(this.slideNum-1);

        before.addClass('before');

        after.addClass('after');

        current.addClass('current-slide');

        var prev = current.prev('li.slide');
        for (var i=1; i<6; i++) {
            if (prev.length == 1) {
                prev.addClass('prev-'+i);
                prev = prev.prev('li.slide');
            } else {
                break;
            }
        }

        // all screens are slides, but not all slides are screens
        // we hilight the current screen
        var screen;
        if (current.hasClass('screen')) {
            screen = current;
        } else {
            screen = current.parents('.screen');
        }
        screen.addClass('current-screen');
    },


    // set the hash
    changeSlide: function(num) {
        // poor man's authentication
        if (this.key && this.locked) {
            this.socket.emit('slide', {
                slideNum: num,
                key: this.key
            });
        } else if (this.locked) {
            alert("If the presentation is locked, "+
                  "then only the speaker can advance the slides.");
        } else {
            this.updateHash(num);
        }
    },

    updateHash: function(num) {
        window.location.hash = '#'+num;
    }
};

}).call(this);

