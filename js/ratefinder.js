let url = "rates.json";
    
fetch(url) // Promise
    .then(response => response.json())
    .then(rates => {
      let html = '';
      rates.forEach(rate => html += `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>`);
      document.getElementById("rates").innerHTML = html;
    })
    .catch(e => console.log(e));