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

        this.arrCount = this.sliderCount();


    }

    sliderCount() {
        let arr = [];
        this.sliderItem.forEach(slide => {
            arr.push(slide);
        });
        return arr;
    }

    sliderStyle() {
        const style = document.createElement('style');
        style.innerHTML = `
            .slider__wrapper-style {
                // overflow: hidden;
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


    createSlidesCopy() {
        if(this.position === this.arrCount.length - 1) {
            let elem = this.arrCount[this.arrCount.length - 1];
            this.slider.prepend(elem);
            this.position = 0;
            this.slider.style.transition = `none`;
            this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position * this.slidesToScroll}px)`;
            let elem2 = this.arrCount.pop();
            this.arrCount.unshift(elem2);

        }else {
            return;
        }


    }

    createSlidesLastCopy() {
        if(this.position === 0) {
            let elem = this.arrCount[0];
            this.slider.append(elem);
            this.position = this.arrCount.length - 1;
            this.slider.style.transition = `none`;
            this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position * this.slidesToScroll}px)`;
            let elem2 = this.arrCount.shift();
            this.arrCount.push(elem2);

        }else {
            return;
        }
    }


    nextSlideF() {
            this.slider.addEventListener('transitionend', this.createSlidesCopy.bind(this));
            this.position += 1;
            this.slider.style.transition = `1s all`;
            this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position * this.slidesToScroll}px)`;
    }

    prevSlideF() {
        this.slider.addEventListener('transitionend', this.createSlidesLastCopy.bind(this));
        this.position -= 1;
        this.slider.style.transition = `1s all`;
        this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position * this.slidesToScroll}px)`;
    }

    start() {
        this.position += 1;
        this.slider.style.transition = `none`;
        this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position * this.slidesToScroll}px)`;

        this.sliderStyle();
        this.sliderCount();




        this.nextSlide.addEventListener('click', this.nextSlideF.bind(this));
        this.prevSlide.addEventListener('click', this.prevSlideF.bind(this));

    }
}