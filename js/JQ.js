jQuery(function ($) {
    $('a[href^="/#"]').click(function (e) {
      e.preventDefault();
      var _href = $(this).attr('href').slice(1);
      $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' });
      return false;
    });
  });

  let name = document.getElementById('name');
  let phone = document.getElementById('phone');
  let form = document.getElementById('order_form');
  let btn = document.getElementById('btn');

  function setWithExpiry(key, value, ttl) {
    const now = new Date();

    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  function setButtonSubmitProperties() {
    btn.style.opacity = '0.7';
    btn.textContent = 'Отправка заявки';
    btn.disabled = true;

    setTimeout(() => {
      btn.style.opacity = '1';
      btn.textContent = 'Отправить заявку';
      btn.disabled = false;
    }, 2000);
  }

  form.addEventListener('submit', function () {
    getPhoneValue();
    setButtonSubmitProperties();

    let formData = {
      name: name.value,
      phone: phone.value,
    };

    setWithExpiry('myKey', formData, 20000);
  });

  // Новый код start
  function getPhoneValue() {
    let number_1 = $("input[name='phone']").val(),
      numberToComment = number_1,
      country_input = $('input#country'),
      number;
    number = number_1
      .replace(/\s+/g, '')
      .replace(/[\])}[{(]/g, '')
      .replace(/-/g, '')
      .replace(/_/g, '');
    phone.value = number;
    $('input#phone_value_ish').val(numberToComment);
    if (
      (number.substring(0, 3).includes(375) && number.substring(3, 5).includes(29) && number.length == 12) ||
      (number.substring(0, 3).includes(375) && number.substring(3, 5).includes(25) && number.length == 12) ||
      (number.substring(0, 3).includes(375) && number.substring(3, 5).includes(44) && number.length == 12) ||
      (number.substring(0, 3).includes(375) && number.substring(3, 5).includes(33) && number.length == 12) ||
      (number.substring(0, 4).includes('+375') && number.substring(4, 6).includes(29) && number.length == 13) ||
      (number.substring(0, 4).includes('+375') && number.substring(4, 6).includes(25) && number.length == 13) ||
      (number.substring(0, 4).includes('+375') && number.substring(4, 6).includes(44) && number.length == 13) ||
      (number.substring(0, 4).includes('+375') && number.substring(4, 6).includes(33) && number.length == 13) ||
      ((number.substring(0, 4).includes(8029) || number.substring(0, 4).includes('8029')) && number.length == 11) ||
      ((number.substring(0, 4).includes(8025) || number.substring(0, 4).includes('8025')) && number.length == 11) ||
      ((number.substring(0, 4).includes(8044) || number.substring(0, 4).includes('8044')) && number.length == 11) ||
      ((number.substring(0, 4).includes(8033) || number.substring(0, 4).includes('8033')) && number.length == 11)
    ) {
      $(country_input).val('BY');
    }

    if (
      ((number.substring(0, 2).includes(29) || number.substring(0, 2).includes('29')) && number.length == 9) ||
      ((number.substring(0, 2).includes(25) || number.substring(0, 2).includes('25')) && number.length == 9) ||
      ((number.substring(0, 2).includes(44) || number.substring(0, 2).includes('44')) && number.length == 9) ||
      ((number.substring(0, 2).includes(33) || number.substring(0, 2).includes('33')) && number.length == 9)
    ) {
      phone.value = `${'+375' + number}`;
      $(country_input).val('BY');
    }
  }