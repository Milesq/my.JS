var lib;
(function ($) {
    var body = document.getElementsByTagName('body')[0];
    var el = [];
    var /*const*/ myName = 'my';

    el[3] = document.createElement('div');
    el[3].id = myName + 'modal';
    body.appendChild(el[3]);

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
                    function (event) {
                        setModalWindow(event.data.content, event.data.settings);
                    }
                );
            $('#now').attr('id', '');
        });
    ////////////////////////////////////////myModal you can create modal by: div.Modal > .ModalSettings + .ModalContent ^ button.ModalOpen
    function setModal(options) { //{ from: 'top', to: 'bottom'}
        var settings = {
            from: 'left'
        };
        $.extend(settings, options);
        if (typeof settings.to === 'undefined') {
            settings.to = settings.from;
        }

        var set;

        if (settings.from == 'top') set = {
            top: '0vw'
        };
        if (settings.from == 'bottom') set = {
            bottom: '0vw'
        };
        if (settings.from == 'left') set = {
            left: '0vw'
        };
        if (settings.from == 'right') set = {
            right: '0vw'
        };
        console.log(set);
        $('#' + myName + 'modal').animate(set, 2700);

    };
    setModal({
        from: 'left'
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
