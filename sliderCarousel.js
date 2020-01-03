'use strict';
class SliderCarousel {

    constructor(slider, sliderItem, slidesToShow, nextSlide, prevSlide, position = 0) {
        this.slider = document.querySelector(slider);
        this.sliderItem = document.querySelectorAll(sliderItem);
        this.slidesToShow = slidesToShow;
        this.nextSlide = document.querySelector(nextSlide);
        this.prevSlide = document.querySelector(prevSlide);
        this.position = position;
    }

    sliderStyle() {
        const style = document.createElement('style');
        style.innerHTML = `
           .slider-style {
               display: flex;
               overflow: hidden;
               width: ${this.sliderItem[0].clientWidth * this.slidesToShow}px;
               flex-grow: 1;
           } 
           .slider__item-style {
               flex: 0 0 ${100 / this.slidesToShow}%;
               margin: 0;
           }`;
        
        document.head.append(style);
        this.slider.classList.add('slider-style');

        this.sliderItem.forEach(slide => {
            slide.classList.add('slider__item-style')
        });

       

    }

    nextSlideF() {
        this.position += 1;
        this.slider.style.transition = `1s all`;
        this.slider.style.transform = `translateX(${this.sliderItem[0].clientWidth * position})`;
        console.log(position)
    }

    prevSlideF() {
        this.position -= 1;
        this.slider.style.transition = `1s translate`;
        this.slider.style.transform = `translateX(${this.sliderItem[0].clientWidth * position})`;
        console.log(position)
    };

    start() {
        this.sliderStyle();
        this.nextSlide.addEventListener('click', this.nextSlideF);
        this.prevSlide.addEventListener('click', this.prevSlideF);

        
    }


}