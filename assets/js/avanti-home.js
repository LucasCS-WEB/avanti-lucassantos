let Avanti_Home = {

    methods: {

        addMoreItemsCartAndValidateAvailable: function() {

            $('.quantity-more').click(function() {

                let quantity = $(this).siblings('.quantity').val();
                quantity++;
                $(this).siblings('.quantity').val(quantity);

                let idProduct = $(this).parent().parent().attr("data-idproduct");

                $.getJSON("./api/product.json", function(productDate) {
                    $.each(productDate[0].items, function(i, value) {
                        if (value.id == idProduct) {
                            if (quantity >= value.available) {
                                $('[data-idproduct="' + idProduct + '"]').children('.select-quantity').children('.quantity').val(value.available);
                                alert('Apenas ' + value.available + ' disponível');
                            }
                        }
                    });
                });

            });

        },

        addLessItemsCart: function() {

            $('.quantity-less').click(function() {

                let quantity = $(this).siblings('.quantity').val();

                if (quantity >= 1) {

                    quantity--;
                    $(this).siblings('.quantity').val(quantity);

                }

            });

        },

        addItemsKeyCartAndValidatesAvailable: function() {

            $('.quantity').keyup(function() {

                let quantity = $(this).val();

                let idProduct = $(this).parent().parent().attr("data-idproduct");

                $.getJSON("./api/product.json", function(productDate) {
                    $.each(productDate[0].items, function(i, value) {
                        if (value.id == idProduct) {
                            if (quantity >= value.available) {
                                $('[data-idproduct="' + idProduct + '"]').children('.select-quantity').children('.quantity').val(value.available);
                                alert('Apenas ' + value.available + ' disponível');
                            }
                        }
                    });
                });

            });

        },

        addAndUpdateItemsCartProductLocalStorage: function() {

            $('.buy-button').click(function() {

                buyButtonText = $(this).text();

                let idProduct = $(this).parent().attr("data-idproduct");

                let quantity = parseInt($('[data-idproduct="' + idProduct + '"]').children('.select-quantity').children('.quantity').val());

                if (quantity === 0 & buyButtonText === "ADICIONAR") {
                    alert("Selecione a quantidade de Itens")
                }

                if (quantity > 0 & buyButtonText === "ADICIONAR") {
                    alert("Carrinho Atualizado")
                }

                if (localStorage.hasOwnProperty("productLocalStorage") === true) {

                    let objectIndexProductLocalStorage = JSON.parse(localStorage.getItem('productLocalStorage')).product.findIndex(object => object.id === idProduct);

                    if (objectIndexProductLocalStorage > 0) {

                        const updatedProductLocalStorageObject = {
                            ...JSON.parse(localStorage.getItem('productLocalStorage')).product[objectIndexProductLocalStorage],
                            quantity: quantity
                        };

                        const updatedProductLocalStorage = [
                            ...JSON.parse(localStorage.getItem('productLocalStorage')).product.slice(0, objectIndexProductLocalStorage),
                            updatedProductLocalStorageObject,
                            ...JSON.parse(localStorage.getItem('productLocalStorage')).product.slice(objectIndexProductLocalStorage + 1)
                        ];

                        localStorage.setItem('productLocalStorage', JSON.stringify({
                            "product": updatedProductLocalStorage
                        }));

                    } else {

                        getItemProductLocalStorage = JSON.parse(localStorage.getItem('productLocalStorage'));

                        getItemProductLocalStorage['product'].push({
                            "id": idProduct,
                            "quantity": quantity
                        });

                        localStorage.setItem('productLocalStorage', JSON.stringify(getItemProductLocalStorage));
                    }

                }

            });

        },

        amountItemsCartProductLocalStorage: function() {

            $('.amount-items').text(JSON.parse(localStorage.getItem('productLocalStorage')).product.reduce((sum, value) => sum + value.quantity, 0))

            $('.buy-button').click(function() {
                $('.amount-items').text(JSON.parse(localStorage.getItem('productLocalStorage')).product.reduce((sum, value) => sum + value.quantity, 0))
            });

        },

        slickSlider: function() {

            $('.slider-main-vitrine-promocao').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                responsive: [{
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });

            $('.slider-main-vitrine').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                responsive: [{
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 426,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });

        },

        menuMobile: function() {

            let slide_wrp = ".side-menu-wrapper";
            let open_button = ".hamburguer-btn";
            let close_button = ".menu-close";
            let overlay = ".menu-overlay";

            $(open_button).click(function(e) {
                e.preventDefault();
                $(".btn").addClass('active');
            });

            $(slide_wrp).hide().css({
                "right": -$(slide_wrp).outerWidth() + 'px'
            }).delay(50).queue(function() {
                $(slide_wrp).show()
            });

            $(open_button).click(function(e) {
                e.preventDefault();
                $(slide_wrp).css({
                    "right": "0px"
                });
                setTimeout(function() {
                    $(slide_wrp).addClass('active');
                }, 50);
                $(overlay).css({
                    "opacity": "1",
                    "width": "100%"
                });
            });

            $(close_button).click(function(e) {
                e.preventDefault();
                $(".btn").removeClass('active');
                $(slide_wrp).css({
                    "right": -$(slide_wrp).outerWidth() + 'px'
                });
                setTimeout(function() {
                    $(slide_wrp).removeClass('active');
                }, 50);
                $(overlay).css({
                    "opacity": "0",
                    "width": "0"
                });
            });

            $(document).on('click', function(e) {
                if (!e.target.closest(slide_wrp) && $(slide_wrp).hasClass("active")) {
                    $(".btn").removeClass('active');
                    $(slide_wrp).css({
                        "right": -$(slide_wrp).outerWidth() + 'px'
                    }).removeClass('active');
                    $(overlay).css({
                        "opacity": "0",
                        "width": "0"
                    });
                }
            });

        },

        scroll: function() {

            $(window).scroll(function() {
                if ($(window).scrollTop() > $('.main-banner:nth-child(1n)').position().top) {
                    $("#fixed-top").addClass("fixed-top fixed-top-keyframes");
                } else {
                    $("#fixed-top").removeClass("fixed-top fixed-top-keyframes");
                }
                if ($(window).scrollTop() > 0) {
                    $(".promocaododia").addClass("parkinson-keyframes");
                } else {
                    $(".promocaododia").removeClass("parkinson-keyframes");
                }
                if ($(window).scrollTop() > 800) {
                    $(".osmaisvendidos").addClass("parkinson-keyframes");
                } else {
                    $(".osmaisvendidos").removeClass("parkinson-keyframes");
                }
            });

        },

        init: function() {
            this.addMoreItemsCartAndValidateAvailable(),
                this.addLessItemsCart(),
                this.addItemsKeyCartAndValidatesAvailable(),
                this.addAndUpdateItemsCartProductLocalStorage(),
                this.amountItemsCartProductLocalStorage(),
                this.slickSlider(),
                this.menuMobile(),
                this.scroll()
        }

    },

    mounted: function() {
        return this.methods.init()
    }

};

$(document).ready(function() {
    setTimeout(function() {
        Avanti_Home.mounted();
    }, 1000);
});
