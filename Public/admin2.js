window.onload = function () {
    // Fetch all users
    fetch('getAllUser')
        .then(response => response.json())
        .then(users => {
            const tbody = document.querySelector('.orders table tbody');

            users.forEach(user => {
                // Skip users with userType of 'Admin'
                if (user.Type === 'Admin') {
                  return;
                }

                const userHtml = `
            <tr>
                <td><p>${user.name}</p></td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td><span class="user-type tenant">${user.Type}</span></td>
                <td><button onclick="deleteUser(${user.id})" id="remove-${user.id}" class="remove-user" type="submit">Remove</button></td>
            </tr>
        `;
                tbody.innerHTML += userHtml;
            });

        })

}

function deleteUser(id) {

    fetch(`deleteUser/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: id // Replace with actual user ID
        })
    })
        .then(response => {
            if (response.ok) {
                alert('User deleted successfully!');
                //refresh the page
                window.location.reload();
            } else {
                alert('Failed to delete user');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the user');
        });
}