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
                    rezultat += '<div id="class">' + wynik + '</div>';
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

function pobierzSugestiejQuery() {
    let parametry = {};
    parametry.wartosc = $("#pole2").val();
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
                $("#wyniki2").append('<div class="lista">' + wynik + '</div>');
            })
        },
        error: function(response) {
            console.log("status: " + response.status);
            $("#wyniki2").html("Blad podczas odbierania danych!");
        }
    });
}