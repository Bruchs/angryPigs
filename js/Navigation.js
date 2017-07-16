class Navigation {

    constructor() {

        this.itemToEdit;
        this.cannonItem = $('.item-cannon');
        this.boxItem = $('.item-box');
        this.circleItem = $('.item-circle');
        this.birdItem = $('.item-bird');
        this.applyBtn = $('#apply-btn');
        this.loadLevel = $('#load-level-btn');

        this.itemWidht = $('#item-width');
        this.itemHeight = $('#item-height');
        this.itemMass = $('#item-mass');
        this.itemFriction = $('#item-friction');
        this.itemBounce = $('#item-bounce');

        this.saveLevel = $('#save-level-btn')
        this.arrayItem = [];
        this.birdsCount = 0;
        this.itemsCount = 0;
        this.data;
        this.level = {
            levelName: "",
            levelAuthor: "",
            levelBirds: [],
            levelItems: [],
            levelProjectiles: 0,
            levelBackground: "",
            levelCannon: {
                xPos: 0,
                yPos: 0
            }
        };
    }

    create(event) {

        this.cannonItem.click(() => {

            var actualCannon = this.cannonItem.clone().appendTo($('#editor-game'));
            this.cannonItem.css('display', 'none');

            actualCannon.removeClass("item");
            $('.item-cannon-top').css('top', "-20px");
            $('.item-cannon-top').css('right', "-45px");
            $('.item-cannon-top').css('width', "140px");
            $('.item-cannon-top').css('height', "140px");
            actualCannon.attr("id", "game-cannon").draggable();
            $('#item-name').html("Cannon");
            $("#ul-form").fadeOut("fast");
            this.itemToEdit = actualCannon;
        });

        this.boxItem.click(() => {

            var actualBox = this.boxItem.clone().appendTo($('#editor-game'));
            actualBox.addClass("draggable draggable-item").draggable();
            actualBox.attr('id', "item" + this.itemsCount);
            $('#item-name').html("Box");
            $("#li-height").fadeIn("fast");
            $("#ul-form").fadeIn("fast");
            this.itemToEdit = actualBox;
            this.itemToEdit.data("value", "url(img/box.png)");

            nav.level.levelItems[this.itemsCount] = actualBox;
            this.itemsCount++;
        });


        this.birdItem.click(() => {

            var actualBird = this.birdItem.clone().appendTo($('#editor-game'));
            this.birdItem.css('display', 'none');
            actualBird.addClass("draggable bird-anim").draggable();
            actualBird.attr('id', "bird" + this.birdsCount);
            $('#item-name').html("Bird");
            $("#ul-form").fadeOut("fast");
            nav.level.levelBirds[this.birdsCount] = actualBird;
            this.birdsCount++;
            if (this.birdsCount >= 3)
                this.birdItem.remove();
        });
    }

    itemPersonalization() {
        this.applyBtn.click(() => {
            if (this.itemToEdit != null) {
                if (this.itemToEdit.hasClass("item-box")) {
                    this.itemToEdit.css("width", this.itemWidht.val());
                    this.itemToEdit.css("height", this.itemHeight.val());

                    this.itemToEdit.data("mass", this.itemMass.val());
                    this.itemToEdit.data("friction", this.itemFriction.val());
                    this.itemToEdit.data("bounce", this.itemBounce.val());
                    console.log(this.itemToEdit.val());

                    if ($('#texture-select').val() == "url(img/box.png)") { this.itemToEdit.data("value", "url(img/box.png)"); this.itemToEdit.css("background-image", $('#texture-select').val()) }
                    else if ($('#texture-select').val() == "url(img/box-stone.png)") { this.itemToEdit.data("value", "url(img/box-stone.png)"); this.itemToEdit.css("background-image", $('#texture-select').val()) }
                    else if ($('#texture-select').val() == "url(img/box-metal.png)") { this.itemToEdit.data("value", "url(img/box-metal.png)"); this.itemToEdit.css("background-image", $('#texture-select').val()) }
                    console.log(this.itemToEdit.data("value"));
                }
            }

            if ($('#background-select').val() == "url(img/gameBackground.png)") { $('#editor-game').val("url(img/gameBackground.png)"); $('#editor-game').css("background-image", "url(img/gameBackground.png)"); }
            else if ($('#background-select').val() == "url(img/gameBackground-1.png)") { $('#editor-game').val("url(img/gameBackground-1.png)"); $('#editor-game').css("background-image", "url(img/gameBackground-1.png)"); }
            else if ($('#background-select').val() == "url(img/gameBackground-2.png)") { $('#editor-game').val("url(img/gameBackground-2.png)"); $('#editor-game').css("background-image", "url(img/gameBackground-2.png)"); }
            else if ($('#background-select').val() == "url(img/gameBackground-3.png)") { $('#editor-game').val("url(img/gameBackground-3.png)"); $('#editor-game').css("background-image", "url(img/gameBackground-3.png)"); }

        });
    }

    menuNavigation() {
        var saveBtn = $('#save-btn');
        var loadBtn = $('#load-btn');
        var exitBtn = $('.cancel-btn');
        var newBtn = $('#new-btn');
        var myBackgroundMusic = new buzz.sound("sound/BackgroundMusic.mp3");
        myBackgroundMusic.loop();

        saveBtn.click(() => { $("#editor-save").fadeIn("fast"); $("#editor-load").fadeOut("fast"); });
        loadBtn.click(() => { $("#editor-load").fadeIn("fast"); $("#editor-save").fadeOut("fast"); });
        this.loadLevel.click(() => { myBackgroundMusic.stop(); myBackgroundMusic.play(); });
        exitBtn.click(() => { $("#editor-save").fadeOut("fast"); $("#editor-load").fadeOut("fast"); });
        newBtn.click(() => { location.reload(); })

    }

    itemData() {
        this.saveLevel.click(() => {

            nav.level.levelName = $('#level-name').val();
            nav.level.levelAuthor = $('#level-author').val();
            nav.level.levelCannon.xPos = $('#game-cannon').position().left;
            nav.level.levelCannon.yPos = $('#game-cannon').position().top;
            nav.level.levelProjectiles = $('#item-projectiles').val();
            nav.level.levelBackground = $('#editor-game').val();

            console.log($('#background-select').val());

            for (var i = 0; i <= nav.level.levelBirds.length - 1; i++) {

                var actualBird = ($("#bird" + i + ""));

                let birdObject = {
                    birdId: i,
                    birdWidth: actualBird.css("width"),
                    birdHeight: actualBird.css("height"),
                    birdXPos: actualBird.position().left,
                    birdYPos: actualBird.position().top
                }

                nav.level.levelBirds[i] = birdObject;
            }

            for (var i = 0; i <= nav.level.levelItems.length - 1; i++) {
                var actualItem = ($("#item" + i + ""));

                let itemObject = {
                    itemId: i,
                    itemWidth: ($("#item" + i + "")).css("width"),
                    itemHeight: ($("#item" + i + "")).css("height"),
                    itemXPos: ($("#item" + i + "")).position().left,
                    itemYPos: ($("#item" + i + "")).position().top,
                    itemBack: ($("#item" + i + "")).data("value"),
                    itemDensity: ($("#item" + i + "")).data("mass"),
                    itemFriction: ($("#item" + i + "")).data("friction"),
                    itemBounce: ($("#item" + i + "")).data("bounce"),
                }

                nav.level.levelItems[i] = itemObject;
            }
            console.log(nav.level);
        });
    }
}

let nav = new Navigation();