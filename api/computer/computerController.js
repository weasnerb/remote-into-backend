'use strict'
const computerModel = require('./computerModel');

exports.addComputer = async (req, res) => {
  if (!(req.body.name)) {
    return res.status(400).json({
        'success': false,
        'message': 'Valid name required.'
    });
  }

  try {
    let computerId = await computerModel.save(macAddress, req.session.user.id);
    return res.json({
      'success': true,
      'data': {
          'computerId': computerId
      }
  });
  } catch (err) {
    return res.status(400).json({
      'success': false,
      'data': {
          'message': 'Could not save computer.'
      }
  });
  }

}

exports.getUsersComputers = async (req, res) => {
  try {
    let usersComputers = await computerModel.getAllUsersComputers(req.session.user.id);
    return res.json({
        'success': true,
        'data': {
            'computers': usersComputers
        }
    });
  } catch (error) {
    return res.status(400).json({
        'success': false,
        'message': "Unable to retrieve user's computers."
    });
  }
}

exports.userOwnsComputer = async (userId, computerId) => {
  await computerModel.userOwnsComputer(userId, computerId);
};