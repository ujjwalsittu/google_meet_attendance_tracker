let numberOfStocks = 5;
let valueSet = false;
let stockNames = []
let previousPrice = []
let marketChange = []
let firstNStocks = []
let stockFluctuations = []
let time = 0,cnt =0;

let inputField = document.createElement("input");
inputField.type = "number";
inputField.placeholder = "number";
inputField.id = "input";
inputField.className = "sc-jKJlTe bYPeCd";
let newButton = document.createElement("button");
newButton.id = "button";
newButton.type = "button";
newButton.innerHTML = "start";

function insertIntoUI() {
    try{
        document.getElementsByClassName("navbar-nav")[0].appendChild(inputField);
        document.getElementsByClassName("navbar-nav")[0].appendChild(newButton);
        document.getElementById("button").addEventListener('click',function(){
            numberOfStocks = document.getElementById("input").value;
            if(numberOfStocks>10){
                numberOfStocks = 10;
            }else if(numberOfStocks==""){
                numberOfStocks = 5;
            }
            valueSet = true;
        });
        clearInterval(tryInsertingIntoUI);
    }catch(error){

    }
}

function formatName(name)
{
    return name.substring(0,name.indexOf('<')).toUpperCase();
}
function formatPrice(price)
{
    price = price.replace(",","");
    return price.substring(1);
}
function toTimeFormat(time)
{
    hh = Math.floor(time/3600);
    time = time - (hh*3600);
    mm = Math.floor(time/60);
    time = time - (mm*60); 
    ss = time;
    if(hh==0)return mm+" min "+ss+"s";
    else return hh+" hr "+mm+" min "+ss+"s";
}

function updateStocks()
{
    if(valueSet){
        console.clear();
        let stockDetails = document.getElementsByClassName("ticker-item");
        rejectedStocksChecker = []
        for(i=0;i<stockDetails.length;i++) {
            let stockDetail = stockDetails[i];
            let marketName = formatName(stockDetail.getElementsByClassName("market")[0].getElementsByClassName("market-name")[0].getElementsByClassName("market-name-text")[0].innerHTML);
            let marketPrice = formatPrice(stockDetail.getElementsByClassName("price")[0].getElementsByClassName("price-box")[0].getElementsByClassName("price-text")[0].innerHTML);
            if(stockNames.includes(marketName)){
                let ind = stockNames.indexOf(marketName);
                let difference = Number(Number(marketPrice)-Number(previousPrice[ind]));
                if(difference>0.000000 && i<numberOfStocks){
                    var synthesis = window.speechSynthesis;
                    var utterance = new SpeechSynthesisUtterance(marketName);
                    synthesis.speak(utterance);
                }
                marketChange[ind] = Number(Number(marketChange[ind])+Number(difference));
                stockFluctuations[ind] = difference;
                previousPrice[ind] = marketPrice;
            }else{
                stockNames.push(marketName);
                previousPrice.push(marketPrice);
                marketChange.push(0);
                stockFluctuations.push(0);
                if(firstNStocks.length<numberOfStocks) {
                    firstNStocks.push(marketName);
                }
            }
            // logging the details current stocks
            if(i<numberOfStocks) {
                let ind = stockNames.indexOf(marketName);
                rejectedStocksChecker.push(marketName);
                console.log(stockNames[ind]+(" ").repeat(7-stockNames[ind].length)+"  "+Number(stockFluctuations[ind]).toFixed(3)+"  "+Number(marketChange[ind]).toFixed(2));
            }
        }
        // logging the details for rejected stocks
        console.log("\nRejected Stocks\n")
        for(checkStockName of firstNStocks) {
            if(!rejectedStocksChecker.includes(checkStockName)){
                let ind = stockNames.indexOf(checkStockName);
                console.log(checkStockName+(" ").repeat(7-stockNames[ind].length)+"  "+Number(stockFluctuations[ind]).toFixed(3)+"  "+(Number(marketChange[ind]).toFixed(2)));
            }
        }
        console.log("\n");
        console.log("\n");
        console.log("\n");
        console.log("Time\n");
        console.log(toTimeFormat(time));
    }
    cnt++;
    if(cnt%2==0){
        time++;
    }
}

setInterval(updateStocks,500);
let tryInsertingIntoUI = setInterval(insertIntoUI,1000);
