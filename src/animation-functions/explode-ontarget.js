const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function explodeOnTarget(handler) {

    function moduleIncludes(test) {
        return !!game.modules.get(test);
    }

    let path00 = moduleIncludes("jb2a_patreon") === true ? `jb2a_patreon` : `JB2A_DnD5e`;

    let type01 = "01";
    switch (true) {
        case (handler.animExVariant.includes("02")):
            type01 = "02";
            break;
    }
    let tmColor = 0x0075B0;

    let color;
    let path01;

    switch (true) {
        case handler.animExVariant === "shatter":
            color = "Blue";
            break;
        default:
            color = "Orange";
    }

    switch (true) {
        case (handler.animExColor.includes("blue")):
            color = "Blue";
            tmColor = 0x0075B0;
            break;
        case (handler.animExColor.includes("green")):
            color = "Green";
            tmColor = 0x0EB400;
            break;
        case (handler.animExColor.includes("orange")):
            color = "Orange";
            tmColor = 0xBF6E00;
            break;
        case (handler.animExColor.includes("purple")):
            color = "Purple";
            tmColor = 0xBF0099;
            break;
        case (handler.animExColor.includes("yellow")):
            color = "Yellow";
            tmColor = 0xCFD204;
            break;
        case (handler.animExColor.includes("red")):
            color = "Red";
            break;
    }

    switch (true) {
        case handler.animExVariant === "shatter":
            path01 = `modules/${path00}/Library/2nd_Level/Shatter/Shatter_01_${color}_400x400.webm`;
            break;
        default:
            path01 = `modules/${path00}/Library/Generic/Explosion/Explosion_${type01}_${color}_400x400.webm`;
    }

    let divisor = 200;
    switch (true) {
        case (handler.animExRadius === "2"):
            divisor = 300;
            break;
        case (handler.animExRadius === "5"):
            divisor = 200;
            break;
        case (handler.animExRadius === "10"):
            divisor = 100;
            break;
        case (handler.animExRadius === "15"):
            divisor = 67;
            break;
        case (handler.animExRadius === "20"):
            divisor = 50;
            break;
        case (handler.animExRadius === "25"):
            divisor = 40;
            break;
        case (handler.animExRadius === "30"):
            divisor = 33;
            break;
        case (handler.animExRadius === "35"):
            divisor = 28.5;
            break;
        case (handler.animExRadius === "40"):
            divisor = 25;
            break;
        case (handler.animExRadius === "45"):
            divisor = 22.2;
            break;
        case (handler.animExRadius === "50"):
            divisor = 20;
            break;
        case (handler.animExRadius === "nuclear"):
            divisor = 10;
            break;
    }

    async function cast() {
        var arrayLength = handler.allTargets.length;
        let loops = handler.animExLoop;

        for (var i = 0; i < arrayLength; i++) {
            let target = handler.allTargets[i];
            let Scale = (canvas.scene.data.grid / divisor);

            // Defines the spell template for FXMaster
            let spellAnim =
            {
                file: path01,
                position: target.center,
                anchor: {
                    x: 0.5,
                    y: 0.5
                },
                angle: 0,
                scale: {
                    x: Scale,
                    y: Scale
                }
            };

            async function SpellAnimation(number) {

                let x = number;
                let interval = 1000;
                for (var i = 0; i < x; i++) {
                    setTimeout(function () {
                        canvas.fxmaster.playVideo(spellAnim);
                        game.socket.emit('module.fxmaster', spellAnim);
                    }, i * interval);
                }
            }
            // The number in parenthesis sets the number of times it loops
            SpellAnimation(loops)
            /*
                    let shockWave =
                        [{
                            filterType: "wave",
                            filterId: "shockWave",
                            autoDestroy: true,
                            time: 0,
                            strength: 0.03,
                            frequency: 15,
                            maxIntensity: 4.0,
                            minIntensity: 0.5,
                            padding: 25,
                            animated:
                            {
                                time:
                                {
                                    loopDuration: 500,
                                    loops: 5,
                                    active: true,
                                    speed: 0.0180,
                                    animType: "move",
                                }
                            }
                        }];
                        */
            //if (game.settings.get("automated-jb2a-animations", "tmfx")) {
            //await wait(400);
            //TokenMagic.addUpdateFiltersOnTargeted(shockWave);
            //await wait(2500);
            //TokenMagic.deleteFiltersOnTargeted("burn");
            //await wait(250);
            //TokenMagic.deleteFiltersOnTargeted("shockWave");
            //}
        }
    }
    cast();
}

export default explodeOnTarget;