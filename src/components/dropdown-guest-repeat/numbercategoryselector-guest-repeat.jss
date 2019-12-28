/*
 * numbercategoryselector.js
 * Author & copyright (c) 2017: Sakri Koskimies
 *
 * MIT license
 */
(function ($) {

        $.fn.guest2 = function (options) {

            $g2input = $(this);
            $g2originalPlaceholder = $g2input.attr("placeholder");

            var settings = $.extend({
                // Defaults.
                categoryNames: ["Adults", "Children"],
                categoryValues: false,
                minValue: 0,
                maxValue: 10,
                closeOnOutsideClick: true,
                showText: true,
                delimiter: ", ",
                align: "left",
                fade: true,
                useDisplay: true,
                showZero: false,
                callback: function(values){}
            }, options);

            if (!settings.categoryValues) {
                settings.categoryValues = newFilledArray(settings.categoryNames.length, 0);
            }

            $g2parent = createHTML();

            if (settings.closeOnOutsideClick) {
                $(document).mouseup(function (e) {
                    if (!$g2input.is(e.target) && !$g2parent.is(e.target) && $g2parent.has(e.target).length === 0 && !$("div.guest2.display").is(e.target) && $("div.guest2.display").has(e.target).length === 0) {
                        if (settings.fade) {
                            $g2parent.fadeOut(200);
                        } else {
                            $g2parent.hide();
                        }
                    }
                });
            }

            $(this).click(function () {
                switchSelector();
            });

            $(window).resize(function () {
                setPositions();

            });

            function doCallback() {
                if (typeof options.callback == 'function') {
                    var callbackResult = {};
                    for ($g2i = 0; $g2i < settings.categoryNames.length; $g2i++) {
                        callbackResult[settings.categoryNames[$g2i]] = settings.categoryValues[$g2i];
                    }
                    options.callback.call(this, callbackResult);
                }
            }

            function setPositions() {
                switch (settings.align) {
                    case "left":
                        $g2parent.css("top", $g2input.position().top + $g2input.outerHeight());
                        $g2parent.css("left", $g2input.position().left);
                        break;
                    
                }
                if (settings.useDisplay) {
                    $g2display = $("div.guest2.display");
                    $g2display.css("top", $g2input.position().top + 1);
                    $g2display.css("left", $g2input.position().left + 1);
                    $g2display.css("width", $g2input.width() - 1);
                    $g2display.css("height", $g2input.height() - 1);
                }
            }

            $("a.guest2.button.plus").click(function () {
                $g2category = $(this).attr("category");
                if (settings.categoryValues[$g2category] < settings.maxValue) {
                    settings.categoryValues[$g2category]++;
                    $g2num = settings.categoryValues[$g2category];
                    $("div.guest2.value[category='" + $g2category + "']").text($g2num);
                    doCallback();
                    if(settings.categoryValues[$g2category] == settings.maxValue){
                        $(this).addClass("inactive");
                    }else{
                        $(this).removeClass("inactive");
                    }
                    if(settings.categoryValues[$g2category] > settings.minValue){
                        $("a.guest2.button.minus[category='"+$g2category+"']").removeClass("inactive");
                    }else{
                        $("a.guest2.button.minus[category='"+$g2category+"']").addClass("inactive");
                    }
                }
                if (settings.showText) {
                    if (!settings.useDisplay) {
                        updateText();
                    } else {
                        updateElement();
                    }
                }
                return false;
            });

            $("a.guest2.button.minus").click(function () {
                $g2category = $(this).attr("category");
                if (settings.categoryValues[$g2category] > settings.minValue) {
                    settings.categoryValues[$g2category]--;
                    $g2num = settings.categoryValues[$g2category];
                    $("div.guest2.value[category='" + $g2category + "']").text($g2num);
                    doCallback();
                    if(settings.categoryValues[$g2category] == settings.minValue){
                        $(this).addClass("inactive");
                    }else{
                        $(this).removeClass("inactive");
                    }
                    if(settings.categoryValues[$g2category] < settings.maxValue){
                        $("a.guest2.button.plus[category='"+$g2category+"']").removeClass("inactive");
                    }else{
                        $("a.guest2.button.plus[category='"+$g2category+"']").addClass("inactive");
                    }
                }
                if (settings.showText) {
                    if (!settings.useDisplay) {
                        updateText();
                    } else {
                        updateElement();
                    }
                }
                return false;
            });

            function updateElement() {
                $g2input.val("");
                $g2display = $("div.guest2.inlinedisplay");
                $g2display.empty();
                $g2displayelements = 0;
                for ($g2i = 0; $g2i < settings.categoryNames.length; $g2i++) {
                    if (settings.categoryValues[$g2i] != 0 || settings.showZero) {
                        $g2displayelement = $("<div class='guest2 displayelement'></div>").appendTo($g2display);
                        $g2displayelement.text(settings.categoryValues[$g2i] + " " + settings.categoryNames[$g2i] + ", ");
                        $g2displayelements++;
                    }
                }
                if ($g2displayelements == 0) {
                    $g2input.attr("placeholder", $g2originalPlaceholder)
                } else {
                    $g2input.attr("placeholder", "")
                }
                updateText();
            }

            // function updateText() {
            //     $g2text = "";
            //     $g2added = 0;
            //     for ($g2i = 0; $g2i < settings.categoryNames.length; $g2i++) {
            //         if (settings.categoryValues[$g2i] != 0 || settings.showZero) {
            //             if ($g2added != 0) {
            //                 $g2text += settings.delimiter;
            //             }
            //             $g2text += settings.categoryValues[$g2i] + " " + settings.categoryNames[$g2i];
            //             $g2added++;
            //         }
            //     }
            //     $g2input.val($g2text);
            // }
            function updateText() {
                $g2text = "";
                $g2added = 0;
                $g2sum = 0;
                $gbaby =0;
                $glast = settings.categoryNames.length-1;
                for ($g2i = 0; $g2i < settings.categoryNames.length; $g2i++) {
                    if (settings.categoryValues[$g2i] != 0 || settings.showZero) {
                        
                        $g2sum += settings.categoryValues[$g2i];
                        $g2added++;
                    }
                }
                $gbaby+= settings.categoryValues[$glast]
                if($gbaby != 0){
                    //$gtext+=$gsum + " гостя, " + $baby + " младенцы";   Если младенец != гость
                    $g2text+=$g2sum-$gbaby + " гостя, " + $gbaby + " младенцы";
                }else{
                    $g2text += $g2sum + " гостя";}
                
                if ($g2sum == 0) {
                    $g2input.val($g2originalPlaceholder); 
                    $(".NCSG.reset").hide();
                } else {
                    $g2input.val($g2text);
                    $(".NCSG.reset").show();
                }
                
            }


            function createHTML() {

                $g2input.attr("type", "text");
                if (settings.useDisplay) {

                    $g2input.attr("placeholder", "");

                    $g2display = $("<div class='guest2 display'></div>").prependTo("body");
                    $g2display.css("top", $g2input.position().top + 1);
                    $g2display.css("left", $g2input.position().left + 1);
                    $g2display.css("width", $g2input.width() - 1);
                    $g2display.css("height", $g2input.height() - 1);

                    $("<div class='guest2 inlinedisplay'></div>").prependTo($g2display);

                    $g2display.click(function () {
                        switchSelector();
                    });
                }


                $g2parent = $("<div class='guest2 parent'></div>").prependTo("body").hide();

                switch (settings.align) {
                    case "left":
                        $g2parent.css("top", $g2input.position().top + $g2input.outerHeight());
                        $g2parent.css("left", $g2input.position().left);
                        break;
                    
                }

                for ($g2i = 0; $g2i < settings.categoryNames.length; $g2i++) {
                    $g2category = $("<div class='guest2 category'></div>").appendTo($g2parent);
                    $g2text = $("<div class='guest2 text'></div>").appendTo($g2category);
                    $g2name = $("<div class='guest2 name' category='" + $g2i + "'>&nbsp;" + settings.categoryNames[$g2i] + "</div>").appendTo($g2text);
                    $g2buttons = $("<div class='guest2 buttons'></div>").appendTo($g2category);
                    $g2button_minus = $("<a href='' class='guest2 button minus' category='" + $g2i + "'>&#8211;</a>").appendTo($g2buttons);
                    $g2value = $("<div class='guest2 value' category='" + $g2i + "'>" + settings.categoryValues[$g2i] + "</div>").appendTo($g2buttons);
                    $g2button_plus = $("<a href='' class='guest2 button plus' category='" + $g2i + "'>&#43;</a>").appendTo($g2buttons);
                    
                    if(settings.categoryValues[$g2i] == settings.maxValue){
                        $g2button_plus.addClass("inactive");
                    }

                    if(settings.categoryValues[$g2i] == settings.minValue){
                        $g2button_minus.addClass("inactive");
                    }
                }
                $g2close = $("<div class='NCSG room'></div><a class='NCSG close' href=''>Применить</a>").appendTo($g2parent);
                $g2close.click(function () {
                    if (settings.fade) {
                        $g2parent.fadeOut(200);
                    } else {
                        $g2parent.hide();
                    }
                    return false;
                });
                $g2zero = $("<div class='NCSG room'></div><a class='NCSG reset' href=''>Очистить</a>").appendTo($g2parent);
                $g2zero.click(function() {
                for ($g2i = 0; $g2i < settings.categoryNames.length; $g2i++) {
                    if (settings.categoryValues[$g2i] != 0 || settings.showZero) {
                        settings.categoryValues[$g2i] = 0;
                        $("div.guest2.value[category='" + $g2i + "']").text("0");
                        $(".guest2.button.minus").addClass("inactive");
                        doCallback();
                    }
                }
                updateText();
                return false;
            });
                if (settings.showText) {
                    if (!settings.useDisplay) {
                        updateText();
                    } else {
                        updateElement();
                    }
                }

                if (settings.useDisplay) {
                    $g2input.css("color", "transparent");
                }

                return $g2parent;
            }

            

            
            function switchSelector() {
                if (settings.fade) {
                    $g2parent.fadeToggle(200);
                } else {
                    $g2parent.toggle();
                }
            }

            function newFilledArray(len, val) {
                var rv = new Array(len);
                while (--len >= 0) {
                    rv[len] = val;
                }
                return rv;
            }

        }
        ;

    }(jQuery)
)
;