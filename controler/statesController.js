const data = require("../model/states.json");

const statesFacts = require("../model/stateFact");

//Get all states
const getStates = async (req, res) => {
    const facts = await statesFacts.find();
    const result = data;
    result.forEach(obj => {
        facts.forEach(fact => {
            //console.log(obj);
            //console.log(fact);
            if (obj.code == fact.stateCode) {
                //console.log("yes");
                obj.funFacts = fact;
            }
        })
    });
    if (!req.query.contig) {
        return res.json(result);
    } else if (req.query.contig == true) {
        const filtered = result.filter(obj => {
            obj.admission_number < 49
        });
        return res.json(filtered);
    } else if (req.query.contig == false) {
        const filtered = result.filter(obj => {
            obj.admission_number >= 49
        });
        return res.json(filtered);
    }
    }

//Get a state
const getState = async (req, res) => {
    if (!req?.params?.state) {
        return res.status(400).json({ message: "State code is required." });
    }
    const state = data.find(
        (sta) => sta.code === req.params.state.toUpperCase()
    );
    if(!state) {
        return res
            .status(400)
            .json({ message: `No State matches ${req.params.state.toUpperCase()}` });
    }
    const stateDB = await statesFacts.findOne({stateCode: req.params.state.toUpperCase()}).exec();
    if(!stateDB) {
        return res.json(state);
    }
    const funfacts = stateDB.funfacts;
    const result = {state,funfacts};
    res.json(result);
};

//random funfact
const getFact = async (req, res) => {
    const stateDB = await statesFacts.findOne({stateCode: req.params.state.toUpperCase()}).exec();
    if(!stateDB) {
        return res.json(state);
    }
    const num = Math.floor((Math.random() * stateDB.funfacts.length));
    const result = stateDB.funfacts[num];
    console.log(num);
    res.json(result);
}

//state capital
const getCap = (req, res) => {
    if(!req.params.state){
        return res.status(400)
        .json({ message: "State required"});
    }
    const state = data.find(
        (sta) => sta.code === req.params.state.toUpperCase()
    );
    if(!state) {
        return res
            .status(400)
            .json({ message: `No State matches ${req.params.state.toUpperCase()}` });
    }
    const result = {'state': state.state, 'capital': state.capital_city};
    res.json(result);
}

//state nickname
const getNic = (req, res) => {
    if(!req.params.state){
        return res.status(400)
        .json({ message: "State required"});
    }
    const state = data.find(
        (sta) => sta.code === req.params.state.toUpperCase()
    );
    if(!state) {
        return res
            .status(400)
            .json({ message: `No State matches ${req.params.state.toUpperCase()}` });
    }
    const result = {'state': state.state, 'nickname': state.nickname};
    res.json(result);
}

//state population
const getPop = (req, res) => {
    if(!req.params.state){
        return res.status(400)
        .json({ message: "State required"});
    }
    const state = data.find(
        (sta) => sta.code === req.params.state.toUpperCase()
    );
    if(!state) {
        return res
            .status(400)
            .json({ message: `No State matches ${req.params.state.toUpperCase()}` });
    }
    const result = {'state': state.state, 'population': state.population};
    res.json(result);
}

//state admission
const getAd = (req, res) => {
    if(!req.params.state){
        return res.status(400)
        .json({ message: "State required"});
    }
    const state = data.find(
        (sta) => sta.code === req.params.state.toUpperCase()
    );
    if(!state) {
        return res
            .status(400)
            .json({ message: `No State matches ${req.params.state.toUpperCase()}` });
    }
    const result = {'state': state.state, 'admitted': state.admission_date};
    res.json(result);
}

//Add state fact (POST)
const addFact = async (req, res) => {
    if(!req.body?.funfacts){
        return res.status(400)
        .json({ message: "Fun facts not defined"});
    }
    if(!req.params.state){
        return res.status(400)
        .json({ message: "State required"});
    }
    
    const state = await statesFacts.findOne({stateCode: req.params.state.toUpperCase()}).exec();
    if(!state){ 
        const result = await statesFacts.create(
            {stateCode: req.params.state.toUpperCase(),
            funfacts: req.body.funfacts,}
        );
        return res.json(result);
    }
    const result = await statesFacts.updateOne(
        {stateCode: req.params.state.toUpperCase()},
        {$push: {funfacts: req.body.funfacts}}
    )
    res.json(result);

};

//Delete state fact (DELETE)
const deleteFact = async (req, res) => {
    if(!req.body?.index){
        return res.status(400)
        .json({ message: "Index not defined"});
    }
    if(!req.params.state){
        return res.status(400)
        .json({ message: "State required"});
    }
    const realIndex = parseInt(req.body?.index) - 1;
    try{
        const state = await statesFacts.findOne({stateCode: req.params.state.toUpperCase()}).exec();
        if(!state){
            return res.status(204)
            .json({ message: `No State Code match with ${req.params.state.toUpperCase()}`});
        }
    state.$[funFacts]
    }
    catch(err){console.log(err)}
};

//Update state fact (PATCH)
const updateFact = async (req, res) => {
    if(!req.body?.funfacts){
        return res.status(400)
        .json({ message: "Fun facts not defined"});
    }
    if(!req.params.state){
        return res.status(400)
        .json({ message: "State required"});
    }
    if(!req.body?.index){
        return res.status(400)
        .json({ message: "Index not defined"});
    }
    const realIndex = parseInt(req.body?.index) - 1;
    try{
        const state = await statesFacts.findOne({stateCode: req.params.state.toUpperCase()}).exec();
        if(!state){
            return res.status(204)
            .json({ message: `No State Code match with ${req.params.state.toUpperCase()}`});
        }
        delete state.funFacts[realIndex];
        state.funfacts.push(req.body.funfacts);
        const result = await statesFacts.save();
        res.json(result);
    }
    catch(err){console.log(err)}
};

module.exports = {
    getStates,
    getState,
    addFact,
    deleteFact,
    updateFact,
    getFact,
    getCap,
    getNic,
    getPop,
    getAd,
};