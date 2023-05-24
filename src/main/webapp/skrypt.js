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

        if (requester.readyState === 4) {
            if (requester.status === 200) {
                let odpowiedzTXT = requester.responseText;
                let odpowiedz = JSON.parse(odpowiedzTXT);
                let rezultat = "";
                for (let wynik of odpowiedz.sugestia) {
                    rezultat += '<div id="class" onclick="wybierzMarke(\'' + wynik + '\')">' + wynik + '</div>';
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

function wybierzMarke(marka) {
    document.getElementById("pole").value = marka;
    wycziscDiv();
}

function wybierzMarke2(marka) {
    document.getElementById("pole2").value = marka;
    wycziscDiv2();
}

function pobierzSugestie() {
    let wartosc = { wartosc: document.getElementById("pole").value.trim() };
    if (wartosc.wartosc === "") {
        wycziscDiv();
    } else {
        wyslijAsync("sugestie", "POST", "application/json", JSON.stringify(wartosc));
    }
}

function wycziscDiv() {
    document.getElementById("wyniki").innerHTML = '';
}

function wycziscDiv2() {
    document.getElementById("wyniki2").innerHTML = '';
}

function pobierzSugestiejQuery() {
    let parametry = {};
    parametry.wartosc = $("#pole2").val();

    if (parametry.wartosc.trim() === "") {
        wycziscDiv2();
        return;
    }

    $('#pole2').val();
    $("#wyniki2").css("display", "block").html("");

    $("#wyniki2").html("Laduje dane...");
    $.ajax( {
        url: 'sugestie',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(parametry),
        contentType: 'application/json',
        success: function(data) {
            $("#wyniki2").html("");
            $.each(data.sugestia, function(index, wynik) {
                $("#wyniki2").append('<div class="lista" onclick="wybierzMarke2(\'' + wynik + '\')">' + wynik + '</div>');
            })
        },
        error: function(response) {
            console.log("status: " + response.status);
            $("#wyniki2").html("Blad podczas odbierania danych!");
        }
    });


}