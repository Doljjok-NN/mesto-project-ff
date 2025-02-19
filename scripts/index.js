// @todo: Темплейт карточки

    function cardDelet (deletButton) {
        let delet = deletButton.target.closest('.card');
        delet.remove(delet);
    }

   

   

    
    function createСard (initialCards,cardDelet) {
        
        let cardTemplate = document.querySelector('#card-template').content;
        let userElement = cardTemplate.querySelector('.card').cloneNode(true);
        

        userElement.querySelector('.card__image').src = initialCards.link;
        userElement.querySelector('.card__title').textContent = initialCards.name;

        cardItem.append(userElement);


        let deletButton = userElement.querySelector('.card__delete-button');
        deletButton.addEventListener('click', cardDelet);
        
    }
    
    let cardItem = document.querySelector('.places__list');
    
    initialCards.forEach(function(element) {
        createСard(element,cardDelet)
    });
        
    

    
   

    


    // for (let i = 0; i < initialCards.length; i++) {

    //     let cardTemplate = document.querySelector('#card-template').content;
    //     let userElement = cardTemplate.querySelector('.card').cloneNode(true);

    //     userElement.querySelector('.card__image').src = initialCards[i].link;
    //     userElement.querySelector('.card__title').textContent = initialCards[i].name;

    //     cardItem.append(userElement);
        
    // }

    

    
   






// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
