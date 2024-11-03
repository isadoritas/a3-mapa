document.addEventListener('DOMContentLoaded', function () {
  const datePicker = new tempusDominus.TempusDominus(document.getElementById('datetimepicker'), {
    display: {
      components: {
        calendar: true,
        date: true,
        month: true,
        year: true,
        decades: true,
        clock: false,
        hours: false,
        minutes: false,
        seconds: false
      }
    }
  });
});

// inicializa o mapa
let map;
let geocoder;

function initMap() {
  const location = { lat: -23.55052, lng: -46.633308 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 5
  });

  geocoder = new google.maps.Geocoder();
}

function geocodeAddress(location, description, imageURL, date) {
  geocoder.geocode({ address: location }, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);

      const marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });

      // adiciona conteúdo aos marcadores
      const infoWindowContent = `
        <h5>${results[0].formatted_address}</h5>
        <p>${description}</p>
        <p><strong>Data:</strong> ${date}</p>
        ${imageURL ? `<img src="${imageURL}" alt="Foto do local" style="width: 100%; max-width: 200px; margin-top: 10px;">` : ''}
      `;
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });

      // adiciona a legenda com a localização, descrição, data e foto
      const legend = document.getElementById('div_tabela');
      legend.innerHTML += `
        <div style="margin-bottom: 20px;">
          <strong>${results[0].formatted_address}</strong>
          <p>${description}</p>
          <p><strong>Data:</strong> ${date}</p>
        </div>
      `;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const location = document.getElementById('location-input').value;
  const description = document.getElementById('description-input').value;
  const date = document.querySelector('#datetimepicker input').value;
  const photoInput = document.getElementById('photo-input').files[0];

  if (photoInput) {
    const reader = new FileReader();
    reader.onload = function(e) {
      geocodeAddress(location, description, e.target.result, date);
      resetInputs(); 
    };
    reader.readAsDataURL(photoInput);
  } else {
    geocodeAddress(location, description, null, date);
    resetInputs(); 
  }
});

// reseta os inputs após envio de formulário
function resetInputs() {
  document.getElementById('location-input').value = '';
  document.getElementById('description-input').value = '';
  document.getElementById('photo-input').value = '';
  document.querySelector('#datetimepicker input').value = '';
}

(function() {

  'use strict';

  document.querySelector('.material-design-hamburger__icon').addEventListener(
    'click',
    function() {      
      var child;
      
      document.body.classList.toggle('background--blur');
      this.parentNode.nextElementSibling.classList.toggle('menu--on');

      child = this.childNodes[1].classList;

      if (child.contains('material-design-hamburger__icon--to-arrow')) {
        child.remove('material-design-hamburger__icon--to-arrow');
        child.add('material-design-hamburger__icon--from-arrow');
      } else {
        child.remove('material-design-hamburger__icon--from-arrow');
        child.add('material-design-hamburger__icon--to-arrow');
      }

    });

})();


