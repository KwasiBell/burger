const burgerTemplate = (burgerName, id, is_favorite) => {
  const burgerContainer = $('<div>').attr({
      class: 'content-burger__list',
      id: id
  });

  const img = $('<img>').attr({
      src: './',
      alt: ''
  });

  const name = $('<p>');

  const button = $('<button>').attr({
      'data-id': id,
      'class': 'btn btn-btn-default favorites',
      'data-state': is_favorite
    });

      name.html(burgerName);
      button.html('add to Favorite');

burgerContainer.append(img, name, button);

return burgerContainer

};

const displayNewBurger = (burger) => {
  const name = burger.burger_name;
  const id = burger.id;
  const is_favorite = burger.is_favorite;
  const newBurger = burgerTemplate( name, id, is_favorite);

$('.content-burger').prepend(newBurger);
$('input').val('');


};



const addBurgerFail = (response) => {
  alert('Burger Failed');
}




$('button[type="submit"]').on('click', function(event) {
  event.preventDefault();

  const burger_name = $('input[name="burger_name"]').val();

  $.ajax({
      url: '/add',
      method: 'POST',
      data: {
          burger_name
      }

  })
    .then(displayNewBurger)

    .catch(addBurgerFail);


});

const removeBurgerOneDelete = (burger) => {
  const id = burger.id;
  $(`.all-burgers .burger[data-id=${id}]`).remove();

};

 const removeBurgerFailed = () => {
   alert('Failed deleting burger');
 };


$('.all-burgers .burger button').on('click', function() {
    const id = $(this).attr('data-id');

    $.ajax({
        url: '/delete/' + id,
        method: 'DELETE'
    })
      .then(removeBurgerOneDelete)
      .catch(removeBurgerFailed);
  });


  //for favorite page
  const addBurgerToFavorite = (burger) => {
    const id = burger.id;
    $(`#${id}`).remove();
  };

   const addBurgerToFavoriteFail = () => {
     alert('Fail adding it to favorite');
   };



  $(document).on('click', '.favorites', function() {
      const id = $(this).attr('data-id');
      const value = $(this).attr(data-state);
      let condition = value === '0' ? false : true;

      $.ajax({

        url: `/${id}/${condition}`,
        method: 'PUT'
      })
        .then(addBurgerToFavorite)
        .catch(addBurgerToFavoriteFail);

  })
