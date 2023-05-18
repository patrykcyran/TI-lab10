function wyslijAsync(url, metoda, typDanych, przesylanyDokument) {
    if (!window.XMLHttpRequest) {
        return null;
    }

    let requester = new XMLHttpRequest();

    metoda = metoda || "GET";
    typDanych = typDanych || "text/plain";

    requester.open(metoda, url);

    requester.setRequestHeader("Content-Type", typDanych);

    requester.onreadystatechange = function() {
        el = document.getElementById("wyniki");
        el.style.display = "block";
        el.innerHtml = "Ładuję dane...";

        if (requester.readyState == 4) {
            if (requester.status === 200) {
                let rezultat = '';
                let odpowiedzXML = requester.responseXML.getElementsByTagName("sugestia");
                for (let wynik of odpowiedzXML) {
                    rezultat += '<div id="class">' + wynik.firstChild.nodeValue + '</div>';
                }
                el.innerHTML = rezultat;
            } else {
                console.log("blad o statusie ", requester.status);
            }
        }
    }
    requester.send(przesylanyDokument);

    return requester;
}

function pobierzSugestie() {
    let wartosc = { wartosc: document.getElementById("pole").value };
    wyslijAsync("sugestie", "POST", "application/json", JSON.stringify(wartosc));
}