$(document).ready(function() {

    let Avanti_Home = {
        //////////////////////
        // CREATE FUNCTIONS //
        //////////////////////
        methods: {
            // ADD MORE ITEMS IN CART/LOCALSTORAGE AND CHECK AVAILABILITY //
            addMoreItemsCartAndValidateAvailable: function() {
                $(".quantity-more").click(function() {

                    let quantity = $(this).siblings(".quantity").val();
                    quantity++;
                    $(this).siblings(".quantity").val(quantity);

                    let idProduct = $(this).parent().parent().attr("data-idproduct");

                    $.getJSON("./api/product.json", function(productDate) {
                        $.each(productDate[0].items, function(i, value) {
                            if (value.id == idProduct) {
                                if (quantity >= value.available) {
                                    $('[data-idproduct="' + idProduct + '"]')
                                        .children(".select-quantity")
                                        .children(".quantity")
                                        .val(value.available);
                                    alert("Apenas " + value.available + " disponível");
                                };
                            };
                        });
                    });

                });
            },

            // ADD LESS ITEMS IN CART //
            addLessItemsCart: function() {
                $(".quantity-less").click(function() {

                    let quantity = $(this).siblings(".quantity").val();

                    if (quantity >= 1) {
                        quantity--;
                        $(this).siblings(".quantity").val(quantity);
                    }

                });
            },

            // INPUT AMOUNT OF ITEMS IN CART/LOCALSTORAGE AND CHECK AVAILABILITY //
            addItemsKeyCartAndValidatesAvailable: function() {
                $(".quantity").keyup(function() {

                    let quantity = $(this).val();

                    let idProduct = $(this).parent().parent().attr("data-idproduct");

                    $.getJSON("./api/product.json", function(productDate) {
                        $.each(productDate[0].items, function(i, value) {
                            if (value.id == idProduct) {
                                if (quantity >= value.available) {
                                    $('[data-idproduct="' + idProduct + '"]')
                                        .children(".select-quantity")
                                        .children(".quantity")
                                        .val(value.available);
                                    alert("Apenas " + value.available + " disponível");
                                }
                            }
                        });
                    });

                });
            },

            // UPDATE ITEMS IN CART/LOCALSTORAGE //
            addAndUpdateItemsCartProductLocalStorage: function() {
                $(".buy-button").click(function() {

                    let buyButtonText = $(this).text();
                    let idProduct = $(this).parent().attr("data-idproduct");

                    let quantity = parseInt(
                        $('[data-idproduct="' + idProduct + '"]')
                        .children(".select-quantity")
                        .children(".quantity")
                        .val()
                    );

                    if ((quantity === 0) & (buyButtonText === "ADICIONAR")) {
                        alert("Selecione a quantidade de Itens");
                    };

                    if ((quantity > 0) & (buyButtonText === "ADICIONAR")) {
                        alert("Carrinho Atualizado");
                    };

                    if (localStorage.hasOwnProperty("productLocalStorage") === true) {

                        let objectIndexProductLocalStorage = JSON.parse(
                            localStorage.getItem("productLocalStorage")
                        ).product.findIndex((object) => object.id === idProduct);

                        if (objectIndexProductLocalStorage > 0) {
                            const updatedProductLocalStorageObject = {
                                ...JSON.parse(localStorage.getItem("productLocalStorage"))
                                .product[objectIndexProductLocalStorage],
                                quantity: quantity,
                            };

                            const updatedProductLocalStorage = [
                                ...JSON.parse(
                                    localStorage.getItem("productLocalStorage")
                                ).product.slice(0, objectIndexProductLocalStorage),
                                updatedProductLocalStorageObject,
                                ...JSON.parse(
                                    localStorage.getItem("productLocalStorage")
                                ).product.slice(objectIndexProductLocalStorage + 1),
                            ];

                            localStorage.setItem(
                                "productLocalStorage",
                                JSON.stringify({
                                    product: updatedProductLocalStorage,
                                })
                            );
                        } else {
                            getItemProductLocalStorage = JSON.parse(
                                localStorage.getItem("productLocalStorage")
                            );

                            getItemProductLocalStorage["product"].push({
                                id: idProduct,
                                quantity: quantity,
                            });

                            localStorage.setItem(
                                "productLocalStorage",
                                JSON.stringify(getItemProductLocalStorage)
                            );

                        }
                    };

                });
            },

            // AMOUNT OF CART ITEMS - HEADER //
            amountItemsCartProductLocalStorage: function() {
                $(".amount-items").text(
                    JSON.parse(
                        localStorage.getItem("productLocalStorage")
                    ).product.reduce(
                        (sum, value) => sum + value.quantity,
                        0
                    )
                );

                $(".buy-button").click(function() {
                    $(".amount-items").text(
                        JSON.parse(
                            localStorage.getItem("productLocalStorage")
                        ).product.reduce((sum, value) => sum + value.quantity, 0)
                    );
                });
            },

            // PLUGIN SLICKSLIDER MAIN //
            slickSlider: function() {
                // SLICK - HOME VITRINE PROMOCAO //
                $(".slider-main-vitrine-promocao").slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    responsive: [{
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    }, ],
                });

                // SLICK - HOME VITRINE //
                $(".slider-main-vitrine").slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    responsive: [{
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                            },
                        },
                        {
                            breakpoint: 426,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            },
                        },
                    ],
                });
            },

            // NAV MOBILE //
            menuMobile: function() {

                let slide_wrp = ".side-menu-wrapper",
                    open_button = ".hamburguer-btn",
                    close_button = ".menu-close",
                    overlay = ".menu-overlay";

                // EFFECT BUTTON-HAMBURGUER ACTIVE //
                $(open_button).click(function(e) {

                    e.preventDefault();

                    $(".btn").addClass("active");

                });

                // EFFECT NAV-MOBILE //
                $(slide_wrp)
                    .hide()
                    .css({
                        right: -$(slide_wrp)
                            .outerWidth() + "px",
                    })
                    .delay(50)
                    .queue(function() {
                        $(slide_wrp).show();
                    });

                // BUTTON OPEN NAV-MOBILE //
                $(open_button).click(function(e) {

                    e.preventDefault();

                    $(slide_wrp).css({
                        right: "0px",
                    });

                    setTimeout(function() {
                        $(slide_wrp).addClass("active");
                    }, 50);

                    $(overlay).css({
                        opacity: "1",
                        width: "100%",
                    });

                });

                // BUTTON CLOSE NAV-MOBILE //
                $(close_button).click(function(e) {

                    e.preventDefault();

                    $(".btn").removeClass("active");

                    $(slide_wrp).css({
                        right: -$(slide_wrp).outerWidth() + "px",
                    });

                    setTimeout(function() {
                        $(slide_wrp).removeClass("active");
                    }, 50);

                    $(overlay).css({
                        opacity: "0",
                        width: "0",
                    });

                });

                // CLOSE NAV-MOBILE CLICKING ON THE BODY //
                $(document).on("click", function(e) {
                    if (!e.target.closest(slide_wrp) && $(slide_wrp).hasClass("active")) {

                        $(".btn").removeClass("active");

                        $(slide_wrp)
                            .css({
                                right: -$(slide_wrp).outerWidth() + "px",
                            })
                            .removeClass("active");

                        $(overlay).css({
                            opacity: "0",
                            width: "0",
                        });

                    }
                });

            },

            // SCROLL MAIN //
            scroll: function() {
                $(window).scroll(function() {

                    // FIXED TOP HEADER -  IF DESKTOP //
                    if ($(window).scrollTop() > $(".main-banner:nth-child(1n)").position().top) {
                        $("#fixed-top").addClass("fixed-top fixed-top-keyframes");
                    } else {
                        $("#fixed-top").removeClass("fixed-top fixed-top-keyframes");
                    };

                    // TITLE - PROMOCAO DIA //
                    if ($(window).scrollTop() > 0) {
                        $(".promocaododia").addClass("parkinson-keyframes");
                    } else {
                        $(".promocaododia").removeClass("parkinson-keyframes");
                    };

                    // TITLE - MAIS VENDIDOS //
                    if ($(window).scrollTop() > 800) {
                        $(".osmaisvendidos").addClass("parkinson-keyframes");
                    } else {
                        $(".osmaisvendidos").removeClass("parkinson-keyframes");
                    };

                });
            },

            // REMOVE LOADING //
            removeLoading: function() {
                $(".loading").fadeOut("slow");
            },

            ////////////////////
            // INIT FUNCTIONS //
            ////////////////////
            init: function() {
                this.addMoreItemsCartAndValidateAvailable(),
                    this.addLessItemsCart(),
                    this.addItemsKeyCartAndValidatesAvailable(),
                    this.addAndUpdateItemsCartProductLocalStorage(),
                    this.amountItemsCartProductLocalStorage(),
                    this.slickSlider(),
                    this.menuMobile(),
                    this.scroll(),
                    this.removeLoading();
            },
        },

        mounted: function() {
            return this.methods.init();
        }
    };

    setTimeout(() => {
        Avanti_Home.mounted();
    }, 400);

});