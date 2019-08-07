const Dev = require('../models/Dev')

module.exports = {
  async store(req, res) {
    const {user} = req.headers;
    const {devID} = req.params;

    const loggeDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devID);

    if(!targetDev) return res.status(400).json({error: 'Dev not exists'});

    loggeDev.dislikes.push(targetDev._id);

    await loggeDev.save();

    return res.json(loggeDev);
  }
};