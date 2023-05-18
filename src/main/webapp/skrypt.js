function wyslijAsync(url, metoda, typDanych, przesylanyDokument) {
    if (!window.XMLHttpRequest) {
        return null;
    }

    let requester = new XMLHttpRequest();

    metoda = "GET";
    typDanych = "text/plain";

    requester.open(metoda, url);

    requester.setRequestHeader("Content-Type", typDanych);

    requester.send(null);

    requester.onreadystatechange = function() {
        el = document.getElementById("wyniki");
        el.style.display = "block";
        el.innerHtml = "Ładuję dane...";

        if (requester.readyState == 4) {
            if (requester.status === 200) {
                let rezultat = '';
                let odpowiedz = requester.responseText.split(";");
                odpowiedz.forEach(wynik => {
                    rezultat += '<div class="lista">' + wynik + "</div>";
                });
                el.innerHTML = rezultat;
            } else {
                console.log("blad o statusie ", requester.status);
            }
        }
    }

    return requester;
}

function pobierzSugestie() {
    let wartosc = document.getElementById("pole").value;
    wyslijAsync("sugestieBackend?wartosc="+wartosc);
}