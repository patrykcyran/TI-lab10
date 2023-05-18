function wyslijAsync(url) {
    if (!window.XMLHttpRequest) {
        return null;
    }

    let requester = new XMLHttpRequest();

    let metoda = "GET";
    let typDanych = "text/plain";

    requester.open(metoda, url);

    requester.setRequestHeader("Content-Type", typDanych);

    requester.send(null);

    requester.onreadystatechange = function() {
        if (requester.readyState == 4) {
            if (requester.status === 200) {
                console.log("wyszstko ok, status " + requester.status);
            } else {
                console.log("blad o statusie ", requester.status);
            }
        }
        console.log(requester.readyState);
        console.log(requester.status);
    }

    return requester;
}

function pobierzSugestie() {
    let wartosc = document.getElementById("pole").value;
    wyslijAsync("sugestieBackend?wartosc="+wartosc);
}