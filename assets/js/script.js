/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 2, maxerr: 50 */
/*global $, window, document */

$(function () {
  'use strict';

  /*--- Smooth Scrolling ---*/
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  var date = new Date(),
    $nav = $('nav.top-nav'),
    linksHref = [];

//  var $navLinks = $('.nav-links li a'); // Get all li children

/*  for (var i = 0; i < $navLinks.length; i++) {
    var link = $navLinks[i],
      href = $(link).attr('href');
    if (href != '/writing') {
      linksHref.push(href);
    }
  } */

  /*--- Set Copyright year ---*/
  $('.yr-now').html(date.getFullYear().toString());

//   if ($('#home')) {
//     $('a[href*=#home]').addClass("active");
//   }

  $(window).scroll(function () {

    var scrollTop = $(window).scrollTop(),
      windowHeight = $(window).height();


    /*--- Sticky nav bar ---*/
    if (scrollTop >= $('.brand').height()) {
      $nav.addClass("no-pad");
    } else {
      $nav.removeClass("no-pad");
    }

    if (scrollTop >= ($('.hero-intro').offset().top) - 90) {
      $nav.addClass("opaque");
    } else {
      $nav.removeClass("opaque");
    }

    /*---- Active nav element ----*/
/*    for (var i = 0; i < linksHref.length; i++) {
      var href = linksHref[i].replace('/', ''),
        secPosition = $(href).offset().top - 200, // Offset of the section from the top
        secHeight = $(href).outerHeight(); // height of hte section

      if (scrollTop >= secPosition && scrollTop < (secPosition + secHeight)) {
        $('a[href*=' + href + ']').addClass("active");
      } else {
        $('a[href*=' + href + ']').removeClass("active");
      }

    } */

  });


  // Contact form
  var $feedback = $('#form-feedback'),
    $contactForm = $('.contact-form');

  $contactForm.on('keypress', function () {
    $feedback.html('').removeClass('success').removeClass('error');
  })
  // Submit form to formspree
  .on('submit', function (e) {

    e.preventDefault();

    $.ajax({
      url: "//formspree.io/buzzme46@gmail.com",
      method: "POST",
      data: {
        name: $('#name').val(),
        _replyto: $('#_replyto').val(),
        message: $('#message').val()
      },
      dataType: "json"
    })

    .done(function () {
      $feedback.addClass('success').html('Message sent');
      $contactForm[0].reset();
    })

    .fail(function () {
      $feedback.addClass('error').html('Error sending message');
    });

  })
});