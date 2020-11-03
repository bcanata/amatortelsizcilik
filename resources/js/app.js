require('./bootstrap');
const Swal = require('sweetalert2');
const morse = require('morse-decoder');
// https://github.com/ozdemirburak/morse-decoder

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover({html: true});

    jQuery('a').filter(function() {
        return this.hostname && this.hostname !== location.hostname;
      }).click(function(e) {

        var domain = ["facebook.com", "instagram.com", "reddit.com", "linkedin.com", "twitter.com", "pinterest.com", "telegram.me", "wa.me", "github.com", "amatortelsizcilik.com"];
        var n = domain.includes(this.hostname.replace('www.',''));

        if (n) {
            window.open(this.href);
        } else {
            Swal.fire({
                text: "Harici bir web sitesine gitmek üzeresiniz...",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText : 'İptal Et',
                confirmButtonText: 'Tamam'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open(this.href + '?ref=amatortelsizcilik.com');
                }
            });
        }
        return false;
    });

    jQuery('#searchForm').on('shown.bs.collapse', function () {
        $("#search").focus();
    })

    jQuery('.btn-print').click(function(e){
        window.print();
    });

    jQuery('.btn-show-true').click(function(e){
        jQuery('.btn-show-true, .hide-false-answer').hide();
        jQuery('.btn-show-false').show();
        jQuery.get( $(this).data('href'), function( data ) {
            console.log(data);
        });
    });

    jQuery('.btn-show-false').click(function(e){
        jQuery('.btn-show-true, .hide-false-answer').show();
        jQuery('.btn-show-false').hide();
        jQuery.get( $(this).data('href'), function( data ) {
            console.log(data);
        });
    });

});
