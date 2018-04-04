;(function($){
    var defaults = {
        timeout:4500,
        className:'el-notification',
        title:'',
        content:'',
        useHTML:false,
        icon:'',
        iconType:'success',
        closeIcon:'el-default-close-btn',
        position:'top-right',
        closable:true,
        onClose:null,
        onClick:null,
        offset:16,
        url:''
    };

    var sys = {
        boxClassName:'el-notify-box',
        template:'<div id="{{id}}" class="el-notify-box {{className}} {{direction}}">' +
            　　　　　'{{iconHTML}}'+　　　　
                    '<div class="{{className}}-group">'+
                        '<h2 class="{{className}}-title">{{title}}</h2>'+
                        '<div class="{{className}}-content"><p>{{content}}</p></div>'+
                        '{{closeHTML}}' +
                    '</div>'+
                '</div>',
        closeTemplate:'<div class="{{className}}-close-btn {{closeIcon}}"></div>',
        iconTemplate:'<i class="el-notification-icon {{iconType}} {{icon}}"></i>',
        iconImgTemplate:'<img class="el-icon-img {{iconType}}" src="{{icon}}">'
    };

    var settings = {};
    $.extend(settings, defaults);
    $.extend({
        notify : function (options) {
            var direction = 'right';
            switch(options.position) {
                case 'top-left':
                    direction = 'left';
                    break;
                case 'top-right':
                    direction = 'right';
                    break;
                case 'bottom-left':
                    direction = 'left';
                    break;
                case 'bottom-right':
                    direction = 'right';
                    break;
            }
            options = $.extend(settings, options);
            var closeHTML = '';
            var iconHTML = '';
            if (options.closable) {
                closeHTML = sys.closeTemplate.replace('{{className}}', options.className).replace('{{closeIcon}}', options.closeIcon);
            }
            if (options.icon != '') {
                var iconTypeClassName = 'el-icon-info';
                switch(options.iconType) {
                    case 'success':
                        iconTypeClassName = 'el-icon-success';
                        break;
                    case 'info':
                        iconTypeClassName = 'el-icon-info';
                        break;
                    case 'warning':
                        iconTypeClassName = 'el-icon-warning';
                        break;
                    case 'error':
                        iconTypeClassName = 'el-icon-error';
                        break;
                }
                if (options.icon.indexOf('/') >= 0) {
                    iconHTML = sys.iconImgTemplate.replace('{{icon}}', options.icon).replace('{{iconType}}', iconTypeClassName);
                } else {
                    iconHTML = sys.iconTemplate.replace('{{icon}}', options.icon).replace('{{iconType}}', iconTypeClassName);
                }

            }
            var length = $('.'+options.className).length + 1;
            var id = 'notify-'+length;
            var html = sys.template.replace(/{{className}}/g, options.className)
                .replace('{{iconHTML}}', iconHTML)
                .replace('{{id}}', id)
                .replace('{{direction}}', direction)
                .replace('{{title}}', options.title)
                .replace('{{content}}', options.content)
                .replace('{{closeHTML}}', closeHTML);
            var $obj = $(html);
            $('body').append($obj);
            var height = $obj.outerHeight(true);
            var top = height + options.offset;
            if (length > 1) {
                var $prev = $obj.prev('.'+options.className);
                var prevTop = parseInt($prev.css('top'));
                top += prevTop;
            }
            $obj.css({'top': top, 'zIndex':200+length});
            $('body').off('click', '.'+options.className+'-close-btn').on('click', '.'+options.className+'-close-btn', function(){
                if (options.onClose && typeof options.onClose == 'function') {
                    options.onClose();
                }
                var $parent = $(this).parents('.'+options.className);
                $.notify.close($parent, {len : length, offset:options.offset});
            });
            $('body').off('click', '.'+options.className+'-title,.'+options.className+'-content').on('click', '.'+options.className+'-title,.'+options.className+'-content', function(){
                if (options.onClick && typeof options.onClick == 'function') {
                    options.onClick();
                } else if(options.url != '') {
                    window.location.href = options.url;
                }
            });
            if (options.timeout > 0) {
                setTimeout(function(){
                    $.notify.close(length, {offset : options.offset, height:height});
                }, options.timeout);
            }
        }
    });
    $.notify.close =function(id, options){
        var selector;
        var skip = false;
        options = options || {};
        if (typeof id == 'undefined') {
            selector = $('.'+sys.boxClassName+':last');
            skip = true;
        } else if(typeof id == 'number') {
            selector = $('#notify-'+id);
            options.index = id;
        } else if (typeof id == 'string') {
            selector = $(id);
            if (!options.index) {
                options.index = parseInt(id.replace('#notify-', ''));
            }

        } else if (id instanceof $) {
            selector = id;
            if (!options.index) {
                options.index = parseInt(id.attr('id').replace('notify-', ''));
            }
        }
        if (!skip) {
            if (!options.len) {
                options.len = $('.'+sys.boxClassName).length;
            }
            if (!options.height) {
                options.height = selector.outerHeight(true);
            }
            if (!options.offset) {
                options.offset = 16;
            }
        }
        selector.remove();
        if (options.index >= options.len) {
            return;
        }
        for (var i = options.index + 1; i <= options.len; i++) {
            var $item = $('#notify-'+i);
            var top = parseInt($item.css('top'));
            $item.animate({
                'top':top - options.height - options.offset
            }, 'normal');
        }
    };

    $.notify.closeAll = function(){
        $('.'+sys.boxClassName).each(function(){
            $(this).remove();
        });
    };
})(jQuery);
