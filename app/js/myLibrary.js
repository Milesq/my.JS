var lib;
(function ($) {
    const body = document.getElementsByTagName('body')[0];
    var el = [];
    const myName = 'my';

    el[4] = document.createElement('div');
    el[4].id = myName + 'modalWrapper';
    body.appendChild(el[4]);

    const modaLWrapper = document.querySelector('#' + myName + 'modalWrapper');

    el[3] = document.createElement('div');
    el[3].className = 'no-visibility';
    el[3].id = myName + 'modal';
    body.appendChild(el[3]);
    document.getElementById(myName + 'modal').innerHTML = '<button class="closeButton">Zamknij</button>';

    el[2] = document.createElement('button');
    el[2].className = 'no-visibility';
    el[2].id = 'forClose';
    body.appendChild(el[2]);
    $('#forClose').html('Zamknij');


    el[1] = document.createElement('div');
    el[1].className = 'no-visibility';
    el[1].id = 'dark';
    body.appendChild(el[1]);

    el[0] = document.createElement('div');
    el[0].className = 'no-visibility';
    el[0].id = 'workSpan';
    body.appendChild(el[0]);

    function light() {
        $('#dark').addClass('no-visibility');
    }

    function dark() {
        $('#dark').removeClass('no-visibility');
    }

    function setModalWindow(content, option) {
        dark();
        var setting = {
            backgroundColor: '#FFF5E4',
            color: '#000'
        };
        $.extend(setting, option);
        $('#workSpan')
            .removeClass('no-visibility')
            .html(content)
            .animate({
                height: '80%'
            }, 1000);

        $('#forClose')
            .removeClass('no-visibility')
            .on('click', deleteModalWindow);
    }

    function deleteModalWindow() {

        $('#workSpan')
            .addClass('no-visibility')
            .html('')
            .css('height', '1%');
        $('#forClose').addClass('no-visibility');
        light();
    }

    $('.' + myName + 'ModalWindow') //you can create modal window by: div.ModalWindow > .ModalSettings + .ModalContent ^ button.ModalOpen 
        .each(function () {
            $(this).addClass('no-visibility')
                .attr('id', 'now');
            if (/{+}/.exec($('#now > .' + myName + 'ModalSettings').text()) === null) {
                $('#now > .' + myName + 'ModalSettings').html('{ "color":"#000" }');
            }
            var option = {
                content: $('#now > .' + myName + 'ModalContent').html(),
                settings: ''
            };

            if ($('#now > .' + myName + 'ModalSettings').length !== 0) {
                option.settings = $.parseJSON($('#now > .' + myName + 'ModalSettings').text());
            }

            $('#now + .' + myName + 'ModalOpen')
                .on('click', option,
                    (event) => {
                        setModalWindow(event.data.content, event.data.settings);
                    }
                );
            $('#now').attr('id', '');
        });
    ////////////////////////////////////////myModal you can create modal by:
    function setModal(content, options) { //{ from: 'top', to: 'bottom'}

        function clearPosition(what) {
            what.css({
                top: 'auto',
                bottom: 'auto',
                left: 'auto',
                right: 'auto'
            });
        }
        clearPosition($('#' + myName + 'modal'));

        var settings = {
            from: 'left'
        };

        $.extend(settings, options);

        if (typeof settings.to === 'undefined') {
            settings.to = settings.from;
        }

        let set, setCss;

        if ((settings.from != 'top' && settings.from != 'right' && settings.from != 'bottom' && settings.from != 'left')) {
            settings.from = 'left';
        }

        if ((settings.to != 'top' && settings.to != 'right' && settings.to != 'bottom' && settings.to != 'left')) {
            settings.to = 'left';
        }
        $('#' + myName + 'modal').removeClass('no-visibility')
        //////////////////////////////////////////
        if (settings.from == 'top') {

            setCss = {
                top: '-100vh',
                left: ((window.innerWidth / 2) - parseInt($('#' + myName + 'modal').css('width')) / 2) + 'px'
            };

            set = {
                top: '0px'
            };
        }


        if (settings.from == 'bottom') {

            setCss = {
                bottom: '-100vh',
                left: ((window.innerWidth / 2) - parseInt($('#' + myName + 'modal').css('width')) / 2) + 'px'
            };

            set = {
                bottom: '0px'
            };
        }


        if (settings.from == 'left') {

            setCss = {
                left: '-100vw',
                top: ((window.innerHeight / 2) - parseInt($('#' + myName + 'modal').css('height')) / 2) + 'px'
            };

            set = {
                left: '0px'
            };
        }


        if (settings.from == 'right') {

            setCss = {
                right: '-100vw',
                top: ((window.innerHeight / 2) - parseInt($('#' + myName + 'modal').css('height')) / 2) + 'px'
            };

            set = {
                right: '0px'
            };
        }

        function stop(data) {
            let to, set, setCss;
            (!(typeof data.data.to === 'undefined')) ? to = data.data.to: to = data;

            let x = $('#mymodal');

            if (to == 'top') {

                setCss = {
                    top: '',
                    bottom: $('#' + myName + 'modal').css('bottom')
                };

                set = {
                    bottom: '200vw'
                };
            }

            if (to == 'bottom') {

                setCss = {
                    bottom: '',
                    top: $('#' + myName + 'modal').css('top')
                };

                set = {
                    top: '200vw'
                };
            }

            if (to == 'left') {

                setCss = {
                    left: '',
                    right: $('#' + myName + 'modal').css('right')
                };

                set = {
                    right: '200vw'
                };
            }

            if (to == 'right') {

                setCss = {
                    right: '',
                    left: $('#' + myName + 'modal').css('left')
                };

                set = {
                    left: '200vw'
                };
            }


            $('#' + myName + 'modal')
                .css(setCss)
                //                .html('')
                .animate(set, 2700, () => {
                    $('#mymodal').addClass('no-visibility');
                });
        }

        $('#' + myName + 'modal')
            .html($('#' + myName + 'modal').html() + content)
            .css(setCss)
            .animate(set, 2700);

        $('#' + myName + 'modal > button').on('click', settings, stop);

        return [stop, settings.to];
    }


    //NOTE wydaje mi się że wszystko dobrze
    var x = setModal('abcdef ghijkl mnoprst uwixz', {
        from: 'bottom',
        to: 'right'
    });
    //////////////////////////////////////////
    lib = {
        dark: dark,
        light: light,
        setModal: setModal,
        setModalWindow: setModalWindow,
        deleteModalWindow: deleteModalWindow
    };


})(jQuery);
