const Clarifai =require('clarifai')

const app = new Clarifai.App({
    apiKey: "882f6f6e39c84a52893bb9ccd7d931f3"
  });
 const handleApiCall = (req,res)=>{
    app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>res.status(400).json('unable to work with api'))
} 

const handleImg = (req,res,db)=>{
    const {id} =req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        
        res.json(entries[0].entries)
    }).catch(err => res.status(400).json('No entry found'))
}

module.exports={
    handleImg:handleImg,
    handleApiCall:handleApiCall
}