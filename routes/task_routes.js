
const express =require('express');
const router = express.Router();
const{ createTask, getAllTasks,getTask,deleteTask, assignTask, changeStatus} = require('../controllers/task_controller');
const {verifyToken} = require('../controllers/auth_controller');

// router.route('/').post(createTask);
// router.route('/').get(getAllTasks);
// router.route('/:id').get(getTask);
// router.route('/:id').delete(verifyToken,deleteTask);
// router.route('/assign/:id').post(verifyToken,assignTask );
// router.route('/status/:id').post(verifyToken,changeStatus);

module.exports = router;







