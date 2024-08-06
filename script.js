document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('phoneNumber').value;
    const apiUrl = `https://api.example.com/phone-info?number=${phoneNumber}`;
    const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key if needed

    fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${apiKey}`, // Adjust this line based on how the API requires the key
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
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
        console.error('Error fetching phone details:', error);
        alert('There was an error fetching the phone details. Please try again.');
    });
});
