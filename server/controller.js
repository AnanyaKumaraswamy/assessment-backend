const allAffirmations = require('../db.json');
let ID = 100;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    fortuneCheck: (req, res) => {
        const fortunes = ["A lifetime of happiness lies ahead of you!", "From now on your kindness will lead you to success.", "You are soon going to change your present line of work.", "Get your mind set – confidence will lead you on.", "All your hard work will soon pay off."];
      
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },
    getAllData: (req, res) => {
        res.status(200).send(allAffirmations);
    },
    createNewAffirmation: (req,res) => {
        const newAffirmation = req.body;    
        newAffirmation.id = ID;
        ID++;
        console.log(newAffirmation);
        allAffirmations.push(newAffirmation);
        res.status(200).send(allAffirmations);
    
    },
    deleteAffirmation: (req,res) => {    
        const {id} = req.params;
    
        for(let i = 0; i< allAffirmations.length; i++){
            if (allAffirmations[i].id === +id ){
                allAffirmations.splice(i, 1);
                res.status(200).send(allAffirmations);
                return;
            }
            
        }
        res.status(400).send('Could not find the affirmation to delete');
    },
    updatePriority: (req,res) => {    
        const {id} = req.params;
        const {type} = req.body;
        for(let i = 0; i< allAffirmations.length; i++){
            if (allAffirmations[i].id === +id ){
                if(type === "plus" && allAffirmations[i].priority < 3){
                  allAffirmations[i].priority++;  
                  res.status(200).send(allAffirmations);
                  return;
                } 
                if(type === "minus" && allAffirmations[i].priority > 1){
                  allAffirmations[i].priority--;
                  res.status(200).send(allAffirmations);
                  return;
                }           
                
            }
            
        }    
    }

}