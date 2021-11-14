(function($) {

    $.getJSON("api/product.json", function(productDate) {

        // INIT MAIN VITRINE OFFER //
        let mainVitrineDayOfferHTML = "";
        // INIT MAIN VITRINE //
        let mainVitrineHTML = "";

        $.each(productDate[0].items, function(i, value) {

            let getItemQuantityLocalStorage = JSON.parse(localStorage.getItem('productLocalStorage')).product,
                quantityLocalStorage = getItemQuantityLocalStorage.filter(x => x.id === value.id).map(x => x.quantity),
                initLocalStorage = quantityLocalStorage >= 1,

                unavailable = value.available === 0,
                unavailableHide = unavailable ? "display:none;" : "display:block;",
                unavailableBuyButtonText = unavailable ? "INDISPONÍVEL" : "ADICIONAR",
                unavailableBuyButtonColor = unavailable ? "background:#3E4742;" : "background:#008939;",

                sellingPrice = value.sellingPrice.toString().replace(".", ","),
                bestPrice = value.bestPrice.toString().replace(".", ",");

            innerHTML =
                "<div class=\"product\" data-idproduct=" + value.id + ">" +

                "<a href=" + value.linkURL + ">" +
                "<div class=\"flag\">" + value.discount + "% OFF</div>" +
                "<div class=\"image\">" +
                "<img src=" + value.imageURL + ">" +
                "</div>" +
                "<h2> " + value.name + " </h2>" +
                "</a>" +

                "<div class=\"price\">" +
                "<span class=\"sellingprice\">R$" + sellingPrice + "</span>" +
                "<span class=\"bestprice\">R$" + bestPrice + "</span>" +
                "</div>" +

                "<div class=\"select-quantity\">" +
                "<input style=" + unavailableHide + " type=\"button\" value=\"-\" class=\"quantity-less\">" +
                "<input style=" + unavailableHide + " type=\"number\" value=" + (initLocalStorage ? quantityLocalStorage : "0") + " class=\"quantity\">" +
                "<input style=" + unavailableHide + " type=\"button\" value=\"+\" class=\"quantity-more\">" +
                "</div>" +

                "<div class=\"buy-button\" style=" + unavailableBuyButtonColor + ">" + unavailableBuyButtonText + "</div>" +

                "</div>";

            // SET MAIN VITRINE OFFER //
            if (value.dayOffer === true) {
                mainVitrineDayOfferHTML += innerHTML;
            }
            // SET MAIN VITRINE //
            else {
                mainVitrineHTML += innerHTML;
            }

        });

        // RESULT MAIN VITRINE OFFER //
        $("#main-vitrine-promocao").html(mainVitrineDayOfferHTML);
        // RESULT MAIN VITRINE //
        $("#main-vitrine").html(mainVitrineHTML);

    });

})(jQuery);