const express = require('express');
const router = express.Router();
const {
    createGoal,
    getAllGoals,
    getGoal,
    deleteGoal,
    editGoal
} = require('../controllers/goalControllers')

router.post('/', createGoal);
router.get('/', getAllGoals);
router.get('/:id', getGoal);
router.patch('/:id', editGoal);
router.delete('/:id', deleteGoal);

module.exports = router;