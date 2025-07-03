function Hello() {
    fetch('/hello')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert(data); // Display the response in an alert
        })
        .catch(error => console.error('Error:', error));
}