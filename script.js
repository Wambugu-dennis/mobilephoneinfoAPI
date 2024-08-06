document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('phoneNumber').value;
    const apiUrl = `https://apilayer.com/?number=${phoneNumber}`;
    const apiKey = '19gysNayjmZ6UxDVqDiNFTEpHSwI7mZfE'; //to change

    document.getElementById('loading').classList.remove('hidden');

    fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        document.getElementById('loading').classList.add('hidden');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('valid').textContent = data.Valid;
        document.getElementById('number').textContent = data.Number;
        document.getElementById('localFormat').textContent = data['Local format'];
        document.getElementById('intlFormat').textContent = data['International format'];
        document.getElementById('countryPrefix').textContent = data['Country prefix'];
        document.getElementById('countryCode').textContent = data['Country code'];
        document.getElementById('countryName').textContent = data['Country name'];
        document.getElementById('carrier').textContent = data.Carrier;
        document.getElementById('lineType').textContent = data['Line type'];
        document.getElementById('coordinates').textContent = `Latitude: ${data.Coordinates.Latitude}, Longitude: ${data.Coordinates.Longitude}`;
    })
   .catch(error => {
    document.getElementById('loading').classList.add('hidden');
    console.error('Error fetching phone details:', error);
    alert(`There was an error fetching the phone details: ${error.message}. Please try again.`);
});
});
