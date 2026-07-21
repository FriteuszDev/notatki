let text = document.querySelector(".text")
let sesje = document.querySelector(".sesje")
let zapis_do_bd = document.querySelector(".zapis_do_bd")
let wczytywanie_z_bd = document.querySelector(".wczytywanie_z_bd")
let logowanie = document.querySelector(".logowanie")
let php_do_js = document.querySelector(".php_do_js")
let js_do_php = document.querySelector(".js_do_php")
let js_do_php_zmienna = document.querySelector(".js_do_php_zmienna")
let while_po_wierszach = document.querySelector(".while_po_wierszach")
let loading = document.querySelector(".loading")



let elementy = [
    document.querySelector(".sesje"),
    document.querySelector(".zapis_do_bd"),
    document.querySelector(".wczytywanie_z_bd"),
    document.querySelector(".logowanie"),
    document.querySelector(".php_do_js"),
    document.querySelector(".js_do_php"),
    document.querySelector(".js_do_php_zmienna"),
    document.querySelector(".while_po_wierszach"),
    document.querySelector(".loading")
]

elementy.forEach(el => {
    if (!el) return;
    
    el.addEventListener("click", () => {
        elementy.forEach(item => {
            if (item) {
                item.style.backgroundColor = ""
                item.style.boxShadow = ""
                item.style.transform = ""
            }
        })

        el.style.backgroundColor = "rgb(20, 26, 40)"
        el.style.boxShadow = "0 0 20px rgb(20, 26, 40)"
        el.style.transform = "scale(1.05)"
    })
})

sesje.addEventListener("click", ()=> {
    text.innerHTML = `
    <span class="tytul">Sesje</span>
    <div class="kopiuj_a">
        <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
        <p> session_start();<br><br> $_SESSION['zalogowany'] = true;<br>$_SESSION['user_login'] = 'krzysiu';</p>
    </div>
    <div class="kopiuj_b">
        <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
        <p>if (isset($_SESSION['zalogowany']) && $_SESSION['zalogowany'] === true) {<br> &emsp;&emsp; echo "Witaj " . $_SESSION['user_login'] . "! Masz dostęp do tajnych danych.";<br>} else {<br>echo "Wypad! Nie jesteś zalogowany.";<br>}</p>
    </div>
`;  
})

zapis_do_bd.addEventListener("click", ()=> {
text.innerHTML = `
        <span class="tytul">Zapis do Bazy Danych</span>
        <div class="kopiuj_a">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>&lt;?php
$host = 'localhost';
$db = 'nauka_sql2';
$user = 'root';
$pass = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $imie = $_POST['imie'];
    $miasto = $_POST['miasto'];
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO klienci (imie, miasto) VALUES (:imie, :miasto)";
        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            'imie' => $imie,
            'miasto' => $miasto
        ]);

        echo "dodano klienta";

    } catch (PDOException $e) {
        die("blad polaczenia " . $e->getMessage());
    }

    header("Location: index.html");
    exit();
}
?&gt;</code></pre>
        </div>
    `;
})

wczytywanie_z_bd.addEventListener("click", () => {
    text.innerHTML = `
        <span class="tytul">Wczytywanie z Bazy Danych</span>
        <div class="kopiuj_a">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>&lt;?php
    $host = 'localhost';
    $db   = 'shop';
    $user = 'root';
    $pass = '';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->query("SELECT id, imie, nazwisko FROM uzytkownicy", PDO::FETCH_ASSOC);

        foreach ($stmt as $row) {
            echo "ID: " . $row['id'] . " - Imię: " . htmlspecialchars($row['imie']) . " Nazwisko: " . htmlspecialchars($row['nazwisko']) . "&lt;br&gt;";
        }
    } catch(PDOException $e) {
        echo "Błąd połączenia: " . $e->getMessage();
    }
    ?&gt;</code></pre>
        </div>
    `;
})


logowanie.addEventListener("click", ()=> {
    text.innerHTML = `
<span class="tytul">Logowanie</span>
<div class="kopiuj_a">
    <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
    <pre><code>&lt;?php
session_start();
$host = 'localhost';
$db   = 'nauka_sql3';
$user = 'root';
$pass = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST['login'];
    $haslo = $_POST['haslo'];

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("SELECT id, login, haslo FROM uzytkownicy WHERE login = :login");
        $stmt->execute(['login' => $login]);

        $user_data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user_data && password_verify($haslo, $user_data['haslo'])) {
            $_SESSION['zalogowany'] = true;
            $_SESSION['user_login'] = $user_data['login'];
            
            header("Location: test.php");
            exit();
        } else {
            echo "Niepoprawny login lub hasło.";
        }

    } catch(PDOException $e) {
        echo "Błąd połączenia: " . $e->getMessage();
    }
}
?&gt;</code></pre>
</div>

    `;
})



