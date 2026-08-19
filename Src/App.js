const BASE_URL="https://api.frankfurter.dev/v2/rate";

const dropdown=document.querySelectorAll(".select-container select");
const btn=document.getElementById("getRateBtn");
const fromCurrency=document.getElementById("fromCurrency");
const toCurrency=document.getElementById("toCurrency");

for(let select of dropdown){
    for(currency_code in countryList){
        let newOption=document.createElement("option");
        newOption.value=currency_code;
        newOption.innerText=currency_code;
        if(select.name==="fromCurrency" && currency_code==="USD"){
            newOption.selected=true;
        }
        if(select.name==="toCurrency" && currency_code==="INR"){
            newOption.selected=true;
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change",(e)=>{
        console.log(e.target);
        updateFlag(e.target);
    });
}

const updateFlag=(selectElement)=>{
    let currCode=selectElement.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let imgTag=selectElement.parentElement.querySelector("img");
    imgTag.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateRate();
});

const updateRate=async ()=>{
        let amount=document.getElementById("amount").value;
    if(amount==="" || amount<1){
        amount=1;
        document.getElementById("amount").value="1";
    }
    
    const URL=`${BASE_URL}/${fromCurrency.value}/${toCurrency.value}`;
    // console.log(URL);
    const response=await fetch(URL);
    const data=await response.json(); // 
    // console.log(data);
    const rate=data.rate;
    const totalExRate=(rate*amount).toFixed(4);
    console.log(totalExRate);

    let msg=`${amount} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    document.querySelector(".msg").innerText=msg;
}

window.addEventListener("load",()=>{
    updateRate();
}
);
