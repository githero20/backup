$('.minimize-menu').click(function () {
   $('.navbar-collapse').fadeOut(300);
});

$('.navbar-toggler').click(function () {
    $('.navbar-collapse').toggle('slide',300);
    $(this).toggleClass('is-active');

});


// owl carousel for partners
$(document).ready(function(){

    $('body').show();
    // $('#spinner').hide();

    var $owl = $('.owl-carousel');

    $owl.on('initialized.owl.carousel resized.owl.carousel', function(e) {
        $(e.target).toggleClass('hide-nav', e.item.count <= e.page.size);
    });

    $owl.owlCarousel({
        loop:true,
        autoplay: 1000,
        autoplayTimeout:5000,
        dots: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:false,
                dots:true,
            },
            600:{
                items:3,
                nav:false,
                dots:true,

            },
            1000:{
                items:5,
                nav:false,
                dots:true,
            }
        }
    })
});

$('#referral-btn').click(function () {
    $('#referal-input-container').slideDown(300);
    $(this).text('Enter referral code here');
});

//materialize select


$(document).ready(function(){
    $('select').formSelect();
});