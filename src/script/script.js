	//Смена изображений секция 1
	$('.images__item').click(function(){

		var srcBigImg = $('.images__item--big').attr('src');
		var altBigImg = $('.images__item--big').attr('alt');

		$('.images__item--big').attr("src", this.src);
		$('.images__item--big').attr("alt", this.alt);
		$(this).attr("src", srcBigImg);
		$(this).attr("alt", altBigImg);

	});

	//slick слайдер

		$(document).ready(function(){
    $(".slider").slick({ // slider initialization
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        zIndex: 0,
        //centerMode: true,
        arrows: false,
    });
	});

    // START ODOMETER COUNT //
    $.each($('.odometer'), function(index, value) { // reset to zero
        $(value).text('0')
    });

    $('.section__odometr').on('mouseover', function () {
        var dataStat = {
            odo1: 714
        };
        $.each(dataStat, function(key, value) {
            $('#'+key).text(value);
        })
    });
    // END ODOMETER COUNT //


