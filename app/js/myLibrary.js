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
    document.getElementById(myName + 'modal').innerHTML = '<button>Zamknij</button>';

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

        var settings = {
            from: 'left'
        };

        $.extend(settings, options);

        if (typeof settings.to === 'undefined') {
            settings.to = settings.from;
        }

        let set;

        if ((settings.from != 'top' && settings.from != 'right' && settings.from != 'bottom' && settings.from != 'left')) {
            settings.from = 'left';
        }

        if ((settings.to != 'top' && settings.to != 'right' && settings.to != 'bottom' && settings.to != 'left')) {
            settings.to = 'left';
        }

        $('#mymodal').removeClass('no-visibility');

        if (settings.from == 'top') {
            set = {
                top: '0vh'
            };
            $('#' + myName + 'modal')
                .css({
                    left: '',
                    top: '-100vh',
                    right: '50vw',
                    bottom: ''
                });
        }


        if (settings.from == 'bottom') {
            set = {
                bottom: '0vh'
            };
            $('#' + myName + 'modal')
                .css({
                    left: '',
                    top: '',
                    right: '50vw',
                    bottom: '-100vh'
                });
        }


        if (settings.from == 'left') {
            set = {
                left: '0vw'
            };
            $('#' + myName + 'modal')
                .css({
                    left: '-100vh',
                    top: '50vh',
                    right: '',
                    bottom: ''
                });
        }


        if (settings.from == 'right') {
            set = {
                right: '0vw'
            };
            $('#' + myName + 'modal')
                .css({
                    left: '',
                    top: '50vh',
                    right: '-100vh',
                    bottom: ''
                });
        }

        function stop(data) {
            let to, set;
            (!(typeof data.data.to === 'undefined')) ? to = data.data.to: to = data;

            if (to == 'top') {
               $('#' + myName + 'modal')
                    .css({
                        bottom: '',
                        right: '',
                        left: ''
                    });

                set = {
                    top: '-100vh'
                };
            }


            if (to == 'bottom') {
                $('#' + myName + 'modal')
                    .css({
                        top: '',
                        right: '',
                        left: ''
                    });

                set = {
                    bottom: '-100vh'
                };
            }


            if (to == 'left') {console.log('x');
                /* $('#' + myName + 'modal')
                     .css({
                         top: '',
                         bottom: '',
                         right: ''
                     });*/

                set = {
                    left: '-100vw'
                };
            }


            if (to == 'right') {
                $('#' + myName + 'modal')
                    .css({
                        top: '',
                        bottom: '',
                        left: ''
                    });

                set = {
                    right: '-100vw'
                };
            }
            $('#' + myName + 'modal')
                .animate(set, 2700, () => {
                    $('#mymodal').addClass('no-visibility');
                });
        }

        $('#' + myName + 'modal')
            .html($('#' + myName + 'modal').html() + content)
            .animate(set, 2700);

        $('#' + myName + 'modal > button').on('click', settings, stop);

        return [stop, settings.to];
    }

    //    clearPosition('#mymodal');
    //nie działa: top bottom; bottom top; left right; 
    var x = setModal('abcdef ghijkl mnoprst uwixz', {
        from: 'bottom',
        to: 'top'
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
