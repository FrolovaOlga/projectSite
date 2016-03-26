/* 
  Description: Animates the header upon scroll
  
*/
 /*КОД ДЛЯ МЕНЮ*/
$(function(){
  var header = $("header"),
      yOffset = 0,
      triggerPoint = 150;
  $(window).scroll(function(){
    yOffset = $(window).scrollTop();
    
    if(yOffset >= triggerPoint){
      header.addClass("minimized");
    }else{
      header.removeClass("minimized");
    }
    
  });
});


 /*КОД ДЛЯ ВКЛАДОК*/
$(document).ready(function() { 

    (function ($) { 
        $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
        
        $('.tab ul.tabs li a').click(function (g) { 
            var tab = $(this).closest('.tab'), 
                index = $(this).closest('li').index();
            
            tab.find('ul.tabs > li').removeClass('current');
            $(this).closest('li').addClass('current');
            
            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
            tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
            
            g.preventDefault();
        } );
    })(jQuery);

});



/*КОД ДЛЯ СЛАЙДЕРА*/
var $slider = $(".slider"), $bullets = $(".bullets");
    function calculateHeight(){
      var height = $(".slide.active").outerHeight();
      $slider.height(height);
    }

    $(window).resize(function() {
      calculateHeight();
        clearTimeout($.data(this, 'resizeTimer'));
    });
    
    function resetSlides(){
      $(".slide.inactive").removeClass("inactiveRight").removeClass("inactiveLeft");
    }

    function gotoSlide($activeSlide, $slide, className){
       $activeSlide.removeClass("active").addClass("inactive "+className);
       $slide.removeClass("inactive").addClass("active");
       calculateHeight();
       resetBullets();
       setTimeout(resetSlides, 300);
    }

    $(".next").on("click", function(){
       var $activeSlide = $(".slide.active"),
         $nextSlide = $activeSlide.next(".slide").length != 0 ? $activeSlide.next(".slide") : $(".slide:first-child");
         console.log($nextSlide);
         gotoSlide($activeSlide, $nextSlide, "inactiveLeft");
    });
    $(".previous").on("click",  function(){
       var $activeSlide = $(".slide.active"),
         $prevSlide = $activeSlide.prev(".slide").length != 0 ? $activeSlide.prev(".slide") : $(".slide:last-child");

         gotoSlide($activeSlide, $prevSlide, "inactiveRight");
    });
    $(document).on("click", ".bullet", function(){
      if($(this).hasClass("active")){
        return;
      }
      var $activeSlide = $(".slide.active");
      var currentIndex = $activeSlide.index();
      var targetIndex = $(this).index();
      console.log(currentIndex, targetIndex);
      var $theSlide = $(".slide:nth-child("+(targetIndex+1)+")");
      gotoSlide($activeSlide, $theSlide, currentIndex > targetIndex ? "inactiveRight" : "inactiveLeft");
    })
    function addBullets(){
      var total = $(".slide").length, index = $(".slide.active").index();
      for (var i=0; i < total; i++){
        var $bullet = $("<div>").addClass("bullet");
        if(i==index){
          $bullet.addClass("active"); 
        }
        $bullets.append($bullet);
      }
    }
    function resetBullets(){
      $(".bullet.active").removeClass("active");
      var index = $(".slide.active").index()+1;
      console.log(index);
      $(".bullet:nth-child("+index+")").addClass("active");
    }
    addBullets();
    calculateHeight();