php_do_js.addEventListener("click", ()=> {
    text.innerHTML = `
        <span class="tytul">PHP <i class="fa-solid fa-arrow-right"></i> JS</span>
        <div class="kopiuj_a">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>&lt;?php
header('Content-Type: application/json'); 

$odpowiedz = [
    'sukces' => true,
    'komunikat' => 'Produkt został pomyślnie dodany do bazy danych!',
    'nowe_id' => 14
];

echo json_encode($odpowiedz); 
exit();
?&gt;</code></pre>
        </div>
        <div class="kopiuj_b">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>fetch('api.php', {
    method: 'POST'
})
.then(response => response.json()) 
.then(dane => {

    if (dane.sukces === true) {
        alert(dane.komunikat); 
        console.log("Dodano rekord o ID: " + dane.nowe_id);
    }
});</code></pre>
        </div>
    `;
})



js_do_php.addEventListener("click", ()=> {
    text.innerHTML = `
        <span class="tytul">JS <i class="fa-solid fa-arrow-right"></i> PHP</span>
        <div class="kopiuj_a">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>&lt;form id="mojFormularz"&gt;
    &lt;input type="text" name="imie" placeholder="Podaj imię" required&gt;
    &lt;button type="submit"&gt;Wyślij&lt;/button&gt;
&lt;/form&gt;

&lt;div id="wynik"&gt;&lt;/div&gt;

&lt;script&gt;
document.getElementById('mojFormularz').addEventListener('submit', function(event) {
    event.preventDefault();

    let daneFormularza = new FormData(this); 

    fetch('proces.php', {
        method: 'POST',
        body: daneFormularza
    })
    .then(response => response.text()) 
    .then(tekst => {
        document.getElementById('wynik').innerHTML = tekst; 
    });
});
&lt;/script&gt;</code></pre>
        </div>
        <div class="kopiuj_b">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>&lt;?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $imie = htmlspecialchars($_POST['imie']);

    
    echo "Serwer odebrał imię: " . $imie; 
}
?&gt;</code></pre>
        </div>
    `;
})


js_do_php_zmienna.addEventListener("click", () => {
    text.innerHTML = `
        <span class="tytul">JS <i class="fa-solid fa-arrow-right"></i> PHP (jedna zmienna)</span>
        <div class="kopiuj_a">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>const formData = new FormData();
formData.append('danaZmienna', 'Wartość');

fetch('odbierz.php', {
    method: 'POST',
    body: formData
});</code></pre>
        </div>
        <div class="kopiuj_b">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>&lt;?php
$odebranaZmienna = $_POST['danaZmienna'] ?? 'Brak';
echo $odebranaZmienna;

?&gt;</code></pre>
        </div>
    `;
})

while_po_wierszach.addEventListener("click", ()=> {
    text.innerHTML = `
        <span class="tytul">While - Przechodzenie po wierszach</span>
        <div class="kopiuj_a">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>&lt;?php
try {
$pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT nazwa, opis, cena FROM produkty", PDO::FETCH_ASSOC);
    $ZapisJson = [];

header('Content-Type: application/json');

while ($row = $stmt->fetch()) {
    $ZapisJson = [
        'nazwa' => htmlspecialchars($row['nazwa']),
        'opis' => htmlspecialchars($row['opis']),
        'cena' => htmlspecialchars($row['cena'])
    ];
}

echo json_encode($ZapisJson);
exit();

}
?&gt;</code></pre>
        </div>
    `;
})




loading.addEventListener("click", ()=> {
    text.innerHTML = `
        <span class="tytul">Loading Podczas Czekania</span>
        <div class="kopiuj_a">
            <span class="kopiuj_ikona"><i class="fa-solid fa-copy"></i></span>
            <pre><code>&lt;button id="przyciskAkcji"&gt;Pobierz dane z bazy&lt;/button&gt;

&lt;div id="spinner" style="display: none; color: blue; font-weight: bold;"&gt;
    🔄 Ładowanie danych, proszę czekać...
&lt;/div&gt;

&lt;div id="kontenerNaDane"&gt;&lt;/div&gt;

&lt;script&gt;
document.getElementById('przyciskAkcji').addEventListener('click', function() {
    let spinner = document.getElementById('spinner');
    let przycisk = this;


    spinner.style.display = 'block';
    przycisk.disabled = true;

    fetch('dlugie_zapytanie.php')
    .then(response => response.text())
    .then(wynik => {

        spinner.style.display = 'none';
        przycisk.disabled = false;
        
        document.getElementById('kontenerNaDane').innerHTML = wynik;
    });
});
&lt;/script&gt;</code></pre>
        </div>
    `;
})