let header = document.querySelector("header");
let body = document.getElementsByTagName("body");
let nameElement = document.getElementById("dev"); // Select the element with ID 'dev'
let originalName = nameElement.textContent; // Store the original name
let names = [ "A Developer","A Designer","A Programer","An Engineer"]; // Array of names to cycle through
let currentNameIndex = 0; // Index to track the current name

function changeName() {
    let currentName = names[currentNameIndex]; // Get the current name
    let nextName = names[(currentNameIndex + 1) % names.length]; // Get the next name
    let i = 0;

    // Fade out the current name
    nameElement.classList.add('fade-out');

    setTimeout(() => {
        nameElement.textContent = ""; // Clear the current name
        nameElement.classList.remove('fade-out'); // Remove fade-out class

        // Type out the next name letter by letter
        let typeInterval = setInterval(() => {
            if (i < nextName.length) {
                nameElement.textContent += nextName.charAt(i); // Add the next letter
                i++;
            } else {
                clearInterval(typeInterval); // Stop typing when done
                currentNameIndex = (currentNameIndex + 1) % names.length; // Move to the next name
                setTimeout(changeName, 1500); // Wait for 3 seconds before changing again
            }
        }, 200); // Change every 200ms for typing effect
    }, 500); // Wait for fade-out to complete

}

// // Hamburger menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    navMenu.style.backgroundColor="black";
    navMenu.style.width="100%"
    navMenu.style.height="100%"
    navMenu.style.padding="0 0 0 10rem";
    navMenu.style.border="1px solid  #ffdd00"
});

// Start the name changing animation
changeName();

// Function to change header background color
window.addEventListener("scroll", function(e) {
    if (window.scrollY > 50) { // after 50px
        header.style.backgroundColor = "black";
        header.style.transitionDuration= "500ms";
        header.style.height="5rem";
    } else {
        header.style.backgroundColor = "";
        header.style.height="0";
    }
});


//contact Me form

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("sub").value,
      message: document.getElementById("message").value,
    };
  
    fetch("https://spring-bootemailapi-production.up.railway.app/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.text();
      })
      .then((message) => {
        document.getElementById("responseMessage").textContent = message;
        document.getElementById("contactForm").reset();
      })
      .catch((error) => {
        document.getElementById("responseMessage").style.color = "red";
        document.getElementById("responseMessage").textContent =
          "Failed to send message. Please try again.";
          
      });
  });
