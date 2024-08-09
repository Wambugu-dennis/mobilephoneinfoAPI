document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('phoneNumber').value;
    const apiUrl = `https://api.apilayer.com/number_verification/validate?number=${phoneNumber}`;
    const apiKey = '10d2be88167fac898b86f041bc44fa04';

    var myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    console.log("Request Headers:", requestOptions.headers);
    console.log("API URL:", apiUrl);

    document.getElementById('spinner').style.display = 'block';

    fetch(apiUrl, requestOptions)
        .then(response => {
            document.getElementById('spinner').style.display = 'none';
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
            document.getElementById('coordinates').textContent = `Latitude: ${data.location.lat}, Longitude: ${data.location.lng}`;
        })
        .catch(error => {
            document.getElementById('spinner').style.display = 'none';
            console.error('Error fetching phone details:', error);
            alert('There was an error fetching the phone details. Please try again.');
        });
});
