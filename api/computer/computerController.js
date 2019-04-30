'use strict'

const {getReturnObject} = require('../../util/util');
const computerModel = require('./computerModel');

exports.addComputer = async (req, res) => {
  if (!(req.body.macAddress)) {
    return res.status(400).json({
        'success': false,
        'message': 'Valid macAddress required.'
    });
  }

  try {
    let computerId = await computerModel.save(macAddress, req.session.user.id);
    
  } catch (err) {

  }

}

exports.userOwnsComputer = async (userId, computerId) => {
  await computerModel.userOwnsComputer(userId, computerId);
};