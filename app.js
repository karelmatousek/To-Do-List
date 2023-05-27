const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = []; // globální proměnná - můžu na ni odkazovat ve funkcích
let workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs'); // app se rendruje skrze EJS

app.get("/", (req, res) => { //route - může být více cest

    var options = 
    { 
        weekday: 'long', 
        year:'numeric', 
        month: 'long', 
    };

    let today = new Date();
    let day = today.toLocaleDateString('cz-CS', options);

    res.render('list', { listTitle: day, newListItems: items });

});

app.post("/", (req, res) => { //post request - pošle data zpět na stránku (domovskou "/")

    let item = req.body.list; //DOM item = název submit + body = bodyparser
    console.log(req.body.list);//input který vložím
    if (item === "Work") {
        // z tohoto jsem zjistil, že je tam obsaženo work)
        
        workItems.push(req.body.newItem); //targetí přímo name button = list 
        res.redirect("/work");
    }
    else if(item === ''){ //brání přidání prazdných bodů
        console.log("error-no input")
    }    
     else {
        items.push(req.body.newItem); //input, který vloží uživatel
        res.redirect("/");
    }
   
});
app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work list", newListItems: workItems });
})


app.listen(3000, () => console.log("Server running on port 3000"));




// KOD PÍŠE JEN DEN Z ŘADY DAYSOFWEEK 

// var today = new Date();  //vyhodí přesné datum v tomto formátu: 2023-05-16T20:20:01.119Z
// var currentDay = today.getDay(); //pomocí getDay jsem upřesnil, že chci jen den (ve formátu čísla - dá se ověřit pomocí console.log)
// var daysOfWeek = ["Sunday", "Monday", "Thuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] 
// //vytvořil jsem řadu, abych podle daného čísla mohl přiřadit název dne

// res.render('list', { kindOfDay: daysOfWeek[currentDay] }); // načítá ze souboru list.ejs, řada + číslo = den, který se zobrazí
// console.log(today, currentDay); 