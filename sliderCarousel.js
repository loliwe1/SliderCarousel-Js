'use strict';
class SliderCarousel {

    constructor(sliderWrapper, slider, sliderItem, slidesToShow, slidesToScroll = 1, nextSlide, prevSlide, position = 0) {
        this.slidesToScroll = slidesToScroll;
        this.sliderWrapper = document.querySelector(sliderWrapper);
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
            .slider__wrapper-style {
                overflow: hidden;
                width: ${this.sliderItem[0].clientWidth * this.slidesToShow}px;
            }
           .slider-style {
               display: flex;
           } 
           .slider__item-style {
               flex: 0 0 ${100 / this.slidesToShow}%;
               margin: 0;
           }`;

        document.head.append(style);

        this.sliderWrapper.classList.add('slider__wrapper-style');
        this.slider.classList.add('slider-style');

        this.sliderItem.forEach(slide => {
            slide.classList.add('slider__item-style')
        });
    }

    nextSlideF() {
        this.position += 1;
        this.slider.style.transition = `1s all`;
        this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position * this.slidesToScroll}px)`;
    }

    prevSlideF() {
        this.position -= 1;
        this.slider.style.transition = `1s all`;
        this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position * this.slidesToScroll}px)`;
    };

    start() {
        this.sliderStyle();
        this.nextSlide.addEventListener('click', this.nextSlideF.bind(this));
        this.prevSlide.addEventListener('click', this.prevSlideF.bind(this));
    }
}