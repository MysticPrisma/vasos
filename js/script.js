const pages = ['add','change','remove','clean'];
const title = document.title;

function nav(move) {
  const currentIndex = document.activeElement.tabIndex;
  const next = currentIndex + move;
  const items = document.querySelectorAll('.item');
  const targetElement = items[next];
  targetElement.focus();
}

function goTo(page) {
  let state = pages[page];
  window.location.href = "/vasos/pages/" + state + ".html";
}

function hKeyDown(e) {
  switch(e.key) {
    case 'ArrowUp':
      nav(-1);
      break;
    case 'ArrowDown':
      nav(1);
      if (title == "Change" || title == "Add") nav(1);
      break;
    case 'Enter':
      if (title == 'Menu') {
				if (document.activeElement.tabIndex == 3) {
					if (confirm("Seguro que quieres limpiar el sistema y borrar los datos actuales?")) {
						window.localStorage.clear();
						alert("Los datos se han borrado con éxito!");
						window.location.href = "/index.html"
					}
				} else 
					goTo(document.activeElement.tabIndex);
				}
      break;
    case 'SoftLeft':
      window.location.href = "/vasos/index.html";
      break;
    case 'SoftRight':
    case 'Insert':
      var day = document.getElementById("day").value;
      var dayName = document.getElementById(day).getAttribute("name");
      var currAmnt = Number(window.localStorage.getItem(day));
      if (title == "Add" || title == "Change") {
				var amnt = Number(document.getElementById("amnt").value);
      }
      switch (title) {
				case "Add":
					amnt += currAmnt;
					window.localStorage.setItem(day, amnt);
					alert("Agregaste " + (amnt-currAmnt) + " vasos al día " + dayName + "!");
					break;
				case "Change":
					window.localStorage.setItem(day, amnt);
					alert("Cambiaste de " + currAmnt + " a " + amnt + " vasos para el día " + dayName + "!");
					break;
				case "Remove":
					if (window.confirm("Deseas remover los " + currAmnt + " vasos que tienes en el día " + dayName + "?")) {
						window.localStorage.removeItem(day);
						alert("Los datos del día " + dayName + " han sido removidos exitosamente!");
					}
				}
			break;
  }
}

function main() {
  document.querySelectorAll(".item")[0].focus();
  document.addEventListener('keydown', hKeyDown);
  if (title == 'Menu') {
    const days = ["L","M","I","J","V","S","D"];
    const sqrs = document.querySelectorAll(".squ");
    const vaso = document.getElementById("vasos");
    const peso = document.getElementById("pesos");
    var totVas = 0;
    for (let i = 0; i < 7; i++) {
      console.log(days[i]);
      let dayInfo = window.localStorage.getItem(days[i]);
      if (dayInfo == null) {
				dayInfo = 'x';
      } else {
				sqrs[i].style.backgroundColor = "green";
				totVas += parseInt(dayInfo);
      }
      sqrs[i].innerText += "\n" + dayInfo;
      //sqrs[i].innerHTML += "<div class='amnt'>" + dayInfo + "</div>";
    }
		let pesos = parseInt(totVas*0.14);
    vaso.innerText += totVas;
    peso.innerText += pesos;
		const trofeo = document.getElementById("vaso");
		if (pesos >= 500 && pesos < 1500) {
			trofeo.src = "/vasos/img/vaso-bronce.svg";
		} else if (pesos >= 1500 && pesos < 3000) {
			trofeo.src = "/vasos/img/vaso-plata.svg";
		} else if (pesos >= 3000) {
			trofeo.src = "/vasos/img/vaso-oro.svg";
		}
  }
}

main();
