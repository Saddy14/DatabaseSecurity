window.onload = function () {
  // Fetch all users
  fetch('getAllUser')
    .then(response => response.json())
    .then(users => {
      const tbody = document.querySelector('.orders table tbody');

      users.forEach(user => {
        // Skip users with userType of 'Admin'
        // if (user.Type === 'Admin') {
        //   return;
        // }

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


const sideLinks = document.querySelectorAll(
  ".sidebar .side-menu li a:not(.logout)"
);

sideLinks.forEach((item) => {
  const li = item.parentElement;
  item.addEventListener("click", () => {
    sideLinks.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

const menuBar = document.querySelector(".content nav .bx.bx-menu");
const sideBar = document.querySelector(".sidebar");

menuBar.addEventListener("click", () => {
  sideBar.classList.toggle("close");
});

const searchBtn = document.querySelector(
  ".content nav form .form-input button"
);
const searchBtnIcon = document.querySelector(
  ".content nav form .form-input button .bx"
);
const searchForm = document.querySelector(".content nav form");

searchBtn.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault;
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchBtnIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchBtnIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    sideBar.classList.add("close");
  } else {
    sideBar.classList.remove("close");
  }
  if (window.innerWidth > 576) {
    searchBtnIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const toggler = document.getElementById("theme-toggle");

toggler.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

