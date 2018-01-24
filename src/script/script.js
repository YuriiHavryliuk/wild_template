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