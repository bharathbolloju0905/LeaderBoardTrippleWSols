const usermodel = require('../models/user.model');
const historymodel = require('../models/history.model');


module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await usermodel.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        users.sort((a, b) => b.points - a.points);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

module.exports.createUser = async (req, res) => {
    try {
        
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }
        const newUser = await usermodel.create({ name, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

module.exports.claimForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       user.points +=   Math.random() * 10; // Random points between 0 and 10
        await user.save();

        res.status(200).json({ message: 'Points claimed successfully', points: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Error claiming points', error });
    }
}

 
module.exports.createHistory = async (req, res) => {
    try {
       const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await usermodel.findById(userId);
        const points = user.points ;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newHistory = await historymodel.create({ userId, points });
        res.status(201).json(newHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating history', error });
    }
}


module.exports.getHistory = async (req,res)=>{
    try{
        const history = await historymodel.find().sort({ createdAt: -1 });
        if (!res || res.length === 0) {
            return res.status(404).json({ message: 'No history found' });
        }
        res.status(200).json(history);
    
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching history', error });
    }
}

module.exports.getHistoryForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const history = await historymodel.find({ userId }).sort({ createdAt: -1 });
        if (!history || history.length === 0) {
            return res.status(404).json({ message: 'No history found for this user' });
        }
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error });
    }
}

