const express = require("express");
const cors = require("cors");
const dataCtrl = require('./controller');
const app = express();
const {getAllData, createNewAffirmation, deleteAffirmation, updatePriority} = dataCtrl;


app.use(cors());

app.use(express.json());

const { getCompliment, fortuneCheck } = require('./controller')

const BASE_URL = '/api/affirmations';

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", fortuneCheck);

app.get(BASE_URL, getAllData);
app.post(BASE_URL, createNewAffirmation);
app.delete(`${BASE_URL}/:id`, deleteAffirmation);
app.put(`${BASE_URL}/:id`, updatePriority );

app.listen(4000, () => console.log("Server running on 4000"));
