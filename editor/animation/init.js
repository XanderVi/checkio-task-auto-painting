//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext.answer;
            var userResult = data.out;
            var result = data.ext.result;
            var result_addon = data.ext.result_addon;


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult) + "<br>" + result_addon);

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + checkioInput[0] + "," + checkioInput[1] + ')');
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + checkioInput[0] + "," + checkioInput[1] + ')');
            }

            var canvas = new PaintingCanvas();
            canvas.prepare($content.find(".explanation")[0], checkioInput[0], checkioInput[1]);
            canvas.animate(userResult);

            this_e.setAnimationHeight($content.height() + 60);

        });

        //This is for Tryit (but not necessary)
//        var $tryit;
//        ext.set_console_process_ret(function (this_e, ret) {
//            $tryit.find(".checkio-result").html("Result<br>" + ret);
//        });
//
//        ext.set_generate_animation_panel(function (this_e) {
//            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
//            $tryit.find('.bn-check').click(function (e) {
//                e.preventDefault();
//                this_e.sendToConsoleCheckiO("something");
//                e.stopPropagation();
//                return false;
//            });
//        });

        function PaintingCanvas(options) {
            options = options || {};

            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var cell = 50;
            var padding = 10;
            var fCell = cell + 2 * padding;

            var attrSystem = {"stroke": colorBlue4, "stroke-width": 4};
            var attrShadow = {"stroke": colorGrey3, "stroke-width": 2, "stroke-dasharray": "-"};
            var attrDetail = {"stroke": colorGrey3, "stroke-width": 2, "fill": colorWhite};
            var attrPainting = {"stroke": colorBlue2, "stroke-width": 2, "fill": colorBlue2};
            var attrStartPaint = {"stroke": colorBlue2, "stroke-width": 2, "fill": colorBlue2, "opacity": 0, "fill-opacity": 0};
            var attrPainted = {"stroke": colorBlue3, "stroke-width": 2, "fill": colorBlue3, "opacity": 1, "fill-opacity": 1};
            var attrOverPainted = {"stroke": colorBlue4, "stroke-width": 2, "fill": colorBlue4};
            var attrNumb = {"stroke": colorOrange4, "fill": colorOrange4, "font-size": cell * 3 / 5, "font-family": "Verdana"};

            var paper;
            var detailSet;
            var shadowPlaces = [];

            var sizeX,
                sizeY;

            var cStart;
            var dStartX;
            var dStartY;

            var row = 5;

            var moveTime = 500;
            var paintTime = 1000;
            var steptime = moveTime * 2 + paintTime + 100;
            var capacity;
            var numb;

            this.prepare = function (dom, capacity, numb) {
                var cx = Math.min(row, capacity);
                var dx = Math.min(row, numb);
                var qx = Math.max(cx, dx);
                var cy = Math.ceil(capacity / row);
                var qy = cy + Math.ceil(numb / row);
                sizeX = qx * fCell;
                sizeY = qy * fCell;
                paper = Raphael(dom, sizeX, sizeY);
                detailSet = paper.set();
                cStart = sizeX / 2 - cx * fCell / 2;
                dStartX = sizeX / 2 - dx * fCell / 2;
                dStartY = cy * fCell;
                paper.rect(cStart, 0,
                    cx * fCell, cy * fCell).attr(attrSystem);
                for (var i = 0; i < capacity; i++) {
                    shadowPlaces.push([
                        (i % row) * fCell + padding + cStart,
                        Math.floor(i / row) * fCell + padding
                    ]);
                    paper.rect(
                        (i % row) * fCell + padding + cStart,
                        Math.floor(i / row) * fCell + padding,
                        cell, cell).attr(attrShadow);
                }
                for (i = 0; i < numb; i++) {
                    var d = paper.set();
                    d.push(paper.rect(0, 0, cell, cell).attr(attrDetail));
                    d.push(paper.rect(0, 0, cell / 2, cell).attr(attrStartPaint));
                    d.push(paper.rect(cell / 2, 0, cell / 2, cell).attr(attrStartPaint));
                    d.push(paper.text(cell / 2, cell / 2, i).attr(attrNumb));
                    d.px = (i % row) * fCell + padding + dStartX;
                    d.py = Math.floor(i / row) * fCell + padding + dStartY;
                    d.paint = 0;
                    detailSet.push(d);
                    d.transform("t" + d.px + "," + d.py);
                }
            };

            this.animate = function(sequence) {
                var acts = sequence.split(",");
                for (var i = 0; i < acts.length; i++) {
                    for (var j = 0; j < acts[i].length; j++) {
                        var symb = Number(acts[i][j]);
                        if (isNaN(symb) || symb >= numb || symb < 0){
                            return false;
                        }
                        if (acts[i].indexOf(symb) !== acts[i].lastIndexOf(symb)) {
                            return false;
                        }
                    }
                    if (acts[i].length > capacity) {
                        return false;
                    }
                    //move in
                    setTimeout(function(step){
                        return function(){
                            for (var k = 0; k < step.length; k++) {
                                var pos = Number(step[k]);
                                detailSet[pos].animate({"transform": "t" + shadowPlaces[k][0] + "," + shadowPlaces[k][1]}, moveTime);
                            }
                        }
                    }(acts[i]), steptime * i);
                    //painting
                    setTimeout(function(step){
                        return function(){
                            for (var k = 0; k < step.length; k++) {
                                var pos = Number(step[k]);
                                var detail = detailSet[pos];
                                if (detail.paint === 0) {
                                    detail[2].animate(attrPainted, paintTime);
                                }
                                else if (detail.paint === 1) {
                                    detail[1].animate(attrPainted, paintTime);
                                }
                                else if (detail.paint === 2) {
                                    detail[1].animate(attrOverPainted, paintTime);
                                }
                                else {
                                    detail[2].animate(attrOverPainted, paintTime);
                                }

                                detail.paint += 1;
                            }
                        }
                    }(acts[i]), steptime * i + moveTime + 100);
                    //move out
                    setTimeout(function(step){
                        return function(){
                            for (var k = 0; k < step.length; k++) {
                                var pos = Number(step[k]);
                                detailSet[pos].animate({"transform": "t" + detailSet[pos].px + "," + detailSet[pos].py}, moveTime);
                            }
                        }
                    }(acts[i]), steptime * i + moveTime + paintTime + 200);
                }
            }
        }


    }
)
;
