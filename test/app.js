module.exports = function(app)
{
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);
    app.delete("/api/test/:id", deleteMessage);
    //This is a test 33.
    var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds137101.mlab.com:37101/heroku_x7z9v510'
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var TestSchema = mongoose.Schema({
        message: String
    });

    var TestModel = mongoose.model("TestModel", TestSchema);

    function findAllMessages(req, res) {
        TestModel
            .find()
            .then(
                function(tests) {
                    res.json(tests);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        TestModel
            .create(req.body)
            .then(
                function(test) {
                    res.json(test);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        TestModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};
