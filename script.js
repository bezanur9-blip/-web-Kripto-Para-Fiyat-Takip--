// 1. API URL'ini bir değişkene atayalım
const apiURL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd";

// 2. HTML elemanlarını seçelim
const btcText = document.getElementById("btc-fiyat");
const ethText = document.getElementById("eth-fiyat");
const dogeText = document.getElementById("doge-fiyat");
const btn = document.getElementById("guncelle-btn");

// 3. Veri çekme fonksiyonu (Asenkron)
async function fiyatlariGetir() {
    try {
        // İsteği at ve bekle
        const cevap = await fetch(apiURL);
        // Gelen veriyi JSON formatına çevir
        const veri = await cevap.json();

        // Konsolda veriyi inceleyelim (İpucunda dendiği gibi)
        console.log(veri);

        // Verileri değişkenlere alalım
        const btc = veri.bitcoin.usd;
        const eth = veri.ethereum.usd;
        const doge = veri.dogecoin.usd;

        // Ekrana yazdıralım (toLocaleString sayıları formatlar: 45.000 gibi)
        btcText.innerText = "$" + btc.toLocaleString();
        ethText.innerText = "$" + eth.toLocaleString();
        dogeText.innerText = "$" + doge.toLocaleString();

        // BONUS: Renk Kontrolü (Bitcoin için örnek)
        if (btc > 50000) {
            btcText.style.color = "lightgreen";
        } else {
            btcText.style.color = "orange"; // 50 bin altı turuncu/kırmızı
        }

    } catch (hata) {
        console.error("Hata oluştu:", hata);
        btcText.innerText = "Hata!";
    }
}

// 4. Sayfa açıldığında fonksiyonu çalıştır
fiyatlariGetir();

// 5. Butona basıldığında fonksiyonu çalıştır
btn.addEventListener("click", fiyatlariGetir);