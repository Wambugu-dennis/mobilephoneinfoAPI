document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('phoneNumber').value;
    const apiKey = '19gysNayjmZ6UxDVqDiNFTEpHSwI7mZf';
    const apiUrl = `https://api.apilayer.com/number_verification/validate?api_key=${apiKey}&number=${encodeURIComponent(phoneNumber)}`;

    console.log("API URL:", apiUrl);

    document.getElementById('spinner').style.display = 'block';

    fetch(apiUrl, { method: 'GET', redirect: 'follow' })
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
        })
        .catch(error => {
            document.getElementById('spinner').style.display = 'none';
            console.error('Error fetching phone details:', error);
            alert('There was an error fetching the phone details. Please try again.');
        });
});
