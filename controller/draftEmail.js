const body = require('body-parser');
const saveEmails = require('../model/EmailDrafts');
const userProfiles = require('../model/userProfiles')
const passport = require('passport');


exports.idDets = async (req,res,next)=>{
    async function saveDraft(user){
        const finalDraft = new saveEmails({
                email: user.email,
                draftBody: req.body.draft,
                UserDetails: user._id
        });
        await finalDraft.save().then(result=>{
                console.log("draft saved");
                res.send("itworkd");
            }).catch(err=>{
                console.log(err);
            });
    }

    passport.authenticate('jwt',{session:false}, function(err, user, info, status) {
        if (err) { return next(err) }
        if (!user) { return res.status(401).redirect('/signin') }
        else if(user){saveDraft(user)}
      })(req, res, next);
}

exports.seemail = async(req,res)=>{
    const draft = await saveEmails.find({email:"mjxworks@gmail.com"});
    const totaldrafts = await saveEmails.count ([
        { $match: { email:"mjxworks@gmail.com"} }
      ]);
      
    res.status(200).send(draft);
    console.log(totaldrafts);
}

console.log("hello");