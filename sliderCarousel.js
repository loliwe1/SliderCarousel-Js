'use strict';
class SliderCarousel {

    constructor({
        sliderWrapper,
        slider,
        sliderItem,
        slidesToShow = 1,
        nextSlide = false,
        prevSlide = false,
        dots = true,
        autoslide = false,
        speedAutoSlide = 2000,
    }) {
        this.sliderWrapper = document.querySelector(sliderWrapper);
        this.slider = document.querySelector(slider);
        this.sliderItem = document.querySelectorAll(sliderItem);
        this.slidesToShow = slidesToShow;
        this.nextSlide = document.querySelector(nextSlide);
        this.prevSlide = document.querySelector(prevSlide);
        this.position = 0;
        this.dots = dots;
        this.autoslide = autoslide;
        this.speedAutoSlide = speedAutoSlide;
        this.sliderItems = this.saveSlides();


    }

    saveSlides() {
        let arr = [];
        for (let i = 0; i < this.sliderItem.length; i++) {
            arr.push(this.sliderItem[i]);
        }
        return arr;
    }


    createDuplicateSlide() {
        let revArr = [...this.sliderItems].reverse();

        for (let i = 0; i < this.slidesToShow; i++) {
            let firstElem = revArr[i].cloneNode(true);
            this.slider.prepend(firstElem);
        }

        for (let i = 0; i < this.slidesToShow; i++) {
            let lastElem = this.sliderItems[i].cloneNode(true);
            this.slider.append(lastElem);
        }

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
               position: relative;
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
               position: relative;
               display: flex;
               justify-content: space-around;
               margin-top: 10px;
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
            slide.classList.add('slider__item-style');
        });

    }

    moveSlide() {
        this.slider.style.transition = `1s all`;
        this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position}px)`;
    }


    nextSlideF() {
        if (this.position >= this.sliderItems.length + this.slidesToShow) return;
        this.position++;
        this.moveSlide();
        this.slider.addEventListener('transitionend', this.infiniteSliderNext.bind(this));
        this.createActiveDot();
    }

    prevSlideF() {
        if (this.position <= 0) return;
        this.position--;
        this.moveSlide();
        this.slider.addEventListener('transitionend', this.infiniteSliderPrev.bind(this));
        this.createActiveDot();
    }

    infiniteSliderNext() {
        if (this.position === this.sliderItems.length + this.slidesToShow) {
            this.position = this.slidesToShow;
            this.slider.style.transition = `none`;
            this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position}px)`;
            this.createActiveDot();
        }
    }
    infiniteSliderPrev() {
        if (this.position === 0) {
            this.position = this.sliderItems.length;
            this.slider.style.transition = `none`;
            this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position}px)`;
            this.createActiveDot();
        }
    }

    startPosition() {
        this.position = this.slidesToShow;
        this.slider.style.transition = `none`;
        this.slider.style.transform = `translateX(-${this.sliderItem[0].clientWidth * this.position}px)`;
    }

    createDots() {
        let count = 0;
        let dotsWrap = document.createElement('div');
        dotsWrap.style.marginLeft = `${this.sliderWrapper.getBoundingClientRect().x}px`;
        dotsWrap.style.width = `${this.sliderWrapper.getBoundingClientRect().width}px`;
        dotsWrap.classList.add('slider__dots-wrapper-style');
        this.sliderWrapper.after(dotsWrap);

        while (count < this.sliderItems.length) {
            let div = document.createElement('div');
            div.classList.add('slider__dots-item-style');
            dotsWrap.append(div);
            count++;
        }
    }

    createActiveDot() {
        let dots = document.querySelectorAll('.slider__dots-item-style');

        if (this.position < this.slidesToShow) {
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove('slider__dots-active-item-style');
            };
            dots[dots.length - this.slidesToShow + this.position].classList.add('slider__dots-active-item-style');

        } else {
            for (let i = 0; i < dots.length; i++) {

                if (this.position - this.slidesToShow === i) {
                    dots[i].classList.add('slider__dots-active-item-style');

                } else {
                    dots[i].classList.remove('slider__dots-active-item-style');
                }
            }
        }
    }

    clickDot() {
        let dotsWrapper = document.querySelector('.slider__dots-wrapper-style');
        let dots = document.querySelectorAll('.slider__dots-item-style');


        dotsWrapper.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('slider__dots-item-style')) {
                for (let i = 0; i < dots.length; i++) {

                    if (dots[i] === target) {
                        dots[i].classList.add('slider__dots-active-item-style');
                        this.position = i + this.slidesToShow;
                        this.moveSlide.call(this);

                    } else {
                        dots[i].classList.remove('slider__dots-active-item-style');
                    }
                }
            }
        });
    }

    autoSlide() {
        if (this.autoslide) {
            setInterval(this.nextSlideF.bind(this), this.speedAutoSlide);
        } else {
            return;
        }
    }

    start() {
        this.createNextButton();
        this.createPrevButton();
        this.sliderStyle();
        this.createDuplicateSlide();
        this.startPosition();
        this.createDots();
        this.createActiveDot();
        this.clickDot();
        this.autoSlide();

        this.nextSlide.addEventListener('click', this.nextSlideF.bind(this));
        this.prevSlide.addEventListener('click', this.prevSlideF.bind(this));


    }
}