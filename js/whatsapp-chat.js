(function ($) {
    "use strict";

    var WA_NUMBER = "2348063896199";
    var WA_MESSAGE = "Hello Hope Architects, I would like to discuss a project.";
    var WA_URL = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(WA_MESSAGE);
    var STORAGE_KEY = "hope_wa_chat_dismissed";

    function buildWidget() {
        if ($("#waLiveChat").length) {
            return;
        }

        var html =
            '<div class="wa-live-chat is-idle" id="waLiveChat" aria-live="polite">' +
                '<div class="wa-chat-panel" id="waChatPanel" role="dialog" aria-label="WhatsApp live chat">' +
                    '<div class="wa-chat-card">' +
                        '<div class="wa-chat-header">' +
                            '<button type="button" class="wa-chat-close" id="waChatClose" aria-label="Close chat">' +
                                '<i class="fas fa-times"></i>' +
                            '</button>' +
                            '<div class="wa-chat-agent">' +
                                '<div class="wa-chat-avatar">' +
                                    '<i class="fab fa-whatsapp"></i>' +
                                    '<span class="wa-chat-status-dot" aria-hidden="true"></span>' +
                                '</div>' +
                                '<div class="wa-chat-meta">' +
                                    '<h4>Hope Architects</h4>' +
                                    '<p><i class="fas fa-circle" style="font-size:7px;color:#4ade80;margin-right:6px;"></i>Online — replies within minutes</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="wa-chat-body">' +
                            '<div class="wa-chat-bubble">' +
                                'Hi there! 👋 Ready to bring your architectural vision to life? Chat with us on WhatsApp for a fast, personal response.' +
                                '<div class="wa-chat-typing" aria-hidden="true">' +
                                    '<span></span><span></span><span></span>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="wa-chat-footer">' +
                            '<a class="wa-chat-cta" id="waChatStart" href="' + WA_URL + '" target="_blank" rel="noopener noreferrer">' +
                                '<i class="fab fa-whatsapp"></i> Start Live Chat' +
                            '</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="wa-float-scene" id="waFloatScene">' +
                    '<span class="wa-float-ring wa-float-ring--1"></span>' +
                    '<span class="wa-float-ring wa-float-ring--2"></span>' +
                    '<span class="wa-float-tooltip">Chat with us on WhatsApp</span>' +
                    '<button type="button" class="wa-float-btn" id="waFloatBtn" aria-label="Open WhatsApp live chat" aria-expanded="false" aria-controls="waChatPanel">' +
                        '<span class="wa-float-btn__body"></span>' +
                        '<span class="wa-float-btn__shine"></span>' +
                        '<span class="wa-float-btn__icon"><i class="fab fa-whatsapp"></i></span>' +
                        '<span class="wa-float-btn__shadow"></span>' +
                        '<span class="wa-float-badge">1</span>' +
                    '</button>' +
                '</div>' +
            '</div>';

        $("body").append(html);
    }

    function setOpen(isOpen) {
        var $root = $("#waLiveChat");
        var $panel = $("#waChatPanel");
        var $btn = $("#waFloatBtn");

        $panel.toggleClass("is-open", isOpen);
        $root.toggleClass("is-open", isOpen).removeClass("is-idle");
        $btn.attr("aria-expanded", isOpen ? "true" : "false");

        if (isOpen) {
            sessionStorage.setItem(STORAGE_KEY, "1");
        }
    }

    function bindTilt() {
        var $scene = $("#waFloatScene");
        var $btn = $("#waFloatBtn");
        var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reducedMotion || !$scene.length) {
            return;
        }

        $scene.on("mousemove", function (e) {
            var rect = this.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;

            $btn.css(
                "transform",
                "rotateX(" + (-y * 22) + "deg) rotateY(" + (x * 22) + "deg) translateY(-4px)"
            );
        });

        $scene.on("mouseleave", function () {
            $btn.css("transform", "");
        });
    }

    function initWhatsAppChat() {
        buildWidget();
        bindTilt();

        var dismissed = sessionStorage.getItem(STORAGE_KEY);

        $("#waFloatBtn").on("click", function (e) {
            e.stopPropagation();
            var isOpen = $("#waChatPanel").hasClass("is-open");
            setOpen(!isOpen);
        });

        $("#waChatClose").on("click", function (e) {
            e.stopPropagation();
            setOpen(false);
        });

        $(document).on("click", function (e) {
            if (!$(e.target).closest("#waLiveChat").length) {
                setOpen(false);
            }
        });

        if (!dismissed) {
            window.setTimeout(function () {
                if (!sessionStorage.getItem(STORAGE_KEY) && !$("#waChatPanel").hasClass("is-open")) {
                    setOpen(true);
                }
            }, 4500);
        }
    }

    $(initWhatsAppChat);
})(jQuery);
