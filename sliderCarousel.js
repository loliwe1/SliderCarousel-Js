'use strict';
class SliderCarousel {

    constructor({
        sliderWrapper,
        slider,
        sliderItem,
        slidesToShow = 1,
        slidesToScroll = 1,
        nextSlide = false,
        prevSlide = false,
        position = 0,
        dots = true,
    }) {
        this.slidesToScroll = slidesToScroll;
        this.sliderWrapper = document.querySelector(sliderWrapper);
        this.slider = document.querySelector(slider);
        this.sliderItem = document.querySelectorAll(sliderItem);
        this.slidesToShow = slidesToShow;
        this.nextSlide = document.querySelector(nextSlide);
        this.prevSlide = document.querySelector(prevSlide);
        this.position = position;
        this.dots = dots;

        this.sliderItems = this.saveSlides();
        this.counter = 0;

    }

    saveSlides() {
        let arr = [];
        for (let i = 0; i < this.sliderItem.length; i++) {
            arr.push(this.sliderItem[i]);
        }
        return arr;
    }

    createNextButton() {
        if (!this.nextSlide) {
            let nextButton = document.createElement('button');
            nextButton.classList.add('slider__next-style');
            nextButton.innerHTML = `next`;
            nextButton.style.width = '50px';
            nextButton.style.height = '35px';
            this.sliderWrapper.append(nextButton);
            this.nextSlide = nextButton;
        }
    }

    createPrevButton() {
        if (!this.prevSlide) {
            let prevButton = document.createElement('button');
            prevButton.classList.add('slider__prev-style');
            prevButton.innerHTML = `prev`;
            prevButton.style.width = '50px';
            prevButton.style.height = '35px';
            this.sliderWrapper.append(prevButton);
            this.prevSlide = prevButton;
        }
    }

    sliderStyle() {
        const style = document.createElement('style');
        style.innerHTML = `
            .slider__wrapper-style {
                overflow: hidden;
                width: ${this.sliderItem[0].clientWidth * this.slidesToShow}px;
                position: relative;
            }
           .slider-style {
               display: flex;
           } 
           .slider__item-style {
               flex: 0 0 ${100 / this.slidesToShow}%;
               margin: 0;
           }
           .slider__prev-style {
            position: absolute;
            top: ${this.sliderItem[0].clientHeight / 2 - this.nextSlide.offsetHeight / 2}px;
            left: 0;
            outline: none;
            cursor: pointer;
           }
           .slider__next-style {
            position: absolute;
            top: ${this.sliderItem[0].clientHeight / 2 - this.prevSlide.offsetHeight / 2}px;
            left: ${this.sliderItem[0].clientWidth * this.slidesToShow - this.prevSlide.offsetWidth }px;
            outline: none;
            cursor: pointer;
            }
           .slider__dots-wrapper-style {
               display: flex;
               justify-content: space-around;
           }
           .slider__dots-item-style {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(0,0,0,0.2);
            cursor: pointer;
            transition: 0.5s all;
           }
           .slider__dots-item-style:hover {
            background: black;
          }
          .slider__dots-active-item-style {
            transition: 0.5s all;
            background: black;
          }`;
        document.head.append(style);
        this.sliderWrapper.classList.add('slider__wrapper-style');
        this.slider.classList.add('slider-style');
        this.sliderItem.forEach(slide => {
            slide.classList.add('slider__item-style')
        });
    }

    hundlerNext() {
        let lastSlide = this.sliderItems[this.sliderItems.length - 1];
        this.slider.style.transition = `none`;
        this.position = 0;
        this.slider.prepend(lastSlide);
        this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.slidesToScroll * this.position}px)`;
        this.sliderItems.unshift(lastSlide);
        this.sliderItems.pop();
    }

    infiniteSliderNext() {
        if (this.position === this.sliderItems.length - 1) {
            let hundlerN = this.hundlerNext();
            this.slider.removeEventListener('transitionend', hundlerN);
        } else {
            return;
        }
    }

    nextSlideF() {
        if (this.position >= this.sliderItems.length - 1) return;
        this.counter++;
        if(this.counter === this.sliderItems.length) this.counter = 0;
        this.position += 1;
        this.slider.style.transition = `1s all`;
        this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.slidesToScroll * this.position}px)`;
        this.slider.addEventListener('transitionend', this.infiniteSliderNext.bind(this));
        this.activeDot();

    }

    prevSlideF() {
        if (this.position <= 0) return;
        this.counter--;
        if(this.counter < 0) this.counter = this.sliderItems.length - 1;
        this.position -= 1;
        this.slider.style.transition = `1s all`;
        this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth  * this.slidesToScroll * this.position}px)`;
        this.slider.addEventListener('transitionend', this.startsliderPosition.bind(this));
        this.activeDot();


    }

    startsliderPosition() {
        if (this.position === 0) {
            this.hundlerNext();
            this.position = 1;
            this.slider.style.transition = `none`;
            this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth  * this.slidesToScroll}px)`;

        }

    }

    createDots() {
        if (this.dots) {
            let div = document.createElement('div');
            div.classList.add('slider__dots-wrapper-style');
            this.sliderWrapper.append(div);

            for (let i = 0; i < this.sliderItems.length; i++) {
                let dot = document.createElement('div');
                dot.classList.add('slider__dots-item-style');
                div.append(dot);
            }
        } else {
            return;
        }

    }

    activeDot() {
        let dots = document.querySelectorAll('.slider__dots-item-style');
        for (let i = 0; i < this.sliderItems.length; i++) {

            dots[i].classList.remove('slider__dots-active-item-style')
            if(i === this.counter) {
                dots[i].classList.add('slider__dots-active-item-style')

            }
        }
    }

    start() {
        this.createNextButton();
        this.createPrevButton();
        this.sliderStyle();
        this.startsliderPosition();
        this.createDots();
        this.activeDot();

        this.nextSlide.addEventListener('click', this.nextSlideF.bind(this));
        this.prevSlide.addEventListener('click', this.prevSlideF.bind(this));

    }
}