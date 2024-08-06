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
            console.log("Response Status:", response.status);
            console.log("Response Headers:", response.headers);
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Error: ${response.status} ${response.statusText} - ${text}`);
                });
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
            //document.getElementById('coordinates').textContent = `Latitude: ${data.location.lat}, Longitude: ${data.location.lng}`;
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
  .then(response => {
      console.log("Countries Response Status:", response.status);
      console.log("Countries Response Headers:", response.headers);
      if (!response.ok) {
          return response.text().then(text => {
              throw new Error(`Error: ${response.status} ${response.statusText} - ${text}`);
          });
      }
      return response.json();
  })
  .then(result => console.log("Countries Data:", result))
  .catch(error => console.error('Error fetching countries:', error));
