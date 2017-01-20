// Router for Plans CRUD API

const _ = require('lodash');
const Plan = require('../models/plan');

module.exports = (router) => {

    // Create plan
    router.route('/plans')
        .post((req, res) => {
            if (!req.body.title) res.send(new Error('No plan title provided!'));
            if (!req.body.userId) res.send(new Error('No userId provided!'));

            if (!req.body.deadline) {
                // @todo set plan till the year end
            } else if ((new Date(req.body.deadline).getTime() <= Date.now())) {
                res.send(new Error('Can\'t create a plan with a past deadline date!'));
            }

            Plan.create(req.body)
                .then((plan) => {
                    res.json({
                        message: 'Plan created!',
                        plan
                    });
                })
                .catch((err) => res.send(err));
        });

    // Get all user plans for specified year
    router.route('/plans/:user_id/:year')
        .get((req, res) => {
            Plan.find({
                userId: req.params.user_id,
                year: req.params.year
            })
                .exec()
                .then((result) => res.send(result))
                .catch((err) => res.send(err));
        });

    router.route('/plan/:plan_id')
        // Get plan by id
        .get((req, res) => {
            Plan.findById(req.params.plan_id)
                .exec()
                .then((plan) => {
                    res.send(plan);
                })
                .catch((err) => {
                    res.send(err);
                })
        })
        // Update plan by id
        .put((req, res) => {
            Plan.findById(req.params.plan_id)
                .exec()
                .then((plan) => {
                    plan = _.assign(plan, req.body);
                    return plan.save();
                })
                .then((savedPlan) => {
                    res.send({
                        message: 'Plan updated!',
                        plan: savedPlan
                    })
                })
                .catch((err) => {
                    res.send(err);
                });
        })
        // Delete plan by id
        .delete((req, res) => {
            Plan.remove({
                _id: req.params.plan_id
            }).then(() => {
                res.send({
                    message: 'Plan removed!'
                });
            }).catch((err) => {
                res.send(err);
            })
        });
};