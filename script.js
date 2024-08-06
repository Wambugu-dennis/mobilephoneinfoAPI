document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('phoneNumber').value;
    const apiUrl = `https://api.apilayer.com/number_verification/validate?number=${phoneNumber}`;
    const apiKey = '19gysNayjmZ6UxDVqDiNFTEpHSwI7mZf';

    var myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    console.log("Request Headers:", requestOptions.headers);
    console.log("API URL:", apiUrl);

    document.getElementById('loading').classList.remove('hidden');

    fetch(apiUrl, requestOptions)
        .then(response => {
            document.getElementById('loading').classList.add('hidden');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Response Data:", data);
            document.getElementById('results').classList.remove('hidden');
            document.getElementById('valid').textContent = data.valid;
            document.getElementById('number').textContent = data.number;
            document.getElementById('localFormat').textContent = data.local_format;
            document.getElementById('intlFormat').textContent = data.international_format;
            document.getElementById('countryPrefix').textContent = data.country_prefix;
            document.getElementById('countryCode').textContent = data.country_code;
            document.getElementById('countryName').textContent = data.country_name;
            document.getElementById('carrier').textContent = data.carrier;
            document.getElementById('lineType').textContent = data.line_type;
            document.getElementById('coordinates').textContent = `Latitude: ${data.location.lat}, Longitude: ${data.location.lng}`;
        })
        .catch(error => {
            document.getElementById('loading').classList.add('hidden');
            console.error('Error fetching phone details:', error);
            alert('There was an error fetching the phone details. Please try again.');
        });
});

// Fetch countries information on page load or when needed
var myHeaders = new Headers();
myHeaders.append("apikey", "19gysNayjmZ6UxDVqDiNFTEpHSwI7mZf");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/number_verification/countries", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
