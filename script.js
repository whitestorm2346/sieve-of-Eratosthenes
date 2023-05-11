function startSieveAnimation() {
  var nInput = document.getElementById("nInput");
  var n = parseInt(nInput.value);
  var gridContainer = document.getElementById("gridContainer");

  // Clear existing grid items
  gridContainer.innerHTML = "";

  for (var i = 1; i <= n; i++) {
    var gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.setAttribute("id", "gridItem-" + i);

    var numberElement = document.createElement("span");
    numberElement.innerText = i;

    gridItem.appendChild(numberElement);
    gridContainer.appendChild(gridItem);
  }

  sieveAnimation(n);
}

function resetGridColors() {
  var gridItems = document.getElementsByClassName("grid-item");
  for (var i = 0; i < gridItems.length; i++) {
    gridItems[i].classList.remove("prime", "non-prime");
  }
}

function delayChangeColor(number, colorClass, delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      var gridItem = document.getElementById("gridItem-" + number);
      gridItem.classList.add(colorClass);
      resolve();
    }, delay);
  });
}

async function sieveAnimation(n) {
  var isPrime = [];
  var num = 2;

  // Initialize the array, assuming all numbers are prime
  for (var i = 0; i <= n; i++) {
    isPrime[i] = true;
  }

  resetGridColors(); // Reset grid colors

  while (num * num <= n) {
    if (isPrime[num]) {
      await delayChangeColor(num, "prime", 1000); // Set prime number color to green
      await delayChangeColor(num, "prime", 1000); // Set prime number color to green

      for (var i = num * num; i <= n; i += num) {
        if (isPrime[i]) {
          await delayChangeColor(i, "non-prime", 50); // Set non-prime number color to red
          isPrime[i] = false;
        }
      }
    }
    num++;
  }

  for (var i = 2; i <= n; i++) {
    if (isPrime[i]) {
      await delayChangeColor(i, "prime", 200); // Set prime number color to green
    }
  }
}
