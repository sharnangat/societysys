const membersService = require('../services/membersService');
const logger = require('../config/logger');

const createMember = async (req, res) => {
  try {
    logger.info('Creating new member - Received data', req.body);
    const member = await membersService.createMember(req.body);
    logger.info('Member created successfully', { id: member.id, membership_number: member.membership_number });
    res.status(201).json(member);
  } catch (err) {
    logger.warn('Failed to create member', { error: err.message, receivedData: req.body });
    const status = err.message.includes('already exists') ? 409 : 400;
    res.status(status).json({ message: err.message });
  }
};

const getMembers = async (req, res) => {
  try {
    logger.info('Fetching all members - Received data', {
      query: req.query,
      params: req.params,
      headers: req.headers,
    });
    const members = await membersService.getMembers();
    logger.info('Members fetched successfully', { count: members.length });
    res.json(members);
  } catch (err) {
    logger.error('Failed to fetch members', {
      error: err.message,
      stack: err.stack,
      query: req.query,
      params: req.params,
    });
    res.status(500).json({ message: err.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    logger.info('Fetching member by ID - Received data', {
      id: req.params.id,
      params: req.params,
      query: req.query,
    });
    const member = await membersService.getMemberById(req.params.id);
    logger.info('Member fetched successfully', { id: member.id });
    res.json(member);
  } catch (err) {
    logger.warn('Failed to fetch member', { error: err.message, id: req.params.id });
    const status = err.message === 'Member not found' ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

const getMembersBySocietyId = async (req, res) => {
  try {
    const { society_id } = req.params;
    logger.info('Fetching members by society_id - Received data', {
      society_id,
      params: req.params,
      query: req.query,
    });
    const members = await membersService.getMembersBySocietyId(society_id);
    logger.info('Members fetched by society_id successfully', { society_id, count: members.length });
    res.json(members);
  } catch (err) {
    logger.warn('Failed to fetch members by society_id', { error: err.message, society_id: req.params.society_id });
    res.status(400).json({ message: err.message });
  }
};

const getActiveMembers = async (req, res) => {
  try {
    logger.info('Fetching active members - Received data', {
      query: req.query,
      params: req.params,
    });
    const members = await membersService.getActiveMembers();
    logger.info('Active members fetched successfully', { count: members.length });
    res.json(members);
  } catch (err) {
    logger.warn('Failed to fetch active members', { error: err.message });
    res.status(500).json({ message: err.message });
  }
};

const getActiveMembersBySocietyId = async (req, res) => {
  try {
    const { society_id } = req.params;
    logger.info('Fetching active members by society_id - Received data', {
      society_id,
      params: req.params,
      query: req.query,
    });
    const members = await membersService.getActiveMembersBySocietyId(society_id);
    logger.info('Active members fetched by society_id successfully', { society_id, count: members.length });
    res.json(members);
  } catch (err) {
    logger.warn('Failed to fetch active members by society_id', { error: err.message, society_id: req.params.society_id });
    res.status(400).json({ message: err.message });
  }
};

const getMembersByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    logger.info('Fetching members by user_id - Received data', {
      user_id,
      params: req.params,
      query: req.query,
    });
    const members = await membersService.getMembersByUserId(user_id);
    logger.info('Members fetched by user_id successfully', { user_id, count: members.length });
    res.json(members);
  } catch (err) {
    logger.warn('Failed to fetch members by user_id', { error: err.message, user_id: req.params.user_id });
    res.status(400).json({ message: err.message });
  }
};

const updateMember = async (req, res) => {
  try {
    logger.info('Updating member - Received data', {
      id: req.params.id,
      body: req.body,
      params: req.params,
    });
    const member = await membersService.updateMember(req.params.id, req.body);
    logger.info('Member updated successfully', { id: member.id });
    res.json(member);
  } catch (err) {
    logger.warn('Failed to update member', {
      error: err.message,
      id: req.params.id,
      receivedData: req.body,
    });
    const status = err.message === 'Member not found' ? 404 : err.message.includes('already exists') ? 409 : 400;
    res.status(status).json({ message: err.message });
  }
};

const updateMemberByMembershipNumber = async (req, res) => {
  try {
    logger.info('Updating member by membership number - Received data', {
      membership_number: req.params.membership_number,
      body: req.body,
      params: req.params,
    });
    const member = await membersService.updateMemberByMembershipNumber(req.params.membership_number, req.body);
    logger.info('Member updated successfully by membership number', { membership_number: req.params.membership_number, id: member.id });
    res.json(member);
  } catch (err) {
    logger.warn('Failed to update member by membership number', {
      error: err.message,
      membership_number: req.params.membership_number,
      receivedData: req.body,
    });
    const status = err.message === 'Member not found' ? 404 : err.message.includes('already exists') ? 409 : 400;
    res.status(status).json({ message: err.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    logger.info('Deleting member - Received data', {
      id: req.params.id,
      params: req.params,
    });
    const result = await membersService.deleteMember(req.params.id);
    logger.info('Member deleted successfully', { id: req.params.id });
    res.json(result);
  } catch (err) {
    logger.warn('Failed to delete member', { error: err.message, id: req.params.id });
    const status = err.message === 'Member not found' ? 404 : 500;
    res.status(status).json({ message: err.message });
  }
};

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  getMembersBySocietyId,
  getActiveMembers,
  getActiveMembersBySocietyId,
  getMembersByUserId,
  updateMember,
  updateMemberByMembershipNumber,
  deleteMember,
};

