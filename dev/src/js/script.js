document.addEventListener('DOMContentLoaded', function(){ 
    //обработка фокуса на инпуте
    function inputFocus(block, form) {
        //Со старта проверяю не пустые поля и добавляю им соответствующие классы
        let inputsForm = block.querySelectorAll('input');
        let CollectionTopDesc = block.querySelectorAll('.personal__input-desc');

        inputsForm.forEach(function(el, i, arr) {
            if((el.value).length > 0) {
                (CollectionTopDesc[i]).classList.add('active');
                el.classList.add('active');
            }
        }) 

        block.onclick = function(e) {
            let target = e.target;
            let typeElement = target.tagName;
            let attrElement = target.getAttribute('type');

            //если клик был на инпуте с типом текст или email
            if(typeElement == 'INPUT' && ( attrElement == 'text' || attrElement == 'email' )) {
                //получая родителя,чтобы у него найти элемент с описание и отобразить его
                let parrent = target.offsetParent;
                let topDescBlock = parrent.querySelector('.personal__input-desc');

                //устанавливаю активные классы элементам
                topDescBlock.classList.add('active');
                target.classList.add('active');
                
                let topDescCollection = document.querySelectorAll('.personal__input-desc');

                //если после изменения инпута в предыдущем нет значения, убираю верхнее описание
                form.onchange = function(e) {
                    let allInputs = block.querySelectorAll('input');

                    allInputs.forEach(function(el, i, arr) {
                        if((el.value).length == 0) { 
                            topDescCollection[i].classList.remove('active');
                            el.classList.remove('active');
                        }
                    })  
                }
            }
        }
    }

    //обработка открытия/закрытия меню и выбор элементов
    function openFakeMenu(select, fakeMenu, openBtnBlock) {
        let fakeMenuSelect = fakeMenu.querySelector('.fake-select__list');
        let fakeSelectInfo = fakeMenu.querySelector('.fake-select__info');
        let fakeSelectCurrent = fakeMenu.querySelector('.fake-select__current');
        let openBtn = openBtnBlock.querySelector('.open-select__btn');

        //стартовое значение списка
        let startListValue = fakeSelectCurrent.innerText;

        //проверка со старта(если есть текущее значение,синхронизирую со списком)
        if(startListValue.length > 0) {
            fakeSelectInfo.remove();
            let itemsSelect = select.querySelectorAll('option');

            //синхронизирую выбранный элемент в кастомном списке с основным селектом
            itemsSelect.forEach(function(el, i, arr) {
                el.getAttribute('value') != startListValue ? el.removeAttribute('selected') : el.setAttribute('selected','');
            })  
        }

        openBtnBlock.onclick = function(e) {
            openBtn.classList.toggle('rotateBtn');
            fakeMenuSelect.classList.toggle('active');

            //если открыт список
            if(fakeMenuSelect.classList.contains('active')) {
                fakeMenuSelect.onclick = function(e) {
                    let target = e.target;
                    let targetValue = target.innerText;
                    let itemsList = fakeMenuSelect.querySelectorAll('li');
                    let itemsSelect = select.querySelectorAll('option');

                    //устанавливаем класс выбранному элементу
                    itemsList.forEach(function(el, i, arr) {
                        el != target ? el.classList.remove('selected') : el.classList.add('selected');
                    })

                    //синхронизирую выбранный элемент в кастомном списке с основным селектом
                    itemsSelect.forEach(function(el, i, arr) {
                        el.getAttribute('value') != targetValue ? el.removeAttribute('selected') : el.setAttribute('selected','');
                    })  
                    
                    //после клика по элементу закрываю список и анимирую стрелку
                    fakeSelectInfo.remove();
                    fakeSelectCurrent.innerText = targetValue;
                    
                    openBtn.classList.remove('rotateBtn');
                    fakeMenuSelect.classList.remove('active');
                }
            }
        }
    }

    //мобильная тоггл кнопка меню
    function openMobileMenu(btn, menu) {
        btn.onclick = function(e) {
            menu.classList.toggle('active');
        }
    }

    let personalInputs = document.querySelector(".personal");
    let form = document.querySelector(".form");
    inputFocus(personalInputs, form);

    let mainSelect = document.getElementById('birthDateSelect');
    let fakeMenu = document.querySelector('.fake-select');
    let openBtnBlock = document.querySelector('.open-select');
    openFakeMenu(mainSelect, fakeMenu, openBtnBlock);

    let menu = document.querySelector('.header-nav');
    let menuBtn = document.querySelector('.header__mobileBtn');
    openMobileMenu(menuBtn, menu);


    function skillSlider() {
        //ползунок
        let thumb = slider.querySelector('.thumb');
        //перекрывающий блок с цветом
        let rangeHover = document.querySelector('.skill-range__hover');
        //вся ширина слайдера
        let fullSliderWidth = +(slider.offsetWidth);
        
        let newCursorLeft = thumb.style.left;
        newCursorLeft = +(newCursorLeft.replace('px', ''));

        let newWidth = (newCursorLeft*100) / fullSliderWidth;
        rangeHover.style.width = newWidth + '%';

        thumb.onmousedown = function(event) {
          event.preventDefault();

          let shiftX = event.clientX - thumb.getBoundingClientRect().left;

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
          document.addEventListener("touchmove", onMouseMove);
          document.addEventListener("touchend", onMouseUp);
    
          function onMouseMove(event) {
            let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
    
            // курсор вышел из слайдера => оставить бегунок в его границах.
            if (newLeft < 0) {
              newLeft = -11;
            }

            let rightEdge = (slider.offsetWidth - thumb.offsetWidth) + 11;

            if (newLeft > rightEdge) {
              newLeft = rightEdge;
            }

            thumb.style.left = newLeft + 'px';

            let newCursorLeft = thumb.style.left;
            newCursorLeft = +(newCursorLeft.replace('px', ''));

            let newWidth = ((newCursorLeft + 11)*100) / fullSliderWidth;
            rangeHover.style.width = (100 - newWidth) + '%';
          }
    
          function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener("touchend", onMouseUp);
            document.removeEventListener("touchmove", onMouseMove);
            
            let newCursorLeft = thumb.style.left;
            newCursorLeft = +(newCursorLeft.replace('px', ''));

            let newWidth = ((newCursorLeft + 11)*100) / fullSliderWidth;
            rangeHover.style.width = (100 - newWidth) + '%';
          }
    
        };
    
        thumb.ondragstart = function() {
          return false;
        };
    }
    skillSlider();
});