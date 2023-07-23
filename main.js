//todo HTML'den çektiklerimiz
const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.getElementById("add-btn");
const warningMessage = document.getElementById("warning")

const listArea = document.getElementById("list")
const statusCheck = document.getElementById("status-check")
const clearBtn = document.getElementById("clear")
const sumInfo = document.getElementById("sum-info")
const nameTitle = document.getElementById("nameTitle")
const select = document.querySelector("select")


//todo Olay İzleyicileri

clearBtn.addEventListener("click",clear)
addBtn.addEventListener("click",addExpense)
listArea.addEventListener("click",handleUpdate)
nameTitle.addEventListener("input",saveUser)
document.addEventListener("DOMContentLoaded",getUser)
select.addEventListener("change",handleFilter)

// toplamın değerini tutacağımız yer
let sum = 0

function updateSum(price){
   //js deki toplam değerini güncelle

   sum += Number(price)
   // HTML'de ki toplam harcama bölümünü güncelleme
   sumInfo.textContent = sum;
}

/*
    * eventListener ile çalıştırılan fonksiyonlar
    * olay hakkında bilgileri içeren bir parametre gider(e,event,olay vb.)

 */
function addExpense(e){
    // sayfanın yenilenmesini engeller
    e.preventDefault();
    

    // 1-) inputların değerlerinden herhangi biri boşşsa bildirim gönder ve fonksiyonu durdur.
    
    /*
    ? nameInput.value == "" ile !nameInput.value aynı işlemi görür
     */
    if(!nameInput.value || !priceInput.value){
        warningMessage.textContent = "Lütfen tüm alanları doldurunuz."
        warningMessage.style.display = "flex"
        return false; // formu göndermeyi engeller
    }
    // 2-) inputlar doluysa bir kart oluştur ve HTML'e gönder.
    warningMessage.style.display ="none"
    // a- div oluşturma ve class ekleme
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense") 
    // expenseDiv.classList = "expense"; ikiside aynı yöntemdir. '=' yönteminde önceden olan classları silerken '.add' yönteminde olan classın yanına ekler.  
    // b- divin içeriğini belirleme


    // ödendi chek tıklandıysa payed class'ını ekle
    if(statusCheck.checked == true){
        expenseDiv.classList.add("payed");
    }

    expenseDiv.innerHTML = `
        <h2 class="name">${nameInput.value}</h2>
        <h2 class="price">${priceInput.value}</h2>
        <h3 class="date">Tarih:${nowDate}</h3>
        <div class="btns">
            <img id="edit" src="images/icons8-pay-100.png" alt="">
            <img id="delete" src="images/icons8-delete-100.png" alt="">
        </div>
    `;
    // c- oluşturduğumuz elemanı HTML'e gönderip ekleme
    listArea.appendChild(expenseDiv)


    //toplam alanı güncelleme
    updateSum(priceInput.value)

    nameInput.value = ""
        priceInput.value = ""
        statusCheck.checked = false;
    // Temizle ekranı
     function clear(e){
        e.preventDefault()
        listArea.remove();
    }

    // return true; formu gönderir
    
    
    
    
}

// Tarih
const date = new Date()
const nowDate = date.toLocaleDateString()
    

//listedeki bir elemana tıklayınca çalışır
function handleUpdate(e){
    //tıkladığımız eleman
    const element = e.target

console.log(element.id)
    //silme işleminde çalışacak kod
    if(element.id == "delete"){
        // silme kapsayıcısına erişme
        const parent = element.parentElement.parentElement
        
        //elementi silme
        parent.remove();

        // toplam bilgisini güncelleme
        const price = parent.querySelector(".price").textContent
        updateSum(Number(price) * -1)
    }
    //elemanın id'si edit ise onun payed classı varsa çıkar yoksa ekle
    if(element.id == "edit"){
        const parent = element.parentElement.parentElement
        parent.classList.toggle("payed")
    }
}

// kullanıcı local'e kaydetme
function saveUser(e){
    const userName = e.target.value
    localStorage.setItem('username',userName)

}

// local'de ki kullanıcı adının inputa işlenmesi
function getUser(){
    // local'den ismi al || isim kaydedilmemiş ise null yerine ""(boş string) olsun
    const userName = localStorage.getItem('username') || '';
    //kullanıcı ismini inputa aktar
    nameTitle.value = userName
}

// filtreleme kısmı
function handleFilter(e){
    const selected = e.target.value
    const items = listArea.childNodes

    //bütün elemanları dönme
    items.forEach(item =>{
    // selectedı alabileceği değerleri izleme
    switch (selected){
        case "all":
            //hepsi seçilirse
            item.style.display = "flex"
            break;
        case "payed":
            //yalnızca ödenenler
            // elemanı payed class'ına sahipse onu göster değilse gizle
            if(item.classList.contains("payed")){
                item.style.display = "flex"
            }else{
                item.style.display = "none"
            }
            break;
        case "not-payed":
            //yalnızca ödenmeyenler
            // elemanı payed classını içeriyorsa gizle içermiyorsa göster
            if(item.classList.contains("payed")){
                item.style.display = "none"
            }else{
                item.style.display = "flex"
            }
            break;
            
    }
    })
   
}


