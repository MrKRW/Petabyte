document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("orderform");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Get form field values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const address = document.getElementById("address").value.trim();
      const city = document.getElementById("city").value.trim();
      const postcode = document.getElementById("postcode").value.trim();
      const cardNumber = document.getElementById("cardNumber").value.trim();
      const expiry = document.getElementById("expiry").value.trim();
      const cvv = document.getElementById("cvv").value.trim();
  
      // Check if all fields are filled
      if (name && email && address && city && postcode && cardNumber && expiry && cvv) {
        const today = new Date();
        const deliveryDate = new Date(today.setDate(today.getDate() + 5));
        const formattedDate = deliveryDate.toDateString();
  
        alert(`Thank you for your purchase, ${name}!\nYour order will be delivered by ${formattedDate}.`);
        
        form.reset(); // Clear the form
      } else {
        alert("Please complete all required fields correctly.");
      }
    });
  });
  