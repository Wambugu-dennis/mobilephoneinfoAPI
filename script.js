document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('phoneNumber').value;
    const apiKey = '14tfmHnvhLItYMdDouOtM9eace7WPm9c';
    const apiUrl = `https://api.apilayer.com/number_verification/validate?number=${encodeURIComponent(phoneNumber)}`;

    var myHeaders = new Headers();
    myHeaders.append("apikey", apiKey);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Response Data:", data);
            // Display the response data in the console or update the DOM as needed
        })
        .catch(error => {
            console.error('Error fetching phone details:', error);
            alert('There was an error fetching the phone details. Please try again.');
        });
});
