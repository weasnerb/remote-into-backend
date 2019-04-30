'use strict';

const {userOwnsComputer} = require('../computer/computerController');

const computerConnections = new Map();

exports.websocketHandler = async (ws, req) => {
  const computerId = parseInt(req.params.computerId);

  // Check permissions
  if (isNaN(computerId) || computerId < 1 || !await userOwnsComputer(req.session.user.id, computerId)) {
    ws.send()
    ws.close();
    return;
  }

  // Websocket Handlers
  ws.on('message', (message) => _websocketMessage(ws, computerId, message));
  ws.on('close', () => _websocketClose(ws, computerId));
}

/**
 * Remove Websocket (a person's connection) from the computer connection
 */
const _websocketClose = (ws, conversationId) => {
  let currentConversation = conversations.get(conversationId);
  currentConversation.splice(currentConversation.indexOf(ws), 1);
  if (currentConversation.length === 0) {
    conversations.delete(conversationId);
  }
};

/**
 * Sends a message to all other clients connected to current computer connection.
 * @param {object} ws
 * @param {websocket[]} currentConversation 
 * @param {string} message 
 */
const _websocketMessage = (ws, computerId, message) => {
  let currentComputerConnection = computerConnections.get(computerId);
  if (Array.isArray(currentComputerConnection)) {
    let indexOfCurrentClient = currentComputerConnection.indexOf(ws);
    for (let i = 0; i < currentComputerConnection.length; i++) {
      if (i === indexOfCurrentClient) {
        continue;
      }
      try {
        currentComputerConnection[i].send(message);
      } catch (error) {
        console.log("Error Sending Message", error);
      }
    }
  }
};