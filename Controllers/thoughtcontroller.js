const { User, Thought} = require("../Models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err =>{
          console.log(err);
          res.status(400).json(err);
      });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json;
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    createThought({body}, res) {
        console.log(body);
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: thoughtData._id}},
                {new:true}
            );
        }).then((dbUserData)=>{
            if(!dbUserData){
                res.status(404).json;
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },

    deleteThought({ params }, res){
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deletedThought => {
            if(!deletedThought) {
                return res.status(404).json;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.id }, body, { new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json;
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => res.status(400).json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }, 
    deleteReaction({ params}, res){
        console.log(params.thoughtId, params.reactionId);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err)); 
    }
};

module.exports = thoughtController;