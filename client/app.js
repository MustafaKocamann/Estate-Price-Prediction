/**
 * PropertyPredict - AI-Powered Real Estate Price Estimation
 * Modern, responsive JavaScript for property price prediction
 */

// ===== UTILITY FUNCTIONS =====

/**
 * Get selected bedroom value
 */
function getBHKValue() {
  const uiBHK = document.getElementsByName("uiBHK");
  for(let i = 0; i < uiBHK.length; i++) {
    if(uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1;
}

/**
 * Get selected bathroom value
 */
function getBathValue() {
  const uiBathrooms = document.getElementsByName("uiBathrooms");
  for(let i = 0; i < uiBathrooms.length; i++) {
    if(uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1;
}

/**
 * Show error message
 */
function showError(message) {
  const errorDiv = document.getElementById("errorMessage");
  const errorText = document.getElementById("errorText");
  errorText.textContent = message;
  errorDiv.classList.remove("d-none");
  errorDiv.classList.add("show", "fade");
  
  setTimeout(() => {
    errorDiv.classList.remove("show");
    setTimeout(() => errorDiv.classList.add("d-none"), 150);
  }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
  const errorDiv = document.getElementById("errorMessage");
  errorDiv.classList.add("d-none");
  errorDiv.classList.remove("show");
}

/**
 * Show loading spinner
 */
function showLoading() {
  const spinner = document.getElementById("loadingSpinner");
  const resultSection = document.getElementById("resultSection");
  
  spinner.classList.remove("d-none");
  resultSection.classList.add("d-none");
  hideError();
}

/**
 * Hide loading spinner
 */
function hideLoading() {
  const spinner = document.getElementById("loadingSpinner");
  spinner.classList.add("d-none");
}

/**
 * Display estimated price
 */
function displayPrice(price, sqft, bhk, bath, location) {
  const resultSection = document.getElementById("resultSection");
  const priceDiv = document.getElementById("estimatedPrice");
  const detailsDiv = document.getElementById("resultDetails");
  
  priceDiv.innerHTML = `₹${price.toFixed(2)} Lakh`;
  
  detailsDiv.innerHTML = `
    <strong>Property Details:</strong><br>
    📍 Location: ${location}<br>
    📐 Area: ${sqft} sq ft<br>
    🚪 Bedrooms: ${bhk} BHK<br>
    🚿 Bathrooms: ${bath}
  `;
  
  resultSection.classList.remove("d-none");
  hideLoading();
}

// ===== MAIN FUNCTIONS =====

/**
 * Estimate property price on button click
 */
function onClickedEstimatePrice() {
  const sqft = document.getElementById("uiSqft");
  const bhk = getBHKValue();
  const bathrooms = getBathValue();
  const location = document.getElementById("uiLocations");
  
  // Validation
  if(!sqft.value || parseInt(sqft.value) <= 0) {
    showError("❌ Please enter a valid area in square feet (minimum 1)");
    return;
  }
  
  if(sqft.value > 10000) {
    showError("❌ Area seems too large. Please check your input.");
    return;
  }
  
  if(bhk === -1) {
    showError("❌ Please select number of bedrooms");
    return;
  }
  
  if(bathrooms === -1) {
    showError("❌ Please select number of bathrooms");
    return;
  }
  
  if(!location.value) {
    showError("❌ Please select a location");
    return;
  }
  
  showLoading();
  
  const url = "/api/predict_home_price";
  
  $.ajax({
    type: "POST",
    url: url,
    data: {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
    },
    success: function(data) {
      if(data && data.estimated_price !== undefined) {
        displayPrice(
          data.estimated_price, 
          sqft.value, 
          bhk, 
          bathrooms, 
          location.value
        );
      } else {
        showError("❌ Unexpected response from server");
        hideLoading();
      }
    },
    error: function(xhr, status, error) {
      let message = "❌ Failed to predict price. ";
      if(xhr.status === 0) {
        message += "Unable to connect to server. Make sure it's running.";
      } else if(xhr.status === 404) {
        message += "API endpoint not found.";
      } else if(xhr.status === 500) {
        message += "Server error occurred.";
      } else {
        message += "Please try again.";
      }
      showError(message);
      hideLoading();
    }
  });
}

/**
 * Load location names on page load
 */
function onPageLoad() {
  console.log("PropertyPredict App Loading...");
  
  const url = "/api/get_location_names";
  
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      if(data && data.locations && Array.isArray(data.locations)) {
        const locations = data.locations;
        const uiLocations = document.getElementById("uiLocations");
        
        // Clear existing options except the first one
        $('#uiLocations').find('option:not(:first)').remove();
        
        // Sort locations alphabetically
        locations.sort();
        
        // Add locations
        locations.forEach(function(location) {
          const opt = new Option(location);
          $('#uiLocations').append(opt);
        });
        
        console.log(`✓ Loaded ${locations.length} locations`);
      } else {
        showError("❌ Failed to load locations");
      }
    },
    error: function(xhr, status, error) {
      console.error("Error loading locations:", error);
      showError("❌ Unable to connect to server. Please refresh the page.");
    }
  });
}

// ===== INITIALIZE APP =====
window.addEventListener("DOMContentLoaded", onPageLoad);

// Optional: Add enter key support for sqft input
document.addEventListener("DOMContentLoaded", function() {
  const sqftInput = document.getElementById("uiSqft");
  if(sqftInput) {
    sqftInput.addEventListener("keypress", function(event) {
      if(event.key === "Enter") {
        onClickedEstimatePrice();
      }
    });
  }
});