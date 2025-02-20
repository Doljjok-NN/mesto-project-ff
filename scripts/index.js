// @todo: Темплейт карточки

    function deleteCard (deleteButton) {
        let closestCard = deleteButton.target.closest('.card');
        closestCard.remove(closestCard);
    }

   

   

    
    function createСard (cardData,deleteCard) {
        
        const cardTemplate = document.querySelector('#card-template').content;
        let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        

        cardElement.querySelector('.card__image').src = cardData.link;
        cardElement.querySelector('.card__image').alt = cardData.name;
        cardElement.querySelector('.card__title').textContent = cardData.name;

        cardItem.append(cardElement);


        let deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', deleteCard);
        
    }
    
    let cardItem = document.querySelector('.places__list');
    
    initialCards.forEach(function(element) {
        createСard(element,deleteCard)
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